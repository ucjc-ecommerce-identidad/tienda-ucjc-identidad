// ROL: creador de nodos (plantillas).
// Qué hace: construye el HTML de cada vista (entrar, crear cuenta, sesión activa, selector de cuenta de un proveedor,
//   recuperar contraseña) a partir del estado que recibe.
//   Todas las vistas usan la misma tarjeta de cristal (.tarjeta) con el logo arriba.
// Qué no hace: no guarda estado, no registra eventos, no valida y no mueve el foco. Todo texto de la persona se escapa.
// Qué toca: nada; devuelve cadenas de HTML.

import { atributosCampo, idAyuda } from './accesibilidad.js';
import { PROVEEDORES } from './proveedores.js';

// Escapa texto antes de meterlo en innerHTML (el nombre y el email los escribe la persona).
export const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const svg = (cuerpo, clase = '') =>
  `<svg ${clase ? `class="${clase}" ` : ''}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${cuerpo}</svg>`;

// Candado con dos arcos: cerrado y abierto (dibujado, no girado). El CSS enseña uno u otro.
const ICONO_CANDADO = svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path class="arco" d="M8 11V7a4 4 0 0 1 8 0v4"/><path class="arco-abierto" d="M8 11V7a4 4 0 0 1 7.9-.9"/>');
const ICONO_AVISO = svg('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/>');
const ICONO_INFO = svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>');
const ICONO_OK = svg('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>');
const ICONO_SOBRE = svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>');
const ICONO_ID = svg('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/>');
const ICONO_RELOJ = svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>');
const ICONO_SALIR = svg('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>');
const ICONO_OJO =
  svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 'visto') +
  svg('<path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.5 7.6A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.7-.7"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>', 'tapado');

// Iniciales para el avatar: primera letra de las dos primeras palabras del nombre.
export const iniciales = (nombre) =>
  String(nombre).trim().split(/\s+/).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || '?';

// Logo (candado + «Tienda UCJC») y título de la vista. Con la sesión iniciada el candado se muestra abierto.
const cabecera = (id, titulo, abierto = false) => `
  <p class="logo"><span class="marca${abierto ? ' abierto' : ''}">${ICONO_CANDADO}</span>Tienda UCJC</p>
  <h2 id="${id}" tabindex="-1">${titulo}</h2>`;

const ICONO_FLECHA = svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 'flecha');

// Botón principal: al pasar el ratón entra una flecha (decorativa) que empuja el texto.
const principal = (a, texto) => `<button type="submit" class="btn" data-a="${a}"><span>${texto}</span>${ICONO_FLECHA}</button>`;

// Resumen de errores de arriba: se anuncia solo (role="alert") y los campos lo señalan con aria-describedby.
const resumenErrores = (texto) =>
  texto ? `<p id="error" class="error" role="alert">${ICONO_AVISO}<span>${esc(texto)}</span></p>` : '';

// Pista concreta bajo el campo que falla (solo existe después de validar o enviar).
const ayuda = (campo, errores) =>
  errores[campo] ? `<p class="ayuda" id="${idAyuda(campo)}">${ICONO_AVISO}<span>${esc(errores[campo])}</span></p>` : '';

// Atributos de entrada pensados para teclados móviles y gestores de contraseñas.
// Nunca autocomplete="off" ni bloqueo de pegar (WCAG 3.3.8).
const ENTRADA = {
  email: 'inputmode="email" autocapitalize="none" spellcheck="false"',
  nombre: 'autocapitalize="words" spellcheck="false"',
  clave: 'autocapitalize="none" spellcheck="false"',
};

const campo = (f, etiqueta, { tipo, auto, entrada, valor = '', errores, ejemplo = '' }) => `
  <label for="${f}">${etiqueta}</label>
  <input id="${f}" data-f="${f}" name="${f}" type="${tipo}" autocomplete="${auto}" aria-required="true" ${ENTRADA[entrada]}${ejemplo ? ` placeholder="${ejemplo}"` : ''}
    ${valor ? `value="${esc(valor)}"` : ''}${atributosCampo(f, errores)} />
  ${ayuda(f, errores)}`;

