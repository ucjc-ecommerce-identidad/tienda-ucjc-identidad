const EVT = 'ucjc:identidad:sesion-cambiada@1';

const DEMO = {
  id: 'u-demo',
  email: 'demo@alumno.ucjc.edu',
  nombre: 'Usuario demo',
};

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

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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

  #login(email, nombre) {
    const mail = (email || '').trim() || DEMO.email;
    this.#usuario = {
      id: `u-${mail.split('@')[0] || 'demo'}`,
      email: mail,
      nombre: (nombre || '').trim() || DEMO.nombre,
    };
    this.#pintar();
    this.#emitir();
  }

  #logout() {
    this.#usuario = null;
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
          <p><b>${this.#usuario.nombre}</b><br>${this.#usuario.email}<br><code>${this.#usuario.id}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="sec">Cerrar sesión</button>
          </div>
        </div>`;
      this.shadowRoot.querySelector('[data-a="out"]').onclick = () => this.#logout();
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="box">
        <h2>Identidad</h2>
        <p class="estado ko">Sin sesión</p>
        <label>Email</label>
        <input data-f="email" type="email" value="${DEMO.email}" />
        <label>Nombre</label>
        <input data-f="nombre" type="text" value="${DEMO.nombre}" />
        <div class="row">
          <button type="button" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
        </div>
      </div>`;
    this.shadowRoot.querySelector('[data-a="in"]').onclick = () => {
      const email = this.shadowRoot.querySelector('[data-f="email"]').value;
      const nombre = this.shadowRoot.querySelector('[data-f="nombre"]').value;
      this.#login(email, nombre);
    };
    this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => this.#login(DEMO.email, DEMO.nombre);
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
