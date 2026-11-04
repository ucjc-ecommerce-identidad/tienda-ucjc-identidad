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

// Escapa texto antes de meterlo en innerHTML (el nombre lo escribe el usuario al registrarse).
const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const css = `
  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }
  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; max-width:22rem; }
  h2 { margin:0 0 .5rem; font-size:1.1rem; }
  label { display:block; font-size:.8rem; color:#5b677a; margin:.4rem 0 .15rem; }
  input { width:100%; box-sizing:border-box; font:inherit; padding:.4rem .55rem; border:1px solid #c5ced9; border-radius:8px; }
  .row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.75rem; }
  button { font:inherit; border:0; border-radius:8px; padding:.45rem .85rem; cursor:pointer; background:#0f3d7a; color:#fff; }
  button.sec { background:#e7ecf3; color:#152033; }
  .estado { margin-top:.65rem; font-size:.9rem; }
  .ok { color:#0b6b3a; } .ko { color:#8a3b12; }
`;

class UcjcIdentidad extends HTMLElement {
  #usuario = null;
  #vista = 'login';
  #error = '';

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

  #registro(email, nombre, password) {
    const mail = (email || '').trim().toLowerCase();
    const nom = (nombre || '').trim();
    const pass = password || '';

    if (!mail || !nom || !pass) {
      this.#error = 'Rellena email, nombre y contraseña.';
      this.#pintar();
      return;
    }

    if (USUARIOS.some((u) => u.email === mail)) {
      this.#error = 'Ese email ya está registrado.';
      this.#pintar();
      return;
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
    const encontrado = USUARIOS.find((u) => u.email === mail && u.password === password);

    if (!encontrado) {
      this.#error = 'Email o contraseña incorrectos.';
      this.#pintar();
      return;
    }

    this.#usuario = {
      id: encontrado.id,
      email: encontrado.email,
      nombre: encontrado.nombre,
    };
    this.#error = '';
    this.#pintar();
    this.#emitir();
  }

  #logout() {
    this.#usuario = null;
    this.#vista = 'login';
    this.#error = '';
    this.#pintar();
    this.#emitir();
  }

  #pintar() {
    if (this.#usuario) {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <div class="box">
          <h2>Identidad</h2>
          <p class="estado ok">Sesión activa</p>
          <p><b>${esc(this.#usuario.nombre)}</b><br>${esc(this.#usuario.email)}<br><code>${esc(this.#usuario.id)}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="sec">Cerrar sesión</button>
          </div>
        </div>`;
      this.shadowRoot.querySelector('[data-a="out"]').onclick = () => this.#logout();
      return;
    }

    if (this.#vista === 'registro') {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <div class="box">
          <h2>Crear cuenta</h2>
          ${this.#error ? `<p class="estado ko">${this.#error}</p>` : ''}

          <label for="reg-email">Email</label>
          <input id="reg-email" data-f="reg-email" type="email" autocomplete="email" />

          <label for="reg-nombre">Nombre</label>
          <input id="reg-nombre" data-f="reg-nombre" type="text" autocomplete="name" />

          <label for="reg-password">Contraseña</label>
          <input id="reg-password" data-f="reg-password" type="password" autocomplete="new-password" />

          <div class="row">
              <button type="button" data-a="registrar">Registrarme</button>
              <button type="button" data-a="ir-login" class="sec">Volver</button>
          </div>
        </div>`;

      this.shadowRoot.querySelector('[data-a="registrar"]').onclick = () => {
        const email = this.shadowRoot.querySelector('[data-f="reg-email"]').value;
        const nombre = this.shadowRoot.querySelector('[data-f="reg-nombre"]').value;
        const password = this.shadowRoot.querySelector('[data-f="reg-password"]').value;
        this.#registro(email, nombre, password);
      };

      this.shadowRoot.querySelector('[data-a="ir-login"]').onclick = () => {
        this.#vista = 'login';
        this.#error = '';
        this.#pintar();
      };

      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="box">
        <h2>Identidad</h2>
        <p class="estado ko">Sin sesión</p>
        ${this.#error ? `<p class="estado ko">${this.#error}</p>` : ''}
        <label for="login-email">Email</label>
        <input id="login-email" data-f="email" type="email" autocomplete="email" />
        <label for="login-password">Contraseña</label>
        <input id="login-password" data-f="password" type="password" autocomplete="current-password" />
        <div class="row">
          <button type="button" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
          <button type="button" data-a="ir-registro" class="sec">Crear cuenta</button>
        </div>
      </div>`;
    this.shadowRoot.querySelector('[data-a="in"]').onclick = () => {
      const email = this.shadowRoot.querySelector('[data-f="email"]').value;
      const password = this.shadowRoot.querySelector('[data-f="password"]').value;
      this.#login(email, password);
    };
    this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => this.#login(DEMO.email, DEMO.password);
    this.shadowRoot.querySelector('[data-a="ir-registro"]').onclick = () => {
      this.#vista = 'registro';
      this.#error = '';
      this.#pintar();
    };
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
