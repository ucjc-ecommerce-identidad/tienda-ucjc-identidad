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
})[e]), i = "\n  :host {\n    --marca: #1e3a8a; --marca-osc: #172e6e; --marca-suave: rgba(30,58,138,.14);\n    --texto: #0f172a; --tenue: #5b6577; --borde: #dfe4ec; --fondo-campo: #fbfcfe;\n    --rojo: #b3261e; --rojo-suave: #fdecea; --rojo-borde: #f3c9c5;\n    display:block; font:15px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif; color:var(--texto);\n  }\n  * { box-sizing:border-box; }\n  .box {\n    width:100%; max-width:22rem; background:#fff; border:1px solid var(--borde); border-radius:16px; padding:1.25rem;\n    box-shadow:0 1px 2px rgba(15,23,42,.04), 0 12px 28px -16px rgba(15,23,42,.28);\n  }\n  .cab { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }\n  .marca {\n    flex:none; width:2.5rem; height:2.5rem; border-radius:12px; display:grid; place-items:center; color:#fff;\n    background:linear-gradient(135deg, #2b4fb3, var(--marca-osc));\n  }\n  .marca svg { width:1.2rem; height:1.2rem; }\n  .ceja { margin:0; font-size:.72rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--tenue); }\n  h2 { margin:0; font-size:1.12rem; line-height:1.3; font-weight:650; letter-spacing:-.01em; }\n  .estado {\n    display:inline-flex; align-items:center; gap:.4rem; margin:0 0 1rem; padding:.2rem .65rem; border-radius:999px;\n    font-size:.8rem; font-weight:600;\n  }\n  .estado::before { content:\"\"; width:.45rem; height:.45rem; border-radius:50%; background:currentColor; }\n  .ok { background:#e7f6ee; color:#0b6b3a; }\n  .ko { background:#fff3e0; color:#8a4b00; }\n  label { display:block; margin:.85rem 0 .35rem; font-size:.82rem; font-weight:600; color:#334155; }\n  input {\n    width:100%; height:2.75rem; padding:0 .85rem; font:inherit; color:var(--texto);\n    background:var(--fondo-campo); border:1px solid #cdd4df; border-radius:10px;\n    transition:border-color .15s, box-shadow .15s, background-color .15s;\n  }\n  input:hover { border-color:#aab4c3; }\n  input:focus-visible { outline:none; background:#fff; border-color:var(--marca); box-shadow:0 0 0 4px var(--marca-suave); }\n  input[aria-invalid=\"true\"] { border-color:var(--rojo); background:#fff; }\n  input[aria-invalid=\"true\"]:focus-visible { box-shadow:0 0 0 4px rgba(179,38,30,.15); }\n  .acciones { display:grid; gap:.6rem; margin-top:1.25rem; }\n  button {\n    display:inline-flex; align-items:center; justify-content:center; gap:.5rem; width:100%; min-height:2.75rem;\n    padding:0 1rem; font:inherit; font-weight:600; border-radius:10px; border:1px solid transparent; cursor:pointer;\n    background:var(--marca); color:#fff; transition:background-color .15s, border-color .15s, transform .05s;\n  }\n  button:hover { background:var(--marca-osc); }\n  button:active { transform:translateY(1px); }\n  button.sec { background:#fff; color:var(--texto); border-color:var(--borde); }\n  button.sec:hover { background:#f4f6fa; border-color:#c9d1dd; }\n  button.danger { background:#fff; color:var(--rojo); border-color:var(--rojo-borde); }\n  button.danger:hover { background:var(--rojo-suave); border-color:#e8a9a3; }\n  button svg { width:1rem; height:1rem; flex:none; }\n  button:focus-visible { outline:3px solid #f2a900; outline-offset:2px; }\n  .separa { display:flex; align-items:center; gap:.75rem; margin:.15rem 0; color:var(--tenue); font-size:.78rem; }\n  .separa::before, .separa::after { content:\"\"; flex:1; height:1px; background:var(--borde); }\n  .pie { margin:1rem 0 0; text-align:center; font-size:.85rem; color:var(--tenue); }\n  .enlace {\n    display:inline; width:auto; min-height:0; padding:0; border:0; background:none; color:var(--marca);\n    font-weight:600; text-decoration:underline; text-underline-offset:3px;\n  }\n  .enlace:hover { background:none; color:var(--marca-osc); }\n  .error {\n    display:flex; gap:.55rem; align-items:flex-start; margin:0 0 .25rem; padding:.65rem .75rem; border-radius:10px;\n    background:var(--rojo-suave); border:1px solid var(--rojo-borde); color:#7a1d0b; font-size:.86rem;\n  }\n  .error svg { flex:none; width:1.05rem; height:1.05rem; margin-top:.1rem; }\n  .perfil { display:flex; align-items:center; gap:.85rem; padding:.85rem; border:1px solid var(--borde); border-radius:12px; background:#f8fafc; }\n  .avatar {\n    flex:none; width:3rem; height:3rem; border-radius:50%; display:grid; place-items:center; color:#fff;\n    font-weight:700; font-size:1.05rem; letter-spacing:.02em; background:linear-gradient(135deg, #3b63d1, var(--marca-osc));\n    box-shadow:0 0 0 3px #fff, 0 0 0 4px var(--borde);\n  }\n  .perfil p { margin:0; min-width:0; }\n  .nombre { font-weight:650; }\n  .correo { display:block; color:var(--tenue); font-size:.86rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n  code {\n    display:inline-block; margin-top:.3rem; padding:.05rem .45rem; border-radius:6px; background:#eef2f8; color:#334155;\n    font:.75rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;\n  }\n  @media (prefers-reduced-motion: reduce) { * { transition:none !important; } button:active { transform:none; } }\n", a = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/></svg>", o = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 8v5M12 16.5v.01\"/></svg>", s = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3\"/><path d=\"M10 17l-5-5 5-5M5 12h11\"/></svg>", c = (e) => String(e).trim().split(/\s+/).slice(0, 2).map((e) => e.charAt(0).toUpperCase()).join("") || "?", l = (e, t, n = "Identidad · Tienda UCJC") => `
  <div class="cab">
    <span class="marca">${a}</span>
    <div><p class="ceja">${n}</p><h2 id="${e}">${t}</h2></div>
  </div>`, u = class extends HTMLElement {
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
		if (!i) return this.#a("Email o contraseña incorrectos. Revisa los dos campos o entra con la cuenta demo.", "password");
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
		return this.#n ? `<p id="error" class="error" role="alert">${o}<span>${r(this.#n)}</span></p>` : "";
	}
	#f() {
		this.#r && this.shadowRoot.querySelector(`[data-f="${this.#r}"]`)?.focus();
	}
	#p() {
		if (this.#e) {
			this.shadowRoot.innerHTML = `
        <style>${i}</style>
        <section class="box" aria-labelledby="titulo-sesion">
          ${l("titulo-sesion", "Tu cuenta")}
          <p class="estado ok" role="status">Sesión activa</p>
          <div class="perfil">
            <span class="avatar" aria-hidden="true">${r(c(this.#e.nombre))}</span>
            <p><span class="nombre">${r(this.#e.nombre)}</span><span class="correo">${r(this.#e.email)}</span><code>${r(this.#e.id)}</code></p>
          </div>
          <div class="acciones">
            <button type="button" data-a="out" class="danger">${s}Cerrar sesión</button>
          </div>
        </section>`, this.shadowRoot.querySelector("[data-a=\"out\"]").onclick = () => this.#c();
			return;
		}
		if (this.#t === "registro") {
			this.shadowRoot.innerHTML = `
        <style>${i}</style>
        <form class="box" novalidate aria-labelledby="titulo-registro">
          ${l("titulo-registro", "Crear cuenta")}
          ${this.#d()}
          ${this.#u("reg-email", "reg-email", "Email", "email", "email")}
          ${this.#u("reg-nombre", "reg-nombre", "Nombre", "text", "name")}
          ${this.#u("reg-password", "reg-password", "Contraseña", "password", "new-password")}
          <div class="acciones">
            <button type="submit" data-a="registrar">Registrarme</button>
          </div>
          <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
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
        ${l("titulo-login", "Inicia sesión")}
        <p class="estado ko" role="status">Sin sesión</p>
        ${this.#d()}
        ${this.#u("email", "login-email", "Email", "email", "email")}
        ${this.#u("password", "login-password", "Contraseña", "password", "current-password")}
        <div class="acciones">
          <button type="submit" data-a="in">Iniciar sesión</button>
          <div class="separa">o</div>
          <button type="button" data-a="demo" class="sec">Entrar con la cuenta demo</button>
        </div>
        <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
      </form>`;
		let e = (e) => this.shadowRoot.querySelector(`[data-f="${e}"]`).value;
		this.shadowRoot.querySelector("form").onsubmit = (t) => {
			t.preventDefault(), this.#s(e("email"), e("password"));
		}, this.shadowRoot.querySelector("[data-a=\"demo\"]").onclick = () => this.#s(t.email, t.password), this.shadowRoot.querySelector("[data-a=\"ir-registro\"]").onclick = () => this.#l("registro"), this.#f();
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", u);
// src/main.js
var d = {
	nombre: "identidad",
	version: "0.2.5"
};
export { d as default };
