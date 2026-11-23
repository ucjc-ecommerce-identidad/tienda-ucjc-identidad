// src/estilos.js
var e = (e) => `ayuda-${e}`;
function t(t, n) {
	return t in n ? ` aria-invalid="true" aria-describedby="${n[t] ? e(t) : "error"}"` : "";
}
function n(e, t) {
	let n = e.getElementById("vivo");
	n && (n.textContent = t);
}
// src/vistas.js
var r = (e) => String(e).replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), i = (e, t = "") => `<svg ${t ? `class="${t}" ` : ""}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, a = i("<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path class=\"arco\" d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>"), o = i("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 8v5M12 16.5v.01\"/>"), s = i("<path d=\"M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3\"/><path d=\"M10 17l-5-5 5-5M5 12h11\"/>"), c = i("<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "visto") + i("<path d=\"M3 3l18 18\"/><path d=\"M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.5 7.6A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.7-.7\"/><path d=\"M9.9 9.9a3 3 0 0 0 4.2 4.2\"/>", "tapado"), l = (e) => String(e).trim().split(/\s+/).slice(0, 2).map((e) => e.charAt(0).toUpperCase()).join("") || "?", u = (e, t, n = !1) => `
  <div class="cab">
    <span class="marca${n ? " abierto" : ""}">${a}</span>
    <div><p class="ceja">Identidad · Tienda UCJC</p><h2 id="${e}" tabindex="-1">${t}</h2></div>
  </div>`, d = (e) => e ? `<p id="error" class="error" role="alert">${o}<span>${r(e)}</span></p>` : "", f = (t, n) => n[t] ? `<p class="ayuda" id="${e(t)}">${o}<span>${r(n[t])}</span></p>` : "", p = {
	email: "inputmode=\"email\" autocapitalize=\"none\" spellcheck=\"false\"",
	nombre: "autocapitalize=\"words\" spellcheck=\"false\"",
	clave: "autocapitalize=\"none\" spellcheck=\"false\""
}, m = (e, n, { tipo: i, auto: a, entrada: o, valor: s = "", errores: c }) => `
  <label for="${e}">${n}</label>
  <input id="${e}" data-f="${e}" name="${e}" type="${i}" autocomplete="${a}" aria-required="true" ${p[o]}
    ${s ? `value="${r(s)}"` : ""}${t(e, c)} />
  ${f(e, c)}`, h = (e, n, r, i) => `
  <label for="${e}">${n}</label>
  <div class="clave">
    <input id="${e}" data-f="${e}" name="${e}" type="password" autocomplete="${r}" aria-required="true" ${p.clave}${t(e, i)} />
    <button type="button" class="ojo" data-a="ver" data-para="${e}" aria-pressed="false" aria-label="Mostrar contraseña">${c}</button>
  </div>
  ${f(e, i)}`;
function g({ valores: e, errores: t, resumen: n }) {
	return `
    <form class="box" novalidate aria-labelledby="titulo-login">
      ${u("titulo-login", "Inicia sesión")}
      <p class="estado ko">Sin sesión</p>
      ${d(n)}
      ${m("email", "Email", {
		tipo: "email",
		auto: "username",
		entrada: "email",
		valor: e.email,
		errores: t
	})}
      ${h("password", "Contraseña", "current-password", t)}
      <div class="acciones">
        <button type="submit" data-a="in">Iniciar sesión</button>
        <div class="separa">o</div>
        <button type="button" data-a="demo" class="sec">Entrar con la cuenta demo</button>
      </div>
      <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
    </form>`;
}
function _({ valores: e, errores: t, resumen: n }) {
	return `
    <form class="box" novalidate aria-labelledby="titulo-registro">
      ${u("titulo-registro", "Crear cuenta")}
      ${d(n)}
      ${m("reg-email", "Email", {
		tipo: "email",
		auto: "email",
		entrada: "email",
		valor: e.email,
		errores: t
	})}
      ${m("reg-nombre", "Nombre", {
		tipo: "text",
		auto: "name",
		entrada: "nombre",
		valor: e.nombre,
		errores: t
	})}
      ${h("reg-password", "Contraseña", "new-password", t)}
      <div class="acciones">
        <button type="submit" data-a="registrar">Registrarme</button>
      </div>
      <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
    </form>`;
}
function v(e) {
	return `
    <section class="box" aria-labelledby="titulo-sesion">
      ${u("titulo-sesion", "Tu cuenta", !0)}
      <p class="estado ok">Sesión activa</p>
      <div class="perfil">
        <span class="avatar" aria-hidden="true">${r(l(e.nombre))}</span>
        <dl class="datos">
          <dt>Nombre</dt><dd class="nombre">${r(e.nombre)}</dd>
          <dt>Email</dt><dd class="correo">${r(e.email)}</dd>
          <dt>ID</dt><dd><code>${r(e.id)}</code></dd>
        </dl>
      </div>
      <div class="acciones">
        <button type="button" data-a="out" class="danger">${s}Cerrar sesión</button>
      </div>
    </section>`;
}
// src/lector.js
var y = (e, t) => Object.fromEntries(t.map((t) => [t, e.querySelector(`[data-f="${t}"]`)?.value ?? ""])), b = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, x = "Ejemplo: nombre@alumno.ucjc.edu", S = (e) => e.length < 2 ? e.join("") : `${e.slice(0, -1).join(", ")} y ${e.at(-1)}`, C = (e, t) => ({
	ok: e.length === 0,
	errores: e,
	resumen: e.length ? t : ""
});
function w({ email: e = "", password: t = "" }) {
	let n = e.trim(), r = [], i = [];
	return n ? b.test(n) || r.push({
		campo: "email",
		mensaje: `Al email le falta la @ o el dominio. ${x}`
	}) : (r.push({
		campo: "email",
		mensaje: `Escribe tu email. ${x}`
	}), i.push("tu email")), t || (r.push({
		campo: "password",
		mensaje: "Escribe tu contraseña."
	}), i.push("tu contraseña")), C(r, i.length ? `Escribe ${S(i)} para entrar.` : "El email no tiene un formato válido. " + x);
}
function T({ email: e = "", nombre: t = "", password: n = "" }) {
	let r = e.trim(), i = [], a = [];
	return r ? b.test(r) || i.push({
		campo: "reg-email",
		mensaje: `Al email le falta la @ o el dominio. ${x}`
	}) : (i.push({
		campo: "reg-email",
		mensaje: `Escribe tu email. ${x}`
	}), a.push("email")), t.trim() || (i.push({
		campo: "reg-nombre",
		mensaje: "Escribe tu nombre para que la tienda sepa cómo llamarte."
	}), a.push("nombre")), n || (i.push({
		campo: "reg-password",
		mensaje: "Elige una contraseña."
	}), a.push("contraseña")), C(i, a.length ? `Rellena ${S(a)}.` : "El email no tiene un formato válido. " + x);
}
// src/cuentas.js
var E = [
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
], D = {
	email: E[0].email,
	password: E[0].password
}, O = (e) => (e || "").trim().toLowerCase(), k = ({ id: e, email: t, nombre: n }) => ({
	id: e,
	email: t,
	nombre: n
});
function A(e) {
	let t = O(e);
	return E.some((e) => e.email === t);
}
function j(e, t) {
	let n = O(e), r = E.find((e) => e.email === n && e.password === t);
	return r ? k(r) : null;
}
function M({ email: e, nombre: t, password: n }) {
	let r = {
		id: `u-${E.length + 1}`,
		email: O(e),
		nombre: t.trim(),
		password: n
	};
	return E.push(r), k(r);
}
// src/foco.js
var N = (e, t) => e.querySelector(`[data-f="${t}"]`)?.focus(), P = (e) => e.querySelector("h2")?.focus(), F = "ucjc:identidad:sesion-cambiada@1";
function I(e) {
	let t = {
		autenticado: !!e,
		usuario: e ? {
			id: e.id,
			email: e.email,
			nombre: e.nombre
		} : null,
		momento: (/* @__PURE__ */ new Date()).toISOString()
	};
	window.dispatchEvent(new CustomEvent(F, { detail: t }));
}
// src/ucjc-identidad.js
var L = class extends HTMLElement {
	#e = null;
	#t = "login";
	#n = "";
	#r = {};
	#i = {
		email: "",
		nombre: ""
	};
	connectedCallback() {
		this.shadowRoot || (this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = "<style>\n  :host {\n    --marca: #1e3a8a; --marca-osc: #172e6e; --marca-suave: rgba(30,58,138,.16);\n    --texto: #0f172a; --tenue: #5b6577; --borde: #dfe4ec; --borde-campo: #7b8699; --fondo-campo: #fbfcfe;\n    --rojo: #b3261e; --rojo-suave: #fdecea; --rojo-borde: #f3c9c5;\n    --alto: 2.75rem; /* 44 px: objetivo táctil cómodo */\n    display:block; font:15px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif; color:var(--texto);\n  }\n  * { box-sizing:border-box; }\n  .sr {\n    position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden;\n    clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap; border:0;\n  }\n  .box {\n    width:100%; max-width:22rem; background:#fff; border:1px solid var(--borde); border-radius:16px; padding:1.25rem;\n    box-shadow:0 1px 2px rgba(15,23,42,.04), 0 12px 28px -16px rgba(15,23,42,.28);\n  }\n  .cab { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }\n  .marca {\n    flex:none; width:2.5rem; height:2.5rem; border-radius:12px; display:grid; place-items:center; color:#fff;\n    background:linear-gradient(135deg, #2b4fb3, var(--marca-osc));\n  }\n  .marca svg { width:1.2rem; height:1.2rem; }\n  /* Candado abierto con la sesión iniciada: el arco gira sobre su pata izquierda y sube. */\n  .arco { transform-origin:8px 11px; }\n  .marca.abierto .arco { transform:translateY(-1.5px) rotate(-30deg); }\n  @media (prefers-reduced-motion: no-preference) {\n    .marca.abierto .arco { animation:abrir .45s cubic-bezier(.3,1.4,.5,1); }\n  }\n  @keyframes abrir { from { transform:none; } }\n  .ceja { margin:0; font-size:.72rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--tenue); }\n  h2 { margin:0; font-size:1.12rem; line-height:1.3; font-weight:650; letter-spacing:-.01em; scroll-margin-block:6rem; }\n  /* El título recibe el foco por código (no es un control): no necesita anillo. */\n  h2:focus { outline:none; }\n  .estado {\n    display:inline-flex; align-items:center; gap:.4rem; margin:0 0 1rem; padding:.2rem .65rem; border-radius:999px;\n    font-size:.8rem; font-weight:600;\n  }\n  .estado::before { content:\"\"; width:.45rem; height:.45rem; border-radius:50%; background:currentColor; }\n  .ok { background:#e7f6ee; color:#0b6b3a; }\n  .ko { background:#fff3e0; color:#8a4b00; }\n  label { display:block; margin:.85rem 0 .35rem; font-size:.82rem; font-weight:600; color:#334155; }\n  input {\n    width:100%; height:var(--alto); padding:0 .85rem; color:var(--texto);\n    /* 16 px: por debajo, iOS amplía la página al enfocar el campo */\n    font:inherit; font-size:max(16px, 1rem);\n    background:var(--fondo-campo); border:1px solid var(--borde-campo); border-radius:10px;\n    scroll-margin-block:6rem; /* la barra fija del shell no tapa el campo enfocado (2.4.11) */\n    transition:border-color .15s, box-shadow .15s, background-color .15s;\n  }\n  input:hover { border-color:var(--tenue); }\n  input:focus-visible { outline:3px solid var(--marca); outline-offset:1px; background:#fff; border-color:var(--marca); box-shadow:0 0 0 5px var(--marca-suave); }\n  input[aria-invalid=\"true\"] { border-color:var(--rojo); background:#fff; }\n  input[aria-invalid=\"true\"]:focus-visible { outline-color:var(--rojo); box-shadow:0 0 0 5px rgba(179,38,30,.15); }\n  .clave { position:relative; }\n  .clave input { padding-right:var(--alto); }\n  .ojo {\n    position:absolute; top:0; right:0; width:var(--alto); height:var(--alto); min-height:0; padding:0;\n    border:0; border-radius:0 10px 10px 0; background:none; color:var(--tenue);\n  }\n  .ojo:hover { background:#eef2f8; color:var(--texto); }\n  .ojo svg { width:1.15rem; height:1.15rem; }\n  .ojo .tapado { display:none; }\n  .ojo[aria-pressed=\"true\"] .visto { display:none; }\n  .ojo[aria-pressed=\"true\"] .tapado { display:inline; }\n  .ayuda { display:flex; gap:.4rem; align-items:flex-start; margin:.35rem 0 0; font-size:.82rem; color:var(--rojo); }\n  .ayuda svg { flex:none; width:1rem; height:1rem; margin-top:.12rem; }\n  .acciones { display:grid; gap:.6rem; margin-top:1.25rem; }\n  button {\n    display:inline-flex; align-items:center; justify-content:center; gap:.5rem; width:100%; min-height:var(--alto);\n    padding:0 1rem; font:inherit; font-weight:600; border-radius:10px; border:1px solid transparent; cursor:pointer;\n    background:var(--marca); color:#fff; transition:background-color .15s, border-color .15s, transform .05s;\n    scroll-margin-block:6rem;\n  }\n  button:hover { background:var(--marca-osc); }\n  button:active { transform:translateY(1px); }\n  button.sec { background:#fff; color:var(--texto); border-color:var(--borde-campo); }\n  button.sec:hover { background:#f4f6fa; }\n  button.danger { background:#fff; color:var(--rojo); border-color:var(--rojo-borde); }\n  button.danger:hover { background:var(--rojo-suave); border-color:#e8a9a3; }\n  button svg { width:1rem; height:1rem; flex:none; }\n  button:focus-visible { outline:3px solid var(--marca); outline-offset:2px; }\n  button.danger:focus-visible { outline-color:var(--rojo); }\n  .separa { display:flex; align-items:center; gap:.75rem; margin:.15rem 0; color:var(--tenue); font-size:.8rem; }\n  .separa::before, .separa::after { content:\"\"; flex:1; height:1px; background:var(--borde); }\n  .pie { display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:0 .35rem; margin:.75rem 0 0; text-align:center; font-size:.85rem; color:var(--tenue); }\n  .enlace {\n    width:auto; padding:0 .5rem; border:0; background:none; color:var(--marca);\n    font-weight:600; text-decoration:underline; text-underline-offset:3px;\n  }\n  .enlace:hover { background:none; color:var(--marca-osc); }\n  .error {\n    display:flex; gap:.55rem; align-items:flex-start; margin:0 0 .25rem; padding:.65rem .75rem; border-radius:10px;\n    background:var(--rojo-suave); border:1px solid var(--rojo-borde); color:#7a1d0b; font-size:.86rem;\n  }\n  .error svg { flex:none; width:1.05rem; height:1.05rem; margin-top:.1rem; }\n  .perfil { display:flex; align-items:center; gap:.85rem; padding:.85rem; border:1px solid var(--borde); border-radius:12px; background:#f8fafc; }\n  .avatar {\n    flex:none; width:3rem; height:3rem; border-radius:50%; display:grid; place-items:center; color:#fff;\n    font-weight:700; font-size:1.05rem; letter-spacing:.02em; background:linear-gradient(135deg, #3b63d1, var(--marca-osc));\n    box-shadow:0 0 0 3px #fff, 0 0 0 4px var(--borde);\n  }\n  .datos { display:grid; grid-template-columns:minmax(0,1fr); gap:0; margin:0; min-width:0; }\n  .datos dt { margin-top:.45rem; font-size:.72rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--tenue); }\n  .datos dt:first-child { margin-top:0; }\n  .datos dd { margin:0; min-width:0; overflow-wrap:anywhere; } /* se parte, nunca se corta con «…» */\n  .nombre { font-weight:650; }\n  code {\n    display:inline-block; padding:.05rem .45rem; border-radius:6px; background:#eef2f8; color:#334155;\n    font:.75rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;\n  }\n  @media (prefers-reduced-motion: reduce) { * { transition:none !important; } button:active { transform:none; } }\n  @media (forced-colors: active) { .estado::before { background:CanvasText; } input:focus-visible, button:focus-visible { outline-color:Highlight; } }\n</style><div class=\"sr\" id=\"vivo\" role=\"status\"></div><div id=\"raiz\"></div>"), this.#a(), I(this.#e);
	}
	#a(e = null) {
		let t = this.shadowRoot.getElementById("raiz"), n = {
			valores: this.#i,
			errores: this.#r,
			resumen: this.#n
		};
		if (t.innerHTML = this.#e ? v(this.#e) : this.#t === "registro" ? _(n) : g(n), this.#o(t), e === "titulo" && P(this.shadowRoot), e === "error") {
			let e = Object.keys(this.#r)[0];
			e && N(this.shadowRoot, e);
		}
	}
	#o(e) {
		let t = (t, n) => {
			let r = e.querySelector(`[data-a="${t}"]`);
			r && (r.onclick = n);
		}, n = e.querySelector("form");
		n && (n.onsubmit = (e) => {
			e.preventDefault(), this.#t === "registro" ? this.#d() : this.#u();
		}), t("demo", () => this.#f(j(D.email, D.password))), t("ir-registro", () => this.#m("registro")), t("ir-login", () => this.#m("login")), t("out", () => this.#p()), e.querySelectorAll("[data-a=\"ver\"]").forEach((t) => t.onclick = () => this.#s(e, t));
	}
	#s(e, t) {
		let n = e.querySelector(`[data-f="${t.dataset.para}"]`), r = n.type === "password";
		n.type = r ? "text" : "password", t.setAttribute("aria-pressed", String(r));
	}
	#c(e, t) {
		this.#r = Object.fromEntries(e.map((e) => [e.campo, e.mensaje])), this.#n = t, this.#a("error");
	}
	#l() {
		this.#r = {}, this.#n = "";
	}
	#u() {
		let e = this.shadowRoot, t = y(e, ["email", "password"]);
		this.#i.email = t.email.trim();
		let n = w(t);
		if (!n.ok) return this.#c(n.errores, n.resumen);
		let r = j(t.email, t.password);
		if (!r) return this.#c([{
			campo: "password",
			mensaje: null
		}], "Email o contraseña incorrectos. Revisa los dos campos o entra con la cuenta demo.");
		this.#f(r);
	}
	#d() {
		let e = y(this.shadowRoot, [
			"reg-email",
			"reg-nombre",
			"reg-password"
		]);
		this.#i = {
			email: e["reg-email"].trim(),
			nombre: e["reg-nombre"].trim()
		};
		let t = T({
			email: e["reg-email"],
			nombre: e["reg-nombre"],
			password: e["reg-password"]
		});
		if (!t.ok) return this.#c(t.errores, t.resumen);
		if (A(e["reg-email"])) return this.#c([{
			campo: "reg-email",
			mensaje: "Usa otro email o vuelve a iniciar sesión con este."
		}], "Ese email ya está registrado. Inicia sesión o usa otro email.");
		let n = M({
			email: e["reg-email"],
			nombre: e["reg-nombre"],
			password: e["reg-password"]
		});
		this.#f(n, "Cuenta creada. ");
	}
	#f(e, t = "") {
		this.#e = e, this.#i = {
			email: "",
			nombre: ""
		}, this.#l(), this.#a("titulo"), n(this.shadowRoot, `${t}Sesión iniciada como ${e.nombre}.`), I(this.#e);
	}
	#p() {
		this.#e = null, this.#t = "login", this.#l(), this.#a("titulo"), n(this.shadowRoot, "Sesión cerrada."), I(null);
	}
	#m(e) {
		let t = this.#t === "registro" ? "reg-email" : "email";
		this.#i.email = y(this.shadowRoot, [t])[t].trim(), this.#t = e, this.#l(), this.#a("titulo");
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", L);
// src/main.js
var R = {
	nombre: "identidad",
	version: "0.2.6"
};
export { R as default };
