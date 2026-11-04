// src/ucjc-identidad.js
var e = [
	{
		id: "u-demo",
		email: "demo@alumno.ucjc.edu",
		nombre: "Usuario demo",
		password: "demo"
	},
	{
		id: "u-juanperez",
		email: "juan.perez@alumno.ucjc.edu",
		nombre: "Juan Pérez",
		password: "juan123"
	},
	{
		id: "u-mariagarcia",
		email: "maria.garcia@alumno.ucjc.edu",
		nombre: "María García",
		password: "maria456"
	}
], t = e[0], n = (e) => String(e).replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), r = "\n  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }\n  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; max-width:22rem; }\n  h2 { margin:0 0 .5rem; font-size:1.1rem; }\n  label { display:block; font-size:.8rem; color:#5b677a; margin:.4rem 0 .15rem; }\n  input { width:100%; box-sizing:border-box; font:inherit; padding:.4rem .55rem; border:1px solid #c5ced9; border-radius:8px; }\n  .row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.75rem; }\n  button { font:inherit; border:0; border-radius:8px; padding:.45rem .85rem; cursor:pointer; background:#0f3d7a; color:#fff; }\n  button.sec { background:#e7ecf3; color:#152033; }\n  .estado { margin-top:.65rem; font-size:.9rem; }\n  .ok { color:#0b6b3a; } .ko { color:#8a3b12; }\n", i = class extends HTMLElement {
	#e = null;
	#t = "login";
	#n = "";
	connectedCallback() {
		this.shadowRoot || this.attachShadow({ mode: "open" }), this.#s(), this.#r();
	}
	#r() {
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
	#i(t, n, r) {
		let i = (t || "").trim().toLowerCase(), a = (n || "").trim(), o = r || "";
		!i || !a || !o ? (this.#n = "Rellena email, nombre y contraseña.", this.#s()) : e.some((e) => e.email === i) ? (this.#n = "Ese email ya está registrado.", this.#s()) : (e.push({
			id: `u-${e.length + 1}`,
			email: i,
			nombre: a,
			password: o
		}), this.#a(i, o));
	}
	#a(t, n) {
		let r = (t || "").trim().toLowerCase(), i = e.find((e) => e.email === r && e.password === n);
		i ? (this.#e = {
			id: i.id,
			email: i.email,
			nombre: i.nombre
		}, this.#n = "", this.#s(), this.#r()) : (this.#n = "Email o contraseña incorrectos.", this.#s());
	}
	#o() {
		this.#e = null, this.#t = "login", this.#n = "", this.#s(), this.#r();
	}
	#s() {
		this.#e ? (this.shadowRoot.innerHTML = `
        <style>${r}</style>
        <div class="box">
          <h2>Identidad</h2>
          <p class="estado ok">Sesión activa</p>
          <p><b>${n(this.#e.nombre)}</b><br>${n(this.#e.email)}<br><code>${n(this.#e.id)}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="sec">Cerrar sesión</button>
          </div>
        </div>`, this.shadowRoot.querySelector("[data-a=\"out\"]").onclick = () => this.#o()) : this.#t === "registro" ? (this.shadowRoot.innerHTML = `
        <style>${r}</style>
        <div class="box">
          <h2>Crear cuenta</h2>
          ${this.#n ? `<p class="estado ko">${this.#n}</p>` : ""}

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
        </div>`, this.shadowRoot.querySelector("[data-a=\"registrar\"]").onclick = () => {
			let e = this.shadowRoot.querySelector("[data-f=\"reg-email\"]").value, t = this.shadowRoot.querySelector("[data-f=\"reg-nombre\"]").value, n = this.shadowRoot.querySelector("[data-f=\"reg-password\"]").value;
			this.#i(e, t, n);
		}, this.shadowRoot.querySelector("[data-a=\"ir-login\"]").onclick = () => {
			this.#t = "login", this.#n = "", this.#s();
		}) : (this.shadowRoot.innerHTML = `
      <style>${r}</style>
      <div class="box">
        <h2>Identidad</h2>
        <p class="estado ko">Sin sesión</p>
        ${this.#n ? `<p class="estado ko">${this.#n}</p>` : ""}
        <label for="login-email">Email</label>
        <input id="login-email" data-f="email" type="email" autocomplete="email" />
        <label for="login-password">Contraseña</label>
        <input id="login-password" data-f="password" type="password" autocomplete="current-password" />
        <div class="row">
          <button type="button" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
          <button type="button" data-a="ir-registro" class="sec">Crear cuenta</button>
        </div>
      </div>`, this.shadowRoot.querySelector("[data-a=\"in\"]").onclick = () => {
			let e = this.shadowRoot.querySelector("[data-f=\"email\"]").value, t = this.shadowRoot.querySelector("[data-f=\"password\"]").value;
			this.#a(e, t);
		}, this.shadowRoot.querySelector("[data-a=\"demo\"]").onclick = () => this.#a(t.email, t.password), this.shadowRoot.querySelector("[data-a=\"ir-registro\"]").onclick = () => {
			this.#t = "registro", this.#n = "", this.#s();
		});
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", i);
// src/main.js
var a = {
	nombre: "identidad",
	version: "0.2.2"
};
export { a as default };
