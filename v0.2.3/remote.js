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
], t = e[0], n = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, r = (e) => String(e).replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), i = "\n  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }\n  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; max-width:22rem; }\n  h2 { margin:0 0 .5rem; font-size:1.1rem; }\n  label { display:block; font-size:.85rem; color:#3d4859; margin:.5rem 0 .15rem; }\n  input { width:100%; box-sizing:border-box; font:inherit; padding:.4rem .55rem; border:1px solid #8a96a8; border-radius:8px; }\n  input[aria-invalid=\"true\"] { border-color:#a3280f; }\n  .row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.75rem; }\n  button { font:inherit; border:0; border-radius:8px; padding:.45rem .85rem; cursor:pointer; background:#0f3d7a; color:#fff; }\n  button.sec { background:#e7ecf3; color:#152033; }\n  input:focus-visible, button:focus-visible { outline:3px solid #f2a900; outline-offset:2px; }\n  .estado { margin-top:.65rem; font-size:.9rem; }\n  .ok { color:#0b6b3a; } .ko { color:#8a3b12; }\n  .error { margin:.5rem 0; padding:.45rem .6rem; border-left:4px solid #a3280f; background:#fdecea; color:#7a1d0b; font-size:.9rem; }\n", a = class extends HTMLElement {
	#e = null;
	#t = "login";
	#n = "";
	#r = "";
	connectedCallback() {
		this.shadowRoot || this.attachShadow({ mode: "open" }), this.#p(), this.#i();
	}
	#i() {
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
	#a(e, t) {
		this.#n = e, this.#r = t, this.#p();
	}
	#o(t, r, i) {
		let a = (t || "").trim().toLowerCase(), o = (r || "").trim(), s = i || "";
		if (!a || !o || !s) {
			let e = a ? o ? "reg-password" : "reg-nombre" : "reg-email";
			return this.#a("Rellena email, nombre y contraseña.", e);
		}
		if (!n.test(a)) return this.#a("El email no tiene un formato válido. Ejemplo: nombre@alumno.ucjc.edu", "reg-email");
		if (e.some((e) => e.email === a)) return this.#a("Ese email ya está registrado. Inicia sesión o usa otro email.", "reg-email");
		e.push({
			id: `u-${e.length + 1}`,
			email: a,
			nombre: o,
			password: s
		}), this.#s(a, s);
	}
	#s(t, n) {
		let r = (t || "").trim().toLowerCase();
		if (!r || !n) return this.#a("Escribe tu email y tu contraseña para entrar.", r ? "password" : "email");
		let i = e.find((e) => e.email === r && e.password === n);
		if (!i) return this.#a("Email o contraseña incorrectos. Revisa los dos campos o pulsa «Demo rápida».", "password");
		this.#e = {
			id: i.id,
			email: i.email,
			nombre: i.nombre
		}, this.#n = "", this.#r = "", this.#p(), this.#i();
	}
	#c() {
		this.#e = null, this.#t = "login", this.#n = "", this.#r = "", this.#p(), this.#i();
	}
	#l(e) {
		this.#t = e, this.#n = "", this.#r = "", this.#p();
	}
	#u(e, t, n, r, i) {
		return `
      <label for="${t}">${n}</label>
      <input id="${t}" data-f="${e}" name="${e}" type="${r}" autocomplete="${i}"
        ${this.#r === e ? "aria-invalid=\"true\" aria-describedby=\"error\"" : ""} />`;
	}
	#d() {
		return this.#n ? `<p id="error" class="error" role="alert">${r(this.#n)}</p>` : "";
	}
	#f() {
		this.#r && this.shadowRoot.querySelector(`[data-f="${this.#r}"]`)?.focus();
	}
	#p() {
		if (this.#e) {
			this.shadowRoot.innerHTML = `
        <style>${i}</style>
        <div class="box">
          <h2>Identidad</h2>
          <p class="estado ok" role="status">Sesión activa</p>
          <p><b>${r(this.#e.nombre)}</b><br>${r(this.#e.email)}<br><code>${r(this.#e.id)}</code></p>
          <div class="row">
            <button type="button" data-a="out" class="sec">Cerrar sesión</button>
          </div>
        </div>`, this.shadowRoot.querySelector("[data-a=\"out\"]").onclick = () => this.#c();
			return;
		}
		if (this.#t === "registro") {
			this.shadowRoot.innerHTML = `
        <style>${i}</style>
        <form class="box" novalidate aria-labelledby="titulo-registro">
          <h2 id="titulo-registro">Crear cuenta</h2>
          ${this.#d()}
          ${this.#u("reg-email", "reg-email", "Email", "email", "email")}
          ${this.#u("reg-nombre", "reg-nombre", "Nombre", "text", "name")}
          ${this.#u("reg-password", "reg-password", "Contraseña", "password", "new-password")}
          <div class="row">
            <button type="submit" data-a="registrar">Registrarme</button>
            <button type="button" data-a="ir-login" class="sec">Volver</button>
          </div>
        </form>`;
			let e = (e) => this.shadowRoot.querySelector(`[data-f="${e}"]`).value;
			this.shadowRoot.querySelector("form").onsubmit = (t) => {
				t.preventDefault(), this.#o(e("reg-email"), e("reg-nombre"), e("reg-password"));
			}, this.shadowRoot.querySelector("[data-a=\"ir-login\"]").onclick = () => this.#l("login"), this.#f();
			return;
		}
		this.shadowRoot.innerHTML = `
      <style>${i}</style>
      <form class="box" novalidate aria-labelledby="titulo-login">
        <h2 id="titulo-login">Identidad</h2>
        <p class="estado ko" role="status">Sin sesión</p>
        ${this.#d()}
        ${this.#u("email", "login-email", "Email", "email", "email")}
        ${this.#u("password", "login-password", "Contraseña", "password", "current-password")}
        <div class="row">
          <button type="submit" data-a="in">Iniciar sesión</button>
          <button type="button" data-a="demo" class="sec">Demo rápida</button>
          <button type="button" data-a="ir-registro" class="sec">Crear cuenta</button>
        </div>
      </form>`;
		let e = (e) => this.shadowRoot.querySelector(`[data-f="${e}"]`).value;
		this.shadowRoot.querySelector("form").onsubmit = (t) => {
			t.preventDefault(), this.#s(e("email"), e("password"));
		}, this.shadowRoot.querySelector("[data-a=\"demo\"]").onclick = () => this.#s(t.email, t.password), this.shadowRoot.querySelector("[data-a=\"ir-registro\"]").onclick = () => this.#l("registro"), this.#f();
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", a);
// src/main.js
var o = {
	nombre: "identidad",
	version: "0.2.3"
};
export { o as default };
