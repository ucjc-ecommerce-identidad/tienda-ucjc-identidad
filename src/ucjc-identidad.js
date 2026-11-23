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
  :host {
    --marca: #1e3a8a; --marca-osc: #172e6e; --marca-suave: rgba(30,58,138,.14);
    --texto: #0f172a; --tenue: #5b6577; --borde: #dfe4ec; --fondo-campo: #fbfcfe;
    --rojo: #b3261e; --rojo-suave: #fdecea; --rojo-borde: #f3c9c5;
    display:block; font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; color:var(--texto);
  }
  * { box-sizing:border-box; }
  .box {
    width:100%; max-width:22rem; background:#fff; border:1px solid var(--borde); border-radius:16px; padding:1.25rem;
    box-shadow:0 1px 2px rgba(15,23,42,.04), 0 12px 28px -16px rgba(15,23,42,.28);
  }
  .cab { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
  .marca {
    flex:none; width:2.5rem; height:2.5rem; border-radius:12px; display:grid; place-items:center; color:#fff;
    background:linear-gradient(135deg, #2b4fb3, var(--marca-osc));
  }
  .marca svg { width:1.2rem; height:1.2rem; }
  .ceja { margin:0; font-size:.72rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--tenue); }
  h2 { margin:0; font-size:1.12rem; line-height:1.3; font-weight:650; letter-spacing:-.01em; }
  .estado {
    display:inline-flex; align-items:center; gap:.4rem; margin:0 0 1rem; padding:.2rem .65rem; border-radius:999px;
    font-size:.8rem; font-weight:600;
  }
  .estado::before { content:""; width:.45rem; height:.45rem; border-radius:50%; background:currentColor; }
  .ok { background:#e7f6ee; color:#0b6b3a; }
  .ko { background:#fff3e0; color:#8a4b00; }
  label { display:block; margin:.85rem 0 .35rem; font-size:.82rem; font-weight:600; color:#334155; }
  input {
    width:100%; height:2.75rem; padding:0 .85rem; font:inherit; color:var(--texto);
    background:var(--fondo-campo); border:1px solid #cdd4df; border-radius:10px;
    transition:border-color .15s, box-shadow .15s, background-color .15s;
  }
  input:hover { border-color:#aab4c3; }
  input:focus-visible { outline:none; background:#fff; border-color:var(--marca); box-shadow:0 0 0 4px var(--marca-suave); }
  input[aria-invalid="true"] { border-color:var(--rojo); background:#fff; }
  input[aria-invalid="true"]:focus-visible { box-shadow:0 0 0 4px rgba(179,38,30,.15); }
  .acciones { display:grid; gap:.6rem; margin-top:1.25rem; }
  button {
    display:inline-flex; align-items:center; justify-content:center; gap:.5rem; width:100%; min-height:2.75rem;
    padding:0 1rem; font:inherit; font-weight:600; border-radius:10px; border:1px solid transparent; cursor:pointer;
    background:var(--marca); color:#fff; transition:background-color .15s, border-color .15s, transform .05s;
  }
  button:hover { background:var(--marca-osc); }
  button:active { transform:translateY(1px); }
  button.sec { background:#fff; color:var(--texto); border-color:var(--borde); }
  button.sec:hover { background:#f4f6fa; border-color:#c9d1dd; }
  button.danger { background:#fff; color:var(--rojo); border-color:var(--rojo-borde); }
  button.danger:hover { background:var(--rojo-suave); border-color:#e8a9a3; }
  button svg { width:1rem; height:1rem; flex:none; }
  button:focus-visible { outline:3px solid #f2a900; outline-offset:2px; }
  .separa { display:flex; align-items:center; gap:.75rem; margin:.15rem 0; color:var(--tenue); font-size:.78rem; }
  .separa::before, .separa::after { content:""; flex:1; height:1px; background:var(--borde); }
  .pie { margin:1rem 0 0; text-align:center; font-size:.85rem; color:var(--tenue); }
  .enlace {
    display:inline; width:auto; min-height:0; padding:0; border:0; background:none; color:var(--marca);
    font-weight:600; text-decoration:underline; text-underline-offset:3px;
  }
  .enlace:hover { background:none; color:var(--marca-osc); }
  .error {
    display:flex; gap:.55rem; align-items:flex-start; margin:0 0 .25rem; padding:.65rem .75rem; border-radius:10px;
    background:var(--rojo-suave); border:1px solid var(--rojo-borde); color:#7a1d0b; font-size:.86rem;
  }
  .error svg { flex:none; width:1.05rem; height:1.05rem; margin-top:.1rem; }
  .perfil { display:flex; align-items:center; gap:.85rem; padding:.85rem; border:1px solid var(--borde); border-radius:12px; background:#f8fafc; }
  .avatar {
    flex:none; width:3rem; height:3rem; border-radius:50%; display:grid; place-items:center; color:#fff;
    font-weight:700; font-size:1.05rem; letter-spacing:.02em; background:linear-gradient(135deg, #3b63d1, var(--marca-osc));
    box-shadow:0 0 0 3px #fff, 0 0 0 4px var(--borde);
  }
  .perfil p { margin:0; min-width:0; }
  .nombre { font-weight:650; }
  .correo { display:block; color:var(--tenue); font-size:.86rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  code {
    display:inline-block; margin-top:.3rem; padding:.05rem .45rem; border-radius:6px; background:#eef2f8; color:#334155;
    font:.75rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  @media (prefers-reduced-motion: reduce) { * { transition:none !important; } button:active { transform:none; } }
`;

const ICONO_CANDADO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
const ICONO_AVISO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>';
const ICONO_SALIR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/></svg>';

// Iniciales para el avatar: primera letra de las dos primeras palabras del nombre.
const iniciales = (nombre) =>
  String(nombre).trim().split(/\s+/).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || '?';

const cabecera = (id, titulo, ceja = 'Identidad · Tienda UCJC') => `
  <div class="cab">
    <span class="marca">${ICONO_CANDADO}</span>
    <div><p class="ceja">${ceja}</p><h2 id="${id}">${titulo}</h2></div>
  </div>`;

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
      return this.#fallo('Email o contraseña incorrectos. Revisa los dos campos o entra con la cuenta demo.', 'password');
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
    return this.#error ? `<p id="error" class="error" role="alert">${ICONO_AVISO}<span>${esc(this.#error)}</span></p>` : '';
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
        <section class="box" aria-labelledby="titulo-sesion">
          ${cabecera('titulo-sesion', 'Tu cuenta')}
          <p class="estado ok" role="status">Sesión activa</p>
          <div class="perfil">
            <span class="avatar" aria-hidden="true">${esc(iniciales(this.#usuario.nombre))}</span>
            <p><span class="nombre">${esc(this.#usuario.nombre)}</span><span class="correo">${esc(this.#usuario.email)}</span><code>${esc(this.#usuario.id)}</code></p>
          </div>
          <div class="acciones">
            <button type="button" data-a="out" class="danger">${ICONO_SALIR}Cerrar sesión</button>
          </div>
        </section>`;
      this.shadowRoot.querySelector('[data-a="out"]').onclick = () => this.#logout();
      return;
    }

    if (this.#vista === 'registro') {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <form class="box" novalidate aria-labelledby="titulo-registro">
          ${cabecera('titulo-registro', 'Crear cuenta')}
          ${this.#bloqueError()}
          ${this.#campo('reg-email', 'reg-email', 'Email', 'email', 'email')}
          ${this.#campo('reg-nombre', 'reg-nombre', 'Nombre', 'text', 'name')}
          ${this.#campo('reg-password', 'reg-password', 'Contraseña', 'password', 'new-password')}
          <div class="acciones">
            <button type="submit" data-a="registrar">Registrarme</button>
          </div>
          <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
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
        ${cabecera('titulo-login', 'Inicia sesión')}
        <p class="estado ko" role="status">Sin sesión</p>
        ${this.#bloqueError()}
        ${this.#campo('email', 'login-email', 'Email', 'email', 'email')}
        ${this.#campo('password', 'login-password', 'Contraseña', 'password', 'current-password')}
        <div class="acciones">
          <button type="submit" data-a="in">Iniciar sesión</button>
          <div class="separa">o</div>
          <button type="button" data-a="demo" class="sec">Entrar con la cuenta demo</button>
        </div>
        <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
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
