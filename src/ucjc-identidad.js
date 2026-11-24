// ROL: DOM vivo + coordinador de la pieza <ucjc-identidad>.
// Qué hace: guarda el estado (sesión, vista, errores, lo escrito), pinta la vista que toca en el Shadow DOM,
//   conecta los eventos de entrada (clic, envío) y llama al resto de roles en orden:
//   lector -> validador -> cuentas -> pintar -> foco -> anuncio -> evento hacia fuera.
//   Vistas: entrar, crear cuenta, selector de cuenta de un proveedor simulado (y «usar otra cuenta»),
//   recuperar contraseña (email -> aviso -> enlace demo -> contraseña nueva) y sesión activa.
//   Al cambiar de vista marca la dirección de la transición (data-anim): «adelante», «atras», «sesion» o «inicio».
// Qué no hace: no valida (validador.js), no escribe HTML de vistas (vistas.js), no decide ARIA (accesibilidad.js),
//   no mueve el foco por su cuenta (foco.js) y no construye el detail del evento (eventos.js).
// Qué toca: solo su Shadow DOM y, a través de eventos.js, el evento sesion-cambiada@1 en window.

import { css } from './estilos.js';
import {
  vistaLogin, vistaRegistro, vistaSesion, vistaSelector, vistaOtraCuenta, vistaOlvide, vistaEnlace, vistaClaveNueva, FONDO,
} from './vistas.js';
import { proveedor } from './proveedores.js';
import { leer } from './lector.js';
import { validarLogin, validarRegistro, validarEmail, validarClaveNueva } from './validador.js';
import { buscar, existe, registrar, cuentasDemo, entrarOCrear, cambiarPassword, DEMO } from './cuentas.js';
import { anunciar } from './accesibilidad.js';
import { enfocarCampo, enfocarTitulo, enfocarSelector } from './foco.js';
import { emitirSesion } from './eventos.js';

class UcjcIdentidad extends HTMLElement {
  #usuario = null;
  #vista = 'login';
  #resumen = ''; // texto del aviso de arriba (role="alert")
  #errores = {}; // { campo: mensaje|null } de los campos que fallaron en el último envío
  #valores = { email: '', nombre: '' }; // lo escrito que se conserva (la contraseña nunca)
  #origen = 'login'; // vista desde la que se abrió el selector de proveedor (a ella se vuelve al cancelar)
  #prov = ''; // id del proveedor elegido
  #recEmail = ''; // email de la recuperación de contraseña en curso
  #exito = ''; // aviso de «contraseña cambiada» para la próxima vez que se pinte el login (se muestra una vez)
  #desde = null; // hora de inicio de la sesión (solo para mostrarla; no sale en el evento)

