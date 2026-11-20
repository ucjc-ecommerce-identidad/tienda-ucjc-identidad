const EVT = 'ucjc:identidad:sesion-cambiada@1';

const USUARIOS = [
  {
    id: 'u-demo',
    email: 'demo@alumno.ucjc.edu',
    nombre: 'Usuario demo',
    password: 'demo'
  },
  {
    id: 'u-juanperez',
    email: 'juan.perez@alumno.ucjc.edu',
    nombre: 'Juan Pérez',
    password: 'juan123'
  },
  {
    id: 'u-mariagarcia',
    email: 'maria.garcia@alumno.ucjc.edu',
    nombre: 'María García',
    password: 'maria456'
  }
];

const DEMO = USUARIOS[0]; // Usuario demo por defecto

// Formato mínimo de email: algo@algo.algo, sin espacios.
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escapa texto antes de meterlo en innerHTML (el nombre lo escribe el usuario al registrarse).
const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const css = `
  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }
  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; max-width:22rem; }
  h2 { margin:0 0 .5rem; font-size:1.1rem; }
  label { display:block; font-size:.85rem; color:#3d4859; margin:.5rem 0 .15rem; }
  input { width:100%; box-sizing:border-box; font:inherit; padding:.4rem .55rem; border:1px solid #8a96a8; border-radius:8px; }
  input[aria-invalid="true"] { border-color:#a3280f; }
  .row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.75rem; }
  button { font:inherit; border:0; border-radius:8px; padding:.45rem .85rem; cursor:pointer; background:#0f3d7a; color:#fff; }
  button.sec { background:#e7ecf3; color:#152033; }
  button.danger { background:#b3261e; color:#fff; }
  button.danger:hover { background:#8c1d18; }
  input:focus-visible, button:focus-visible { outline:3px solid #f2a900; outline-offset:2px; }
  .estado { margin-top:.65rem; font-size:.9rem; }
  .ok { color:#0b6b3a; } .ko { color:#8a3b12; }
  .error { margin:.5rem 0; padding:.45rem .6rem; border-left:4px solid #a3280f; background:#fdecea; color:#7a1d0b; font-size:.9rem; }
`;

class UcjcIdentidad extends HTMLElement {
  #usuario = null;
  #vista = 'login';
  #error = '';
  #campoError = ''; // data-f del campo que provocó el error, para marcarlo y llevar el foco

  connectedCallback() {
    // El shell puede quitar y volver a poner el elemento: el shadow root solo se crea una vez.
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.#pintar();
    this.#emitir();
  }

  #emitir() {
    const detail = this.#usuario
      ? {
          autenticado: true,
          usuario: { ...this.#usuario },
          momento: new Date().toISOString(),
        }
      : {
          autenticado: false,
          usuario: null,
          momento: new Date().toISOString(),
        };
    window.dispatchEvent(new CustomEvent(EVT, { detail }));
  }