// La contraseña nunca se rellena de nuevo tras un error: la persona la vuelve a escribir.
const clave = (f, etiqueta, auto, errores) => `
  <label for="${f}">${etiqueta}</label>
  <div class="clave">
    <input id="${f}" data-f="${f}" name="${f}" type="password" autocomplete="${auto}" aria-required="true" placeholder="${etiqueta}" ${ENTRADA.clave}${atributosCampo(f, errores)} />
    <button type="button" class="ojo" data-a="ver" data-para="${f}" aria-pressed="false" aria-label="Mostrar contraseña">${ICONO_OJO}</button>
  </div>
  ${ayuda(f, errores)}`;

// Aviso informativo (no es un error): «esto es una simulación», confirmaciones...
const aviso = (texto, icono = ICONO_INFO) => `<p class="aviso">${icono}<span>${texto}</span></p>`;

// Fila de proveedores bajo una etiqueta («o continúa con»). Cada botón se nombra por su texto; el logo es decorativo.
const filaProveedores = (etiqueta) => `
  <div class="separa" id="etq-prov">${etiqueta}</div>
  <div class="provs" role="group" aria-labelledby="etq-prov">
    ${PROVEEDORES.map((p) => `<button type="button" class="prov" data-a="prov" data-p="${p.id}" title="${p.nombre}">${p.logo}<span class="sr">${p.nombre}</span></button>`).join('')}
  </div>`;

const volver = (texto = 'Volver a iniciar sesión') =>
  `<p class="pie"><button type="button" data-a="cancelar" class="enlace">${texto}</button></p>`;

export function vistaLogin({ valores, errores, resumen, exito }) {
  return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-login">
      ${cabecera('titulo-login', 'Inicia sesión')}
      <p class="estado ko sr">Sin sesión</p>
      ${exito ? aviso(esc(exito), ICONO_OK) : ''}
      ${resumenErrores(resumen)}
      ${campo('email', 'Email', { tipo: 'email', auto: 'username', entrada: 'email', valor: valores.email, errores, ejemplo: 'tu@alumno.ucjc.edu' })}
      ${clave('password', 'Contraseña', 'current-password', errores)}
      <p class="olvide"><button type="button" data-a="olvide" class="enlace">¿Olvidaste tu contraseña?</button></p>
      <div class="acciones">
        ${principal('in', 'Iniciar sesión')}
        <button type="button" data-a="demo" class="btn-sec">Entrar con la cuenta demo</button>
        ${filaProveedores('o continúa con')}
      </div>
      <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
    </form>`;
}

export function vistaRegistro({ valores, errores, resumen }) {
  return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-registro">
      ${cabecera('titulo-registro', 'Crear cuenta')}
      ${resumenErrores(resumen)}
      ${campo('reg-email', 'Email', { tipo: 'email', auto: 'email', entrada: 'email', valor: valores.email, errores, ejemplo: 'tu@alumno.ucjc.edu' })}
      ${campo('reg-nombre', 'Nombre', { tipo: 'text', auto: 'name', entrada: 'nombre', valor: valores.nombre, errores, ejemplo: 'Nombre y apellido' })}
      ${clave('reg-password', 'Contraseña', 'new-password', errores)}
      <div class="acciones">
        ${principal('registrar', 'Registrarme')}
        ${filaProveedores('o regístrate con')}
      </div>
      <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
    </form>`;
}

// Selector de cuenta de un proveedor (simulado): las cuentas demo y «Usar otra cuenta».
export function vistaSelector({ proveedor, cuentas }) {
  const fila = (c) => `
    <li><button type="button" class="cuenta" data-a="cuenta" data-email="${esc(c.email)}">
      <span class="av" aria-hidden="true">${esc(iniciales(c.nombre))}</span>
      <span class="txt"><span class="nombre">${esc(c.nombre)}</span><span class="correo">${esc(c.email)}</span></span>
    </button></li>`;
  return `
    <section class="tarjeta" aria-labelledby="titulo-selector">
      ${cabecera('titulo-selector', `Elige una cuenta de ${proveedor.nombre}`)}
      ${aviso(`Esto es una <strong>simulación</strong> y no se conecta con ${proveedor.nombre}.`)}
      <ul class="cuentas">
        ${cuentas.map(fila).join('')}
        <li><button type="button" class="cuenta" data-a="otra">
          <span class="av" aria-hidden="true">+</span><span class="txt"><span class="nombre">Usar otra cuenta</span></span>
        </button></li>
      </ul>
      ${volver('Cancelar')}
    </section>`;
}