  connectedCallback() {
    // El shell puede quitar y volver a poner el elemento: el shadow root solo se crea una vez.
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      // La región viva vive fuera de #raiz: no se repinta y por eso sus avisos sí se anuncian.
      this.shadowRoot.innerHTML = `<style>${css}</style><div class="sr" id="vivo" role="status"></div>
        <div class="escena">${FONDO}<div class="contenedor"><div id="raiz"></div></div></div>`;
      // Esc cancela el selector de proveedor y la recuperación de contraseña, y devuelve el foco al control de origen.
      this.shadowRoot.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !['selector', 'otra', 'olvide', 'enlace', 'nueva'].includes(this.#vista)) return;
        e.stopPropagation();
        this.#cancelar();
      });
    }
    this.#pintar(null, 'inicio');
    emitirSesion(this.#usuario);
  }

  // Profundidad de cada vista: ir a una más profunda desliza «adelante»; volver, «atras».
  static #NIVEL = { login: 0, registro: 1, selector: 1, olvide: 1, otra: 2, enlace: 2, nueva: 3 };
  #direccion(desde, hacia) {
    const n = UcjcIdentidad.#NIVEL;
    return n[hacia] >= n[desde] ? 'adelante' : 'atras';
  }

  // `foco`: 'titulo' (vista nueva), 'error' (primer campo inválido), { sel } (un control concreto, al cancelar)
  // o null (al cargar no se roba el foco).
  // `anim`: transición de entrada ('' = ninguna, p. ej. al repintar por un error).
  #pintar(foco = null, anim = '') {
    const raiz = this.shadowRoot.getElementById('raiz');
    raiz.dataset.anim = anim;
    // Antes de repintar: alto de la tarjeta y qué bloques hay, para que la nueva se adapte sin saltos.
    const vieja = raiz.querySelector('.tarjeta');
    const altoAntes = vieja ? vieja.getBoundingClientRect().height : 0;
    const antes = new Set(vieja ? [...vieja.children].map((n) => (n.classList.remove('igual'), n.outerHTML)) : []);
    const estado = { valores: this.#valores, errores: this.#errores, resumen: this.#resumen };
    const exito = this.#exito;
    this.#exito = '';

    if (this.#usuario) raiz.innerHTML = vistaSesion(this.#usuario, this.#desde ?? new Date());
    else {
      const p = proveedor(this.#prov);
      const vistas = {
        login: () => vistaLogin({ ...estado, exito }),
        registro: () => vistaRegistro(estado),
        selector: () => vistaSelector({ proveedor: p, cuentas: cuentasDemo() }),
        otra: () => vistaOtraCuenta({ ...estado, proveedor: p }),
        olvide: () => vistaOlvide(estado),
        enlace: () => vistaEnlace({ email: this.#recEmail }),
        nueva: () => vistaClaveNueva(estado),
      };
      raiz.innerHTML = vistas[this.#vista]();
    }

    this.#conectar(raiz);
    this.#adaptar(raiz.querySelector('.tarjeta'), { antes, altoAntes, anim });

    if (foco === 'titulo') enfocarTitulo(this.shadowRoot);
    else if (foco === 'error') {
      const primero = Object.keys(this.#errores)[0];
      if (primero) enfocarCampo(this.shadowRoot, primero);
    } else if (foco?.sel) enfocarSelector(this.shadowRoot, foco.sel);
  }

  // La tarjeta se adapta en vez de cambiar de golpe:
  //   - los bloques que no cambian (p. ej. el logo) se marcan .igual y no se animan. Si el logo solo cambia el
  //     candado, también se queda quieto y solo se anima el arco (data-candado = «abre» o «cierra»);
  //   - el alto pasa suavemente del anterior al nuevo (Web Animations);
  //   - el contenido cambia directamente (sin fundido); al entrar en la cuenta el perfil sube (CSS).
  // Con «reducir movimiento» solo se marca lo que no cambia; nada se mueve.
  #adaptar(tarjeta, { antes, altoAntes, anim }) {
    if (!tarjeta) return;
    const sinCandado = (h) => h.replace(/ abierto/g, '');
    const antesSinCandado = new Set([...antes].map(sinCandado));
    for (const n of tarjeta.children) {
      if (antes.has(n.outerHTML)) n.classList.add('igual');
      else if (n.classList.contains('logo') && antesSinCandado.has(sinCandado(n.outerHTML))) {
        n.classList.add('igual');
        tarjeta.dataset.candado = n.querySelector('.abierto') ? 'abre' : 'cierra';
      }
    }
    const quieto = !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || !altoAntes || anim === 'inicio' || typeof tarjeta.animate !== 'function') return;

    const altoDespues = tarjeta.getBoundingClientRect().height;
    if (Math.abs(altoDespues - altoAntes) >= 2) {
      tarjeta.style.overflow = 'hidden';
      const a = tarjeta.animate([{ height: `${altoAntes}px` }, { height: `${altoDespues}px` }], { duration: 460, easing: 'cubic-bezier(.2,.8,.2,1)' });
      a.onfinish = a.oncancel = () => (tarjeta.style.overflow = '');
    }
  }

  // Gestor de eventos de entrada: cada vista conecta solo los controles que tiene.
  #conectar(raiz) {
    const en = (a, fn) => raiz.querySelectorAll(`[data-a="${a}"]`).forEach((el) => (el.onclick = () => fn(el)));
    const form = raiz.querySelector('form');
    // El envío del formulario cubre el botón y la tecla Enter en cualquier campo.
    const envio = {
      login: () => this.#entrar(),
      registro: () => this.#alta(),
      otra: () => this.#continuarOtra(),
      olvide: () => this.#enviarEnlace(),
      nueva: () => this.#guardarClave(),
    }[this.#vista];
    if (form && envio) {
      form.onsubmit = (e) => {
        e.preventDefault();
        envio();
      };
    }
    en('demo', () => this.#abrirSesion(buscar(DEMO.email, DEMO.password)));
    en('ir-registro', () => this.#irA('registro'));
    en('ir-login', () => this.#irA('login'));
    en('out', () => this.#cerrarSesion());
    en('ver', (b) => this.#alternarClave(raiz, b));
    en('prov', (b) => this.#abrirProveedor(b.dataset.p));
    en('cuenta', (b) => this.#conProveedor(b.dataset.email));
    en('otra', () => this.#ir('otra', 'titulo'));
    en('olvide', () => this.#abrirOlvide());
    en('abrir-enlace', () => this.#ir('nueva', 'titulo'));
    en('cancelar', () => this.#cancelar());
    en('volver-cuentas', () => this.#cancelar());
  }

  // Cambio de vista simple: limpia los errores y pinta con la transición que toca.
  #ir(vista, foco) {
    const anim = this.#direccion(this.#vista, vista);
    this.#vista = vista;
    this.#limpiarErrores();
    this.#pintar(foco, anim);
  }

  // Guarda lo escrito en la vista actual para no pedirlo de nuevo en la siguiente (WCAG 3.3.7).
  #recordar() {
    const r = this.shadowRoot;
    if (this.#vista === 'login') this.#valores.email = leer(r, ['email']).email.trim();
    else if (this.#vista === 'registro') {
      const d = leer(r, ['reg-email', 'reg-nombre']);
      this.#valores = { email: d['reg-email'].trim(), nombre: d['reg-nombre'].trim() };
    } else if (this.#vista === 'olvide') this.#valores.email = leer(r, ['rec-email'])['rec-email'].trim();
  }

  // Esc o «Cancelar»: vuelve a la vista de origen y deja el foco en el control que la abrió.
  #cancelar() {
    if (this.#vista === 'selector') {
      this.#vista = this.#origen;
      this.#limpiarErrores();
      this.#pintar({ sel: `[data-a="prov"][data-p="${this.#prov}"]` }, 'atras');
    } else if (this.#vista === 'otra') {
      this.#ir('selector', { sel: '[data-a="otra"]' });
    } else {
      this.#recordar();
      this.#ir('login', { sel: '[data-a="olvide"]' });
    }
  }

  // Mostrar/ocultar contraseña sin repintar: se conserva lo escrito y el foco queda en el botón.
  #alternarClave(raiz, boton) {
    const campo = raiz.querySelector(`[data-f="${boton.dataset.para}"]`);
    const visible = campo.type === 'password';
    campo.type = visible ? 'text' : 'password';
    boton.setAttribute('aria-pressed', String(visible));
  }

  #fallar(errores, resumen) {
    this.#errores = Object.fromEntries(errores.map((e) => [e.campo, e.mensaje]));
    this.#resumen = resumen;
    this.#pintar('error');
  }

  #limpiarErrores() {
    this.#errores = {};
    this.#resumen = '';
  }

  #entrar() {
    const raiz = this.shadowRoot;
    const datos = leer(raiz, ['email', 'password']);
    this.#valores.email = datos.email.trim();

    const v = validarLogin(datos);
    if (!v.ok) return this.#fallar(v.errores, v.resumen);

    const cuenta = buscar(datos.email, datos.password);
    if (!cuenta) {
      // Error de la cuenta, no de un campo: lo describe el resumen y el foco vuelve a la contraseña.
      return this.#fallar(
        [{ campo: 'password', mensaje: null }],
        'Email o contraseña incorrectos. Revisa los dos campos o entra con la cuenta demo.'
      );
    }
    this.#abrirSesion(cuenta);
  }

  #alta() {
    const datos = leer(this.shadowRoot, ['reg-email', 'reg-nombre', 'reg-password']);
    this.#valores = { email: datos['reg-email'].trim(), nombre: datos['reg-nombre'].trim() };

    const v = validarRegistro({ email: datos['reg-email'], nombre: datos['reg-nombre'], password: datos['reg-password'] });
    if (!v.ok) return this.#fallar(v.errores, v.resumen);

    if (existe(datos['reg-email'])) {
      return this.#fallar(
        [{ campo: 'reg-email', mensaje: 'Usa otro email o vuelve a iniciar sesión con este.' }],
        'Ese email ya está registrado. Inicia sesión o usa otro email.'
      );
    }
    const cuenta = registrar({ email: datos['reg-email'], nombre: datos['reg-nombre'], password: datos['reg-password'] });
    this.#abrirSesion(cuenta, 'Cuenta creada. ');
  }

  // `via`: « con Google» cuando se entra con un proveedor simulado (solo cambia el texto del anuncio).
  #abrirSesion(cuenta, prefijo = '', via = '') {
    this.#usuario = cuenta;
    this.#desde = new Date();
    this.#valores = { email: '', nombre: '' };
    this.#limpiarErrores();
    this.#pintar('titulo', 'sesion');
    anunciar(this.shadowRoot, `${prefijo}Sesión iniciada${via} como ${cuenta.nombre}.`);
    emitirSesion(this.#usuario);
  }

  #cerrarSesion() {
    this.#usuario = null;
    this.#desde = null;
    this.#vista = 'login';
    this.#limpiarErrores();
    this.#pintar('titulo', 'atras');
    anunciar(this.shadowRoot, 'Sesión cerrada.');
    emitirSesion(null);
  }

  // Entre «entrar» y «crear cuenta» el email ya escrito pasa de una vista a la otra (WCAG 3.3.7).
  #irA(vista) {
    this.#recordar();
    this.#ir(vista, 'titulo');
  }

  // --- Proveedores simulados (Google, Microsoft, GitHub): no hay red ni OAuth ---

  #abrirProveedor(id) {
    this.#recordar();
    this.#origen = this.#vista;
    this.#prov = id;
    this.#ir('selector', 'titulo');
  }

  // Cuenta elegida: si el email ya existe se reutiliza su id; si no, se crea la cuenta simulada.
  #conProveedor(email) {
    const { cuenta, nueva } = entrarOCrear(email);
    this.#abrirSesion(cuenta, nueva ? 'Cuenta creada. ' : '', ` con ${proveedor(this.#prov).nombre}`);
  }

  #continuarOtra() {
    const datos = leer(this.shadowRoot, ['prov-email']);
    this.#valores.email = datos['prov-email'].trim();
    const v = validarEmail({ email: datos['prov-email'] }, 'prov-email');
    if (!v.ok) return this.#fallar(v.errores, v.resumen);
    this.#conProveedor(datos['prov-email']);
  }

  // --- Recuperar contraseña (simulada): ningún paso emite sesion-cambiada@1 ---

  #abrirOlvide() {
    this.#recordar();
    this.#ir('olvide', 'titulo');
  }

  #enviarEnlace() {
    const datos = leer(this.shadowRoot, ['rec-email']);
    this.#valores.email = datos['rec-email'].trim();
    const v = validarEmail({ email: datos['rec-email'] }, 'rec-email');
    if (!v.ok) return this.#fallar(v.errores, v.resumen);
    this.#recEmail = this.#valores.email;
    this.#ir('enlace', 'titulo'); // mismo aviso exista o no el email
  }

  #guardarClave() {
    const datos = leer(this.shadowRoot, ['nueva-password']);
    const v = validarClaveNueva({ password: datos['nueva-password'] });
    if (!v.ok) return this.#fallar(v.errores, v.resumen);
    cambiarPassword(this.#recEmail, datos['nueva-password']); // si el email no existe no pasa nada, y no se dice
    const texto = 'Contraseña cambiada. Inicia sesión con la nueva.';
    this.#valores.email = this.#recEmail;
    this.#exito = texto;
    this.#ir('login', 'titulo');
    anunciar(this.shadowRoot, texto);
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
