// src/ucjc-identidad.js
var e = {
	id: "u-demo",
	email: "demo@alumno.ucjc.edu",
	nombre: "Usuario demo"
}, t = "\n  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }\n  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; max-width:22rem; }\n  h2 { margin:0 0 .5rem; font-size:1.1rem; }\n  label { display:block; font-size:.8rem; color:#5b677a; margin:.4rem 0 .15rem; }\n  input { width:100%; box-sizing:border-box; font:inherit; padding:.4rem .55rem; border:1px solid #c5ced9; border-radius:8px; }\n  .row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.75rem; }\n  button { font:inherit; border:0; border-radius:8px; padding:.45rem .85rem; cursor:pointer; background:#0f3d7a; color:#fff; }\n  button.sec { background:#e7ecf3; color:#152033; }\n  .estado { margin-top:.65rem; font-size:.9rem; }\n  .ok { color:#0b6b3a; } .ko { color:#8a3b12; }\n", n = class extends HTMLElement {
	#e = null;
	connectedCallback() {
		this.attachShadow({ mode: "open" }), this.#i(), this.#t();
	}
	#t() {
		let e = this.#e ? {
			autenticado: !0,
			usuario: { ...this.#e },
			momento: (/* @__PURE__ */ new Date()).toISOString()
		} : {
			autenticado: !1,
			usuario: null,
			momento: (/* @__PURE__ */ new Date()).toISOString()
		};
		window.dispatchEvent(new CustomEvent("ucjc:identidad:sesion-cambiada@1", { detail: e }));
	}
	#n(t, n) {
		let r = (t || "").trim() || e.email;
		this.#e = {
			id: `u-${r.split("@")[0] || "demo"}`,
			email: r,
			nombre: (n || "").trim() || e.nombre
		}, this.#i(), this.#t();
	}
	#r() {
		this.#e = null, this.#i(), this.#t();
	}
	#i() {
		this.#e ? (this.shadowRoot.innerHTML = `
        <style>${t}</style>
        <div class="box">
          <h2>Identidad</h2>
          <p class="estado ok">Sesión activa</p>
          <p><b>${this.#e.nombre}</b><br>${this.#e.email}<br><code>${this.#e.id}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="sec">Cerrar sesión</button>
          </div>
        </div>`, this.shadowRoot.querySelector("[data-a=\"out\"]").onclick = () => this.#r()) : (this.shadowRoot.innerHTML = `
      <style>${t}</style>
      <div class="box">
        <h2>Identidad</h2>
        <p class="estado ko">Sin sesión</p>
        <label>Email</label>
        <input data-f="email" type="email" value="${e.email}" />
        <label>Nombre</label>
        <input data-f="nombre" type="text" value="${e.nombre}" />
        <div class="row">
          <button type="button" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
        </div>
      </div>`, this.shadowRoot.querySelector("[data-a=\"in\"]").onclick = () => {
			let e = this.shadowRoot.querySelector("[data-f=\"email\"]").value, t = this.shadowRoot.querySelector("[data-f=\"nombre\"]").value;
			this.#n(e, t);
		}, this.shadowRoot.querySelector("[data-a=\"demo\"]").onclick = () => this.#n(e.email, e.nombre));
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", n);
// src/main.js
var r = {
	nombre: "identidad",
	version: "0.2.0"
};
export { r as default };