export function vistaOtraCuenta({ proveedor, valores, errores, resumen }) {
  return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-otra">
      ${cabecera('titulo-otra', `Usar otra cuenta de ${proveedor.nombre}`)}
      ${aviso(`Esto es una <strong>simulación</strong> y no se conecta con ${proveedor.nombre}.`)}
      ${resumenErrores(resumen)}
      ${campo('prov-email', 'Email', { tipo: 'email', auto: 'email', entrada: 'email', valor: valores.email, errores, ejemplo: 'tu@correo.com' })}
      <div class="acciones">
        ${principal('continuar', 'Continuar')}
      </div>
      <p class="pie"><button type="button" data-a="volver-cuentas" class="enlace">Volver a elegir cuenta</button></p>
    </form>`;
}

// Recuperar contraseña (simulada): email -> aviso neutro -> enlace del correo (demo) -> contraseña nueva.
export function vistaOlvide({ valores, errores, resumen }) {
  return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-olvide">
      ${cabecera('titulo-olvide', 'Recupera tu contraseña')}
      ${aviso('Esto es una <strong>simulación</strong> y no se envía ningún correo.')}
      ${resumenErrores(resumen)}
      ${campo('rec-email', 'Email de tu cuenta', { tipo: 'email', auto: 'email', entrada: 'email', valor: valores.email, errores, ejemplo: 'tu@alumno.ucjc.edu' })}
      <div class="acciones">
        ${principal('enviar-enlace', 'Enviar enlace')}
      </div>
      ${volver()}
    </form>`;
}

// El texto es el mismo exista o no el email: no se revela qué cuentas hay.
export function vistaEnlace({ email }) {
  return `
    <section class="tarjeta" aria-labelledby="titulo-enlace">
      ${cabecera('titulo-enlace', 'Revisa tu correo')}
      ${aviso('Esto es una <strong>simulación</strong> y no se ha enviado ningún correo.')}
      <p class="texto">Si <strong>${esc(email)}</strong> está registrado, recibirá un enlace para elegir una contraseña nueva.</p>
      <div class="acciones">
        <button type="button" class="btn" data-a="abrir-enlace"><span>Abrir el enlace del correo (demo)</span>${ICONO_FLECHA}</button>
      </div>
      ${volver()}
    </section>`;
}

export function vistaClaveNueva({ errores, resumen }) {
  return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-nueva">
      ${cabecera('titulo-nueva', 'Elige una contraseña nueva')}
      ${resumenErrores(resumen)}
      ${clave('nueva-password', 'Contraseña nueva', 'new-password', errores)}
      <div class="acciones">
        ${principal('guardar-clave', 'Guardar contraseña')}
      </div>
      ${volver()}
    </form>`;
}

// Ficha de la cuenta: avatar y nombre arriba, y debajo los datos (email, id e inicio de sesión) en una lista.
// `desde` es solo para mostrar la hora de inicio; no sale en el evento.
const hora = (d) => d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

export function vistaSesion(usuario, desde = new Date()) {
  const fila = (icono, etiqueta, valor) => `<div class="fila"><dt>${icono}${etiqueta}</dt><dd>${valor}</dd></div>`;
  return `
    <section class="tarjeta" aria-labelledby="titulo-sesion">
      ${cabecera('titulo-sesion', 'Tu cuenta', true)}
      <div class="perfil">
        <span class="avatar" aria-hidden="true">${esc(iniciales(usuario.nombre))}</span>
        <p class="nombre">${esc(usuario.nombre)}</p>
        <p class="estado ok">Sesión activa</p>
      </div>
      <dl class="datos">
        ${fila(ICONO_SOBRE, 'Email', esc(usuario.email))}
        ${fila(ICONO_ID, 'ID de usuario', `<code>${esc(usuario.id)}</code>`)}
        ${fila(ICONO_RELOJ, 'Inicio de sesión', `<time datetime="${desde.toISOString()}">${hora(desde)}</time>`)}
      </dl>
      <div class="acciones">
        <button type="button" data-a="out" class="danger">${ICONO_SALIR}Cerrar sesión</button>
      </div>
    </section>`;
}
