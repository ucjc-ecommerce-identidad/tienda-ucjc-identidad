// ROL: DOM vivo + coordinador de la pieza <ucjc-identidad>.
// Qué hace: guarda el estado (sesión, vista, errores, lo escrito), pinta la vista que toca en el Shadow DOM,
//   conecta los eventos de entrada (clic, envío) y llama al resto de roles en orden:
//   lector -> validador -> cuentas -> pintar -> foco -> anuncio -> evento hacia fuera.
// Qué no hace: no valida (validador.js), no escribe HTML de vistas (vistas.js), no decide ARIA (accesibilidad.js),
//   no mueve el foco por su cuenta (foco.js) y no construye el detail del evento (eventos.js).
// Qué toca: solo su Shadow DOM y, a través de eventos.js, el evento sesion-cambiada@1 en window.

import { css } from './estilos.js';
import { vistaLogin, vistaRegistro, vistaSesion } from './vistas.js';
import { leer } from './lector.js';
import { validarLogin, validarRegistro } from './validador.js';
import { buscar, existe, registrar, DEMO } from './cuentas.js';
import { anunciar } from './accesibilidad.js';
import { enfocarCampo, enfocarTitulo } from './foco.js';
import { emitirSesion } from './eventos.js';

class UcjcIdentidad extends HTMLElement {
  #usuario = null;
  #vista = 'login';
  #resumen = ''; // texto del aviso de arriba (role="alert")
  #errores = {}; // { campo: mensaje|null } de los campos que fallaron en el último envío
  #valores = { email: '', nombre: '' }; // lo escrito que se conserva (la contraseña nunca)

  connectedCallback() {
    // El shell puede quitar y volver a poner el elemento: el shadow root solo se crea una vez.
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      // La región viva vive fuera de #raiz: no se repinta y por eso sus avisos sí se anuncian.
      this.shadowRoot.innerHTML = `<style>${css}</style><div class="sr" id="vivo" role="status"></div><div id="raiz"></div>`;
    }
    this.#pintar();
    emitirSesion(this.#usuario);
  }

  // `foco`: 'titulo' (vista nueva), 'error' (primer campo inválido) o null (al cargar no se roba el foco).
  #pintar(foco = null) {
    const raiz = this.shadowRoot.getElementById('raiz');
    const estado = { valores: this.#valores, errores: this.#errores, resumen: this.#resumen };

    if (this.#usuario) raiz.innerHTML = vistaSesion(this.#usuario);
    else raiz.innerHTML = this.#vista === 'registro' ? vistaRegistro(estado) : vistaLogin(estado);

    this.#conectar(raiz);

    if (foco === 'titulo') enfocarTitulo(this.shadowRoot);
    if (foco === 'error') {
      const primero = Object.keys(this.#errores)[0];
      if (primero) enfocarCampo(this.shadowRoot, primero);
    }
  }

  // Gestor de eventos de entrada: cada vista conecta solo los controles que tiene.
  #conectar(raiz) {
    const en = (a, fn) => {
      const el = raiz.querySelector(`[data-a="${a}"]`);
      if (el) el.onclick = fn;
    };
    const form = raiz.querySelector('form');
    if (form) {
      // El envío del formulario cubre el botón y la tecla Enter en cualquier campo.
      form.onsubmit = (e) => {
        e.preventDefault();
        this.#vista === 'registro' ? this.#alta() : this.#entrar();
      };
    }
    en('demo', () => this.#abrirSesion(buscar(DEMO.email, DEMO.password)));
    en('ir-registro', () => this.#irA('registro'));
    en('ir-login', () => this.#irA('login'));
    en('out', () => this.#cerrarSesion());
    raiz.querySelectorAll('[data-a="ver"]').forEach((b) => (b.onclick = () => this.#alternarClave(raiz, b)));
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

  #abrirSesion(cuenta, prefijo = '') {
    this.#usuario = cuenta;
    this.#valores = { email: '', nombre: '' };
    this.#limpiarErrores();
    this.#pintar('titulo');
    anunciar(this.shadowRoot, `${prefijo}Sesión iniciada como ${cuenta.nombre}.`);
    emitirSesion(this.#usuario);
  }

  #cerrarSesion() {
    this.#usuario = null;
    this.#vista = 'login';
    this.#limpiarErrores();
    this.#pintar('titulo');
    anunciar(this.shadowRoot, 'Sesión cerrada.');
    emitirSesion(null);
  }

  // Entre «entrar» y «crear cuenta» el email ya escrito pasa de una vista a la otra (WCAG 3.3.7).
  #irA(vista) {
    const campo = this.#vista === 'registro' ? 'reg-email' : 'email';
    this.#valores.email = leer(this.shadowRoot, [campo])[campo].trim();
    this.#vista = vista;
    this.#limpiarErrores();
    this.#pintar('titulo');
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
