// ROL: creador de nodos (plantillas).
// Qué hace: construye el HTML de cada vista (entrar, crear cuenta, sesión activa) a partir del estado que recibe.
// Qué no hace: no guarda estado, no registra eventos, no valida y no mueve el foco. Todo texto de la persona se escapa.
// Qué toca: nada; devuelve cadenas de HTML.

import { atributosCampo, idAyuda } from './accesibilidad.js';

// Escapa texto antes de meterlo en innerHTML (el nombre y el email los escribe la persona).
export const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const svg = (cuerpo, clase = '') =>
  `<svg ${clase ? `class="${clase}" ` : ''}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${cuerpo}</svg>`;

const ICONO_CANDADO = svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path class="arco" d="M8 11V7a4 4 0 0 1 8 0v4"/>');
const ICONO_AVISO = svg('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/>');
const ICONO_SALIR = svg('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>');
const ICONO_OJO =
  svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 'visto') +
  svg('<path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.5 7.6A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.7-.7"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>', 'tapado');

// Iniciales para el avatar: primera letra de las dos primeras palabras del nombre.
export const iniciales = (nombre) =>
  String(nombre).trim().split(/\s+/).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || '?';

// Con la sesión iniciada el candado se muestra abierto (el CSS levanta el arco).
const cabecera = (id, titulo, abierto = false) => `
  <div class="cab">
    <span class="marca${abierto ? ' abierto' : ''}">${ICONO_CANDADO}</span>
    <div><p class="ceja">Identidad · Tienda UCJC</p><h2 id="${id}" tabindex="-1">${titulo}</h2></div>
  </div>`;

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

const campo = (f, etiqueta, { tipo, auto, entrada, valor = '', errores }) => `
  <label for="${f}">${etiqueta}</label>
  <input id="${f}" data-f="${f}" name="${f}" type="${tipo}" autocomplete="${auto}" aria-required="true" ${ENTRADA[entrada]}
    ${valor ? `value="${esc(valor)}"` : ''}${atributosCampo(f, errores)} />
  ${ayuda(f, errores)}`;

// La contraseña nunca se rellena de nuevo tras un error: la persona la vuelve a escribir.
const clave = (f, etiqueta, auto, errores) => `
  <label for="${f}">${etiqueta}</label>
  <div class="clave">
    <input id="${f}" data-f="${f}" name="${f}" type="password" autocomplete="${auto}" aria-required="true" ${ENTRADA.clave}${atributosCampo(f, errores)} />
    <button type="button" class="ojo" data-a="ver" data-para="${f}" aria-pressed="false" aria-label="Mostrar contraseña">${ICONO_OJO}</button>
  </div>
  ${ayuda(f, errores)}`;

export function vistaLogin({ valores, errores, resumen }) {
  return `
    <form class="box" novalidate aria-labelledby="titulo-login">
      ${cabecera('titulo-login', 'Inicia sesión')}
      <p class="estado ko">Sin sesión</p>
      ${resumenErrores(resumen)}
      ${campo('email', 'Email', { tipo: 'email', auto: 'username', entrada: 'email', valor: valores.email, errores })}
      ${clave('password', 'Contraseña', 'current-password', errores)}
      <div class="acciones">
        <button type="submit" data-a="in">Iniciar sesión</button>
        <div class="separa">o</div>
        <button type="button" data-a="demo" class="sec">Entrar con la cuenta demo</button>
      </div>
      <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
    </form>`;
}

export function vistaRegistro({ valores, errores, resumen }) {
  return `
    <form class="box" novalidate aria-labelledby="titulo-registro">
      ${cabecera('titulo-registro', 'Crear cuenta')}
      ${resumenErrores(resumen)}
      ${campo('reg-email', 'Email', { tipo: 'email', auto: 'email', entrada: 'email', valor: valores.email, errores })}
      ${campo('reg-nombre', 'Nombre', { tipo: 'text', auto: 'name', entrada: 'nombre', valor: valores.nombre, errores })}
      ${clave('reg-password', 'Contraseña', 'new-password', errores)}
      <div class="acciones">
        <button type="submit" data-a="registrar">Registrarme</button>
      </div>
      <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
    </form>`;
}

// Tarjeta de cuenta: nombre, email e id como datos normales (lista de definiciones).
export function vistaSesion(usuario) {
  return `
    <section class="box" aria-labelledby="titulo-sesion">
      ${cabecera('titulo-sesion', 'Tu cuenta', true)}
      <p class="estado ok">Sesión activa</p>
      <div class="perfil">
        <span class="avatar" aria-hidden="true">${esc(iniciales(usuario.nombre))}</span>
        <dl class="datos">
          <dt>Nombre</dt><dd class="nombre">${esc(usuario.nombre)}</dd>
          <dt>Email</dt><dd class="correo">${esc(usuario.email)}</dd>
          <dt>ID</dt><dd><code>${esc(usuario.id)}</code></dd>
        </dl>
      </div>
      <div class="acciones">
        <button type="button" data-a="out" class="danger">${ICONO_SALIR}Cerrar sesión</button>
      </div>
    </section>`;
}