  #fallo(mensaje, campo) {
    this.#error = mensaje;
    this.#campoError = campo;
    this.#pintar();
  }

  #registro(email, nombre, password) {
    const mail = (email || '').trim().toLowerCase();
    const nom = (nombre || '').trim();
    const pass = password || '';

    if (!mail || !nom || !pass) {
      const vacio = !mail ? 'reg-email' : !nom ? 'reg-nombre' : 'reg-password';
      return this.#fallo('Rellena email, nombre y contraseña.', vacio);
    }

    if (!EMAIL_OK.test(mail)) {
      return this.#fallo('El email no tiene un formato válido. Ejemplo: nombre@alumno.ucjc.edu', 'reg-email');
    }

    if (USUARIOS.some((u) => u.email === mail)) {
      return this.#fallo('Ese email ya está registrado. Inicia sesión o usa otro email.', 'reg-email');
    }

    USUARIOS.push({
      id: `u-${USUARIOS.length + 1}`,
      email: mail,
      nombre: nom,
      password: pass,
    });

    this.#login(mail, pass);
  }

  #login(email, password) {
    const mail = (email || '').trim().toLowerCase();

    if (!mail || !password) {
      return this.#fallo('Escribe tu email y tu contraseña para entrar.', !mail ? 'email' : 'password');
    }

    const encontrado = USUARIOS.find((u) => u.email === mail && u.password === password);

    if (!encontrado) {
      return this.#fallo('Email o contraseña incorrectos. Revisa los dos campos o pulsa «Demo rápida».', 'password');
    }

    this.#usuario = {
      id: encontrado.id,
      email: encontrado.email,
      nombre: encontrado.nombre,
    };
    this.#error = '';
    this.#campoError = '';
    this.#pintar();
    this.#emitir();
  }

  #logout() {
    this.#usuario = null;
    this.#vista = 'login';
    this.#error = '';
    this.#campoError = '';
    this.#pintar();
    this.#emitir();
  }

  #irA(vista) {
    this.#vista = vista;
    this.#error = '';
    this.#campoError = '';
    this.#pintar();
  }

  // Campo de formulario con su etiqueta; si es el que falló, queda marcado y enlazado al mensaje.
  #campo(f, id, etiqueta, tipo, autocomplete) {
    const malo = this.#campoError === f;
    return `
      <label for="${id}">${etiqueta}</label>
      <input id="${id}" data-f="${f}" name="${f}" type="${tipo}" autocomplete="${autocomplete}"
        ${malo ? 'aria-invalid="true" aria-describedby="error"' : ''} />`;
  }

  #bloqueError() {
    return this.#error ? `<p id="error" class="error" role="alert">${esc(this.#error)}</p>` : '';
  }

  // Tras un error, el foco va al campo que hay que corregir.
  #enfocarError() {
    if (!this.#campoError) return;
    this.shadowRoot.querySelector(`[data-f="${this.#campoError}"]`)?.focus();
  }

  #pintar() {
    if (this.#usuario) {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <div class="box">
          <h2>Identidad</h2>
          <p class="estado ok" role="status">Sesión activa</p>
          <p><b>${esc(this.#usuario.nombre)}</b><br>${esc(this.#usuario.email)}<br><code>${esc(this.#usuario.id)}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="danger">Cerrar sesión</button>
          </div>
        </div>`;
      this.shadowRoot.querySelector('[data-a="out"]').onclick = () => this.#logout();
      return;
    }

    if (this.#vista === 'registro') {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <form class="box" novalidate aria-labelledby="titulo-registro">
          <h2 id="titulo-registro">Crear cuenta</h2>
          ${this.#bloqueError()}
          ${this.#campo('reg-email', 'reg-email', 'Email', 'email', 'email')}
          ${this.#campo('reg-nombre', 'reg-nombre', 'Nombre', 'text', 'name')}
          ${this.#campo('reg-password', 'reg-password', 'Contraseña', 'password', 'new-password')}
          <div class="row">
            <button type="submit" data-a="registrar">Registrarme</button>
            <button type="button" data-a="ir-login" class="sec">Volver</button>
          </div>
        </form>`;

      const valor = (f) => this.shadowRoot.querySelector(`[data-f="${f}"]`).value;
      // Enter en cualquier campo envía el formulario, igual que pulsar «Registrarme».
      this.shadowRoot.querySelector('form').onsubmit = (e) => {
        e.preventDefault();
        this.#registro(valor('reg-email'), valor('reg-nombre'), valor('reg-password'));
      };
      this.shadowRoot.querySelector('[data-a="ir-login"]').onclick = () => this.#irA('login');
      this.#enfocarError();
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <form class="box" novalidate aria-labelledby="titulo-login">
        <h2 id="titulo-login">Identidad</h2>
        <p class="estado ko" role="status">Sin sesión</p>
        ${this.#bloqueError()}
        ${this.#campo('email', 'login-email', 'Email', 'email', 'email')}
        ${this.#campo('password', 'login-password', 'Contraseña', 'password', 'current-password')}
        <div class="row">
          <button type="submit" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
          <button type="button" data-a="ir-registro" class="sec">Crear cuenta</button>
        </div>
      </form>`;

    const valor = (f) => this.shadowRoot.querySelector(`[data-f="${f}"]`).value;
    // Enter en el email o la contraseña inicia sesión, igual que pulsar el botón.
    this.shadowRoot.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      this.#login(valor('email'), valor('password'));
    };
    this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => this.#login(DEMO.email, DEMO.password);
    this.shadowRoot.querySelector('[data-a="ir-registro"]').onclick = () => this.#irA('registro');
    this.#enfocarError();
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
