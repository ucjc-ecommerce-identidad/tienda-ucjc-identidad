// src/estilos.js
var e = (e) => `ayuda-${e}`;
function t(t, n) {
	return t in n ? ` aria-invalid="true" aria-describedby="${n[t] ? e(t) : "error"}"` : "";
}
function n(e, t) {
	let n = e.getElementById("vivo");
	n && (n.textContent = t);
}
// src/proveedores.js
var r = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e}</svg>`, i = [
	{
		id: "google",
		nombre: "Google",
		logo: r("<path fill=\"#4285F4\" d=\"M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z\"/><path fill=\"#34A853\" d=\"M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A12 12 0 0 0 12 24z\"/><path fill=\"#FBBC05\" d=\"M5.29 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.28a12 12 0 0 0 0 10.78l4.01-3.09z\"/><path fill=\"#EA4335\" d=\"M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75z\"/>")
	},
	{
		id: "microsoft",
		nombre: "Microsoft",
		logo: r("<path fill=\"#F25022\" d=\"M2 2h9.5v9.5H2z\"/><path fill=\"#7FBA00\" d=\"M12.5 2H22v9.5h-9.5z\"/><path fill=\"#00A4EF\" d=\"M2 12.5h9.5V22H2z\"/><path fill=\"#FFB900\" d=\"M12.5 12.5H22V22h-9.5z\"/>")
	},
	{
		id: "github",
		nombre: "GitHub",
		logo: r("<path fill=\"currentColor\" d=\"M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z\"/>")
	}
], a = (e) => i.find((t) => t.id === e) ?? null, o = (e) => String(e).replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), s = (e, t = "") => `<svg ${t ? `class="${t}" ` : ""}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, c = s("<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path class=\"arco\" d=\"M8 11V7a4 4 0 0 1 8 0v4\"/><path class=\"arco-abierto\" d=\"M8 11V7a4 4 0 0 1 7.9-.9\"/>"), l = s("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 8v5M12 16.5v.01\"/>"), u = s("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 7.5v.01\"/>"), d = s("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 12.5l2.7 2.7L16 9.5\"/>"), f = s("<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/>"), p = s("<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><circle cx=\"9\" cy=\"12\" r=\"2.5\"/><path d=\"M14 10h4M14 14h4\"/>"), m = s("<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>"), h = s("<path d=\"M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3\"/><path d=\"M10 17l-5-5 5-5M5 12h11\"/>"), g = s("<path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "visto") + s("<path d=\"M3 3l18 18\"/><path d=\"M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.5 7.6A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.7-.7\"/><path d=\"M9.9 9.9a3 3 0 0 0 4.2 4.2\"/>", "tapado"), _ = (e) => String(e).trim().split(/\s+/).slice(0, 2).map((e) => e.charAt(0).toUpperCase()).join("") || "?", v = (e, t, n = !1) => `
  <p class="logo"><span class="marca${n ? " abierto" : ""}">${c}</span>Tienda UCJC</p>
  <h2 id="${e}" tabindex="-1">${t}</h2>`, y = s("<path d=\"M5 12h14M13 6l6 6-6 6\"/>", "flecha"), b = (e, t) => `<button type="submit" class="btn" data-a="${e}"><span>${t}</span>${y}</button>`, x = (e) => e ? `<p id="error" class="error" role="alert">${l}<span>${o(e)}</span></p>` : "", S = (t, n) => n[t] ? `<p class="ayuda" id="${e(t)}">${l}<span>${o(n[t])}</span></p>` : "", C = {
	email: "inputmode=\"email\" autocapitalize=\"none\" spellcheck=\"false\"",
	nombre: "autocapitalize=\"words\" spellcheck=\"false\"",
	clave: "autocapitalize=\"none\" spellcheck=\"false\""
}, w = (e, n, { tipo: r, auto: i, entrada: a, valor: s = "", errores: c, ejemplo: l = "" }) => `
  <label for="${e}">${n}</label>
  <input id="${e}" data-f="${e}" name="${e}" type="${r}" autocomplete="${i}" aria-required="true" ${C[a]}${l ? ` placeholder="${l}"` : ""}
    ${s ? `value="${o(s)}"` : ""}${t(e, c)} />
  ${S(e, c)}`, T = (e, n, r, i) => `
  <label for="${e}">${n}</label>
  <div class="clave">
    <input id="${e}" data-f="${e}" name="${e}" type="password" autocomplete="${r}" aria-required="true" placeholder="${n}" ${C.clave}${t(e, i)} />
    <button type="button" class="ojo" data-a="ver" data-para="${e}" aria-pressed="false" aria-label="Mostrar contraseña">${g}</button>
  </div>
  ${S(e, i)}`, E = (e, t = u) => `<p class="aviso">${t}<span>${e}</span></p>`, D = (e) => `
  <div class="separa" id="etq-prov">${e}</div>
  <div class="provs" role="group" aria-labelledby="etq-prov">
    ${i.map((e) => `<button type="button" class="prov" data-a="prov" data-p="${e.id}" title="${e.nombre}">${e.logo}<span class="sr">${e.nombre}</span></button>`).join("")}
  </div>`, O = (e = "Volver a iniciar sesión") => `<p class="pie"><button type="button" data-a="cancelar" class="enlace">${e}</button></p>`;
function k({ valores: e, errores: t, resumen: n, exito: r }) {
	return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-login">
      ${v("titulo-login", "Inicia sesión")}
      <p class="estado ko sr">Sin sesión</p>
      ${r ? E(o(r), d) : ""}
      ${x(n)}
      ${w("email", "Email", {
		tipo: "email",
		auto: "username",
		entrada: "email",
		valor: e.email,
		errores: t,
		ejemplo: "tu@alumno.ucjc.edu"
	})}
      ${T("password", "Contraseña", "current-password", t)}
      <p class="olvide"><button type="button" data-a="olvide" class="enlace">¿Olvidaste tu contraseña?</button></p>
      <div class="acciones">
        ${b("in", "Iniciar sesión")}
        <button type="button" data-a="demo" class="btn-sec">Entrar con la cuenta demo</button>
        ${D("o continúa con")}
      </div>
      <p class="pie">¿No tienes cuenta? <button type="button" data-a="ir-registro" class="enlace">Crear cuenta</button></p>
    </form>`;
}
function A({ valores: e, errores: t, resumen: n }) {
	return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-registro">
      ${v("titulo-registro", "Crear cuenta")}
      ${x(n)}
      ${w("reg-email", "Email", {
		tipo: "email",
		auto: "email",
		entrada: "email",
		valor: e.email,
		errores: t,
		ejemplo: "tu@alumno.ucjc.edu"
	})}
      ${w("reg-nombre", "Nombre", {
		tipo: "text",
		auto: "name",
		entrada: "nombre",
		valor: e.nombre,
		errores: t,
		ejemplo: "Nombre y apellido"
	})}
      ${T("reg-password", "Contraseña", "new-password", t)}
      <div class="acciones">
        ${b("registrar", "Registrarme")}
        ${D("o regístrate con")}
      </div>
      <p class="pie">¿Ya tienes cuenta? <button type="button" data-a="ir-login" class="enlace">Volver a iniciar sesión</button></p>
    </form>`;
}
function j({ proveedor: e, cuentas: t }) {
	return `
    <section class="tarjeta" aria-labelledby="titulo-selector">
      ${v("titulo-selector", `Elige una cuenta de ${e.nombre}`)}
      ${E(`Esto es una <strong>simulación</strong> y no se conecta con ${e.nombre}.`)}
      <ul class="cuentas">
        ${t.map((e) => `
    <li><button type="button" class="cuenta" data-a="cuenta" data-email="${o(e.email)}">
      <span class="av" aria-hidden="true">${o(_(e.nombre))}</span>
      <span class="txt"><span class="nombre">${o(e.nombre)}</span><span class="correo">${o(e.email)}</span></span>
    </button></li>`).join("")}
        <li><button type="button" class="cuenta" data-a="otra">
          <span class="av" aria-hidden="true">+</span><span class="txt"><span class="nombre">Usar otra cuenta</span></span>
        </button></li>
      </ul>
      ${O("Cancelar")}
    </section>`;
}
function M({ proveedor: e, valores: t, errores: n, resumen: r }) {
	return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-otra">
      ${v("titulo-otra", `Usar otra cuenta de ${e.nombre}`)}
      ${E(`Esto es una <strong>simulación</strong> y no se conecta con ${e.nombre}.`)}
      ${x(r)}
      ${w("prov-email", "Email", {
		tipo: "email",
		auto: "email",
		entrada: "email",
		valor: t.email,
		errores: n,
		ejemplo: "tu@correo.com"
	})}
      <div class="acciones">
        ${b("continuar", "Continuar")}
      </div>
      <p class="pie"><button type="button" data-a="volver-cuentas" class="enlace">Volver a elegir cuenta</button></p>
    </form>`;
}
function N({ valores: e, errores: t, resumen: n }) {
	return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-olvide">
      ${v("titulo-olvide", "Recupera tu contraseña")}
      ${E("Esto es una <strong>simulación</strong> y no se envía ningún correo.")}
      ${x(n)}
      ${w("rec-email", "Email de tu cuenta", {
		tipo: "email",
		auto: "email",
		entrada: "email",
		valor: e.email,
		errores: t,
		ejemplo: "tu@alumno.ucjc.edu"
	})}
      <div class="acciones">
        ${b("enviar-enlace", "Enviar enlace")}
      </div>
      ${O()}
    </form>`;
}
function ee({ email: e }) {
	return `
    <section class="tarjeta" aria-labelledby="titulo-enlace">
      ${v("titulo-enlace", "Revisa tu correo")}
      ${E("Esto es una <strong>simulación</strong> y no se ha enviado ningún correo.")}
      <p class="texto">Si <strong>${o(e)}</strong> está registrado, recibirá un enlace para elegir una contraseña nueva.</p>
      <div class="acciones">
        <button type="button" class="btn" data-a="abrir-enlace"><span>Abrir el enlace del correo (demo)</span>${y}</button>
      </div>
      ${O()}
    </section>`;
}
function te({ errores: e, resumen: t }) {
	return `
    <form class="tarjeta" novalidate aria-labelledby="titulo-nueva">
      ${v("titulo-nueva", "Elige una contraseña nueva")}
      ${x(t)}
      ${T("nueva-password", "Contraseña nueva", "new-password", e)}
      <div class="acciones">
        ${b("guardar-clave", "Guardar contraseña")}
      </div>
      ${O()}
    </form>`;
}
var P = (e) => e.toLocaleTimeString("es-ES", {
	hour: "2-digit",
	minute: "2-digit"
});
function F(e, t = /* @__PURE__ */ new Date()) {
	let n = (e, t, n) => `<div class="fila"><dt>${e}${t}</dt><dd>${n}</dd></div>`;
	return `
    <section class="tarjeta" aria-labelledby="titulo-sesion">
      ${v("titulo-sesion", "Tu cuenta", !0)}
      <div class="perfil">
        <span class="avatar" aria-hidden="true">${o(_(e.nombre))}</span>
        <p class="nombre">${o(e.nombre)}</p>
        <p class="estado ok">Sesión activa</p>
      </div>
      <dl class="datos">
        ${n(f, "Email", o(e.email))}
        ${n(p, "ID de usuario", `<code>${o(e.id)}</code>`)}
        ${n(m, "Inicio de sesión", `<time datetime="${t.toISOString()}">${P(t)}</time>`)}
      </dl>
      <div class="acciones">
        <button type="button" data-a="out" class="danger">${h}Cerrar sesión</button>
      </div>
    </section>`;
}
// src/lector.js
var I = (e, t) => Object.fromEntries(t.map((t) => [t, e.querySelector(`[data-f="${t}"]`)?.value ?? ""])), L = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, R = "Ejemplo: nombre@alumno.ucjc.edu", z = (e) => e.length < 2 ? e.join("") : `${e.slice(0, -1).join(", ")} y ${e.at(-1)}`, B = (e, t) => ({
	ok: e.length === 0,
	errores: e,
	resumen: e.length ? t : ""
});
function V({ email: e = "", password: t = "" }) {
	let n = e.trim(), r = [], i = [];
	return n ? L.test(n) || r.push({
		campo: "email",
		mensaje: `Al email le falta la @ o el dominio. ${R}`
	}) : (r.push({
		campo: "email",
		mensaje: `Escribe tu email. ${R}`
	}), i.push("tu email")), t || (r.push({
		campo: "password",
		mensaje: "Escribe tu contraseña."
	}), i.push("tu contraseña")), B(r, i.length ? `Escribe ${z(i)} para entrar.` : "El email no tiene un formato válido. " + R);
}
function H({ email: e = "", nombre: t = "", password: n = "" }) {
	let r = e.trim(), i = [], a = [];
	return r ? L.test(r) || i.push({
		campo: "reg-email",
		mensaje: `Al email le falta la @ o el dominio. ${R}`
	}) : (i.push({
		campo: "reg-email",
		mensaje: `Escribe tu email. ${R}`
	}), a.push("email")), t.trim() || (i.push({
		campo: "reg-nombre",
		mensaje: "Escribe tu nombre para que la tienda sepa cómo llamarte."
	}), a.push("nombre")), n || (i.push({
		campo: "reg-password",
		mensaje: "Elige una contraseña."
	}), a.push("contraseña")), B(i, a.length ? `Rellena ${z(a)}.` : "El email no tiene un formato válido. " + R);
}
function U({ email: e = "" }, t) {
	let n = e.trim();
	return n ? L.test(n) ? B([], "") : B([{
		campo: t,
		mensaje: `Al email le falta la @ o el dominio. ${R}`
	}], `El email no tiene un formato válido. ${R}`) : B([{
		campo: t,
		mensaje: `Escribe tu email. ${R}`
	}], "Escribe tu email para continuar.");
}
function W({ password: e = "" }) {
	return e ? B([], "") : B([{
		campo: "nueva-password",
		mensaje: "Elige una contraseña nueva."
	}], "Elige una contraseña nueva para continuar.");
}
// src/cuentas.js
var G = [
	{
		id: "u-demo",
		email: "demo@alumno.ucjc.edu",
		nombre: "Usuario demo",
		password: "demo",
		demo: !0
	},
	{
		id: "u-juanperez",
		email: "juan.perez@alumno.ucjc.edu",
		nombre: "Juan Pérez",
		password: "juan123",
		demo: !0
	},
	{
		id: "u-mariagarcia",
		email: "maria.garcia@alumno.ucjc.edu",
		nombre: "María García",
		password: "maria456",
		demo: !0
	}
], K = {
	email: G[0].email,
	password: G[0].password
}, q = (e) => (e || "").trim().toLowerCase(), J = ({ id: e, email: t, nombre: n }) => ({
	id: e,
	email: t,
	nombre: n
});
function Y(e) {
	let t = q(e);
	return G.some((e) => e.email === t);
}
function X(e, t) {
	let n = q(e), r = G.find((e) => e.email === n && e.password !== null && e.password === t);
	return r ? J(r) : null;
}
function Z({ email: e, nombre: t, password: n }) {
	let r = {
		id: `u-${G.length + 1}`,
		email: q(e),
		nombre: t.trim(),
		password: n ?? null
	};
	return G.push(r), J(r);
}
var ne = () => G.filter((e) => e.demo).map(J);
function re(e) {
	return q(e).split("@")[0].replace(/[._+-]+/g, " ").trim().replace(/(^|\s)(\S)/g, (e, t, n) => t + n.toUpperCase()) || "Usuario";
}
function ie(e) {
	let t = q(e), n = G.find((e) => e.email === t);
	return n ? {
		cuenta: J(n),
		nueva: !1
	} : {
		cuenta: Z({
			email: t,
			nombre: re(t),
			password: null
		}),
		nueva: !0
	};
}
function ae(e, t) {
	let n = G.find((t) => t.email === q(e));
	return n ? (n.password = t, !0) : !1;
}
// src/foco.js
var oe = (e, t) => e.querySelector(`[data-f="${t}"]`)?.focus(), se = (e) => e.querySelector("h2")?.focus(), Q = (e, t) => e.querySelector(t)?.focus(), ce = "ucjc:identidad:sesion-cambiada@1";
function $(e) {
	let t = {
		autenticado: !!e,
		usuario: e ? {
			id: e.id,
			email: e.email,
			nombre: e.nombre
		} : null,
		momento: (/* @__PURE__ */ new Date()).toISOString()
	};
	window.dispatchEvent(new CustomEvent(ce, { detail: t }));
}
// src/ucjc-identidad.js
var le = class e extends HTMLElement {
	#e = null;
	#t = "login";
	#n = "";
	#r = {};
	#i = {
		email: "",
		nombre: ""
	};
	#a = "login";
	#o = "";
	#s = "";
	#c = "";
	#l = null;
	connectedCallback() {
		window.ucjcCampus?.version !== "1" && console.warn("[identidad] sin campus: uso los valores de reserva y window.dispatchEvent"), this.shadowRoot || (this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = "<style>\n:host{--blanco:var(--ucjc-panel,#fff);--tinta:var(--ucjc-ink,#0b1f45);--gris:var(--ucjc-muted,#6d7587);--marino:var(--ucjc-brand,#0b2a5c);\n--fondo:var(--ucjc-brand-bright,#1262d4);--fondo-osc:var(--ucjc-brand,#0d57c4);--borde-campo:var(--ucjc-mist,#d6dee9);\n--rojo:var(--ucjc-warn,#c5221f);--rojo-fondo:var(--ucjc-warn,#961628);--tinte:var(--ucjc-brand,#03123a);--sombra:var(--ucjc-ink,#021650);\n--foco:color-mix(in srgb,var(--fondo) 30%,var(--blanco));--halo:color-mix(in srgb,var(--foco) 38%,transparent);\n--rojo-claro:color-mix(in srgb,var(--rojo) 40%,var(--blanco));--rojo-claro2:color-mix(in srgb,var(--rojo) 25%,var(--blanco));\n--ok:color-mix(in srgb,var(--ucjc-leaf,#2e9e6a) 55%,var(--blanco));\n--radio:var(--ucjc-radius,6px);--fuente:var(--ucjc-font-sans,system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif);--titulo:var(--ucjc-font-display,var(--fuente));\n--muelle:cubic-bezier(.34,1.56,.64,1);--suave:var(--ucjc-ease,cubic-bezier(.2,.8,.2,1));--alto:2.75rem;--esp:var(--ucjc-space,.75rem);--esp-lg:var(--ucjc-space-lg,1.25rem);\ndisplay:block;font:15px/1.5 var(--fuente);color:var(--blanco)}\n*{box-sizing:border-box}\nbutton{font:inherit;color:inherit;cursor:pointer;scroll-margin-block:6rem}\n\n.escena{position:relative;isolation:isolate;overflow:hidden;border-radius:20px;display:grid;grid-template-columns:minmax(0,1fr);\njustify-items:center;align-items:center;padding:var(--esp-lg) .6rem;container:escena/inline-size;\nbackground:radial-gradient(60% 70% at 50% 45%,var(--fondo) 0%,transparent 75%),linear-gradient(180deg,var(--fondo) 0%,var(--fondo-osc) 100%)}\n@container escena (max-width:36rem){.escena .contenedor{min-height:49.5rem}}\n\n.contenedor{container:pieza/inline-size;width:100%;max-width:29rem;min-height:47rem;display:grid;align-items:center}\n#raiz{position:relative}\n.tarjeta{width:100%;padding:2.4rem 1.5rem 2rem;border-radius:24px;\nbackground:linear-gradient(180deg,color-mix(in srgb,var(--blanco) 10%,transparent),color-mix(in srgb,var(--blanco) 7%,transparent));\n-webkit-backdrop-filter:blur(12px) saturate(115%);backdrop-filter:blur(12px) saturate(115%);\nborder:1px solid color-mix(in srgb,var(--blanco) 32%,transparent);\nbox-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 22%,transparent),inset 0 0 2.5rem color-mix(in srgb,var(--blanco) 5%,transparent),0 24px 48px -28px color-mix(in srgb,var(--sombra) 45%,transparent)}\n@container pieza (min-width:24rem){.tarjeta{padding-inline:min(19.5cqi,5.6rem)}}\n@container pieza (max-width:23.99rem){.tarjeta{padding:1.8rem 1.15rem 1.5rem}.logo{margin-bottom:1.4rem;font-size:1.3rem;gap:.5rem}\n.marca{width:2rem;height:2rem}h2{font-size:1.5rem}.btn-sec{font-size:.93rem}.provs{gap:var(--esp)}}\n\n.logo{display:flex;align-items:center;justify-content:center;gap:.6rem;margin:0 0 1.7rem;font-family:var(--titulo);font-size:1.55rem;font-weight:700;letter-spacing:-.015em;line-height:1.2}\n.marca{flex:none;display:grid;place-items:center;width:2.3rem;height:2.3rem;border-radius:11px;\nbackground:color-mix(in srgb,var(--blanco) 14%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 35%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 30%,transparent)}\n.marca svg{width:1.2rem;height:1.2rem;overflow:visible}\n.arco-abierto,.marca.abierto .arco{display:none}\n.marca.abierto .arco-abierto{display:inline}\nh2{margin:0 0 1.35rem;font-family:var(--titulo);font-size:1.75rem;line-height:1.2;font-weight:700;letter-spacing:-.015em;scroll-margin-block:6rem}\nh2:focus{outline:none}\n\nlabel{display:block;margin:1.3rem 0 .5rem;font-size:.95rem;line-height:1.2}\n:is(h2,.estado,.aviso,.error)+label{margin-top:0}\ninput{width:100%;height:var(--alto);padding:0 1rem;font:inherit;font-size:max(16px,1rem);color:var(--tinta);background:var(--blanco);\nborder:1px solid var(--borde-campo);border-radius:var(--radio);box-shadow:0 1px 2px color-mix(in srgb,var(--sombra) 8%,transparent);scroll-margin-block:6rem;\ntransition:box-shadow .2s,border-color .2s}\ninput::placeholder{color:var(--gris);font-size:.9rem}\ninput:hover{border-color:color-mix(in srgb,var(--borde-campo) 70%,var(--fondo))}\ninput:focus{outline:2px solid var(--foco);outline-offset:2px;border-color:color-mix(in srgb,var(--fondo) 50%,var(--blanco));box-shadow:0 0 0 6px var(--halo),0 0 22px 2px color-mix(in srgb,var(--foco) 45%,transparent)}\ninput[aria-invalid=\"true\"]{border:2px solid var(--rojo);box-shadow:0 0 0 4px color-mix(in srgb,var(--rojo-claro) 22%,transparent)}\n.clave{position:relative}\n.clave input{padding-right:2.9rem}\n.ojo{position:absolute;right:0;top:0;width:var(--alto);height:var(--alto);display:grid;place-items:center;padding:0;border:0;\nborder-radius:0 5px 5px 0;background:none;color:var(--gris)}\n.ojo:hover{color:var(--tinta);background:color-mix(in srgb,var(--fondo) 8%,var(--blanco))}\n.ojo:active{background:color-mix(in srgb,var(--fondo) 15%,var(--blanco))}\n.ojo:focus-visible{outline:2px solid var(--fondo);outline-offset:-4px}\n.ojo svg{width:1.05rem;height:1.05rem}\n.ojo .tapado,.ojo[aria-pressed=\"true\"] .visto{display:none}\n.ojo[aria-pressed=\"true\"] .tapado{display:inline}\n\n.ayuda{display:flex;gap:.45rem;align-items:flex-start;margin:.45rem 0 0;font-size:.85rem;font-weight:600}\n.ayuda svg{flex:none;width:1rem;height:1rem;margin-top:.12rem;color:var(--rojo-claro2)}\n.error{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.65rem .85rem;border-radius:10px;\nbackground:var(--rojo-fondo);border:1px solid color-mix(in srgb,var(--rojo-claro2) 75%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 12%,transparent);font-size:.88rem}\n.error svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.1rem;color:var(--rojo-claro2)}\n.aviso{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.6rem .8rem;border-radius:6px;\nbackground:color-mix(in srgb,var(--tinte) 28%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 28%,transparent);font-size:.88rem}\n.aviso svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.12rem;color:var(--foco)}\n.texto{margin:0 0 1.4rem;font-size:.95rem;overflow-wrap:anywhere}\n\n.enlace{position:relative;padding:0;border:0;font-size:.95rem;\nbackground:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .3s var(--suave),opacity .15s}\n.enlace::after{content:\"\";position:absolute;inset:-.7rem -.25rem}\n.enlace:hover,.enlace:focus-visible{background-size:100% 1px}\n.enlace:active{opacity:.75}\n.olvide{margin:.8rem 0 1.9rem}\n.acciones{display:grid;gap:var(--esp);margin-top:1.9rem}\n.olvide+.acciones{margin-top:0}\n\n.btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:2.9rem;padding:.55rem 1rem;line-height:1.25;border:0;border-radius:var(--radio);\nfont-size:1.08rem;font-weight:600;color:var(--blanco);background:var(--marino);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 8%,transparent);\ntransition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}\n.flecha{flex:none;width:0;height:1.05rem;margin-left:0;opacity:0;transform:translateX(-.4rem);\ntransition:width .3s var(--muelle),margin-left .3s var(--muelle),opacity .2s,transform .35s var(--muelle)}\n.btn:hover{background:color-mix(in srgb,var(--marino) 85%,var(--blanco));transform:translateY(-2px);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 10%,transparent),0 14px 22px -14px color-mix(in srgb,var(--sombra) 90%,transparent)}\n.btn:hover .flecha,.btn:focus-visible .flecha{width:1.05rem;margin-left:.5rem;opacity:1;transform:none}\n.btn:active{background:color-mix(in srgb,var(--marino) 75%,var(--tinta));transform:translateY(0) scale(.98);box-shadow:inset 0 2px 4px color-mix(in srgb,var(--sombra) 25%,transparent);transition-duration:.08s}\n.btn:active .flecha{transform:translateX(.2rem)}\n.btn-sec{min-height:var(--alto);padding:.45rem .8rem;line-height:1.25;border-radius:var(--radio);font-weight:600;background:color-mix(in srgb,var(--tinte) 22%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);\ntransition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}\n.btn-sec:hover{background:color-mix(in srgb,var(--tinte) 34%,transparent);transform:translateY(-2px);box-shadow:0 12px 20px -14px color-mix(in srgb,var(--sombra) 85%,transparent)}\n.btn-sec:active{transform:translateY(0) scale(.98);background:color-mix(in srgb,var(--tinte) 42%,transparent);transition-duration:.08s}\n.separa{margin:1rem 0 .3rem;text-align:center;font-size:.95rem}\n.provs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.35rem}\n.prov{display:grid;place-items:center;height:var(--alto);padding:0;border:1px solid var(--borde-campo);border-radius:var(--radio);background:var(--blanco);color:var(--tinta);\nbox-shadow:0 1px 2px color-mix(in srgb,var(--sombra) 8%,transparent);transition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}\n.prov svg{width:1.2rem;height:1.2rem;transition:transform .4s var(--muelle)}\n.prov:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--borde-campo) 70%,var(--fondo));box-shadow:0 14px 22px -12px color-mix(in srgb,var(--sombra) 65%,transparent)}\n.prov:hover svg{transform:scale(1.18) rotate(-8deg)}\n.prov:active{transform:translateY(0) scale(.95);background:color-mix(in srgb,var(--fondo) 8%,var(--blanco));box-shadow:none;transition-duration:.08s}\n.pie{margin:1.75rem 0 0;text-align:center;font-size:.8rem}\n.pie .enlace{font-size:.8rem;font-weight:700}\n:is(.btn,.btn-sec,.prov,.cuenta,.danger,.enlace):focus-visible{outline:2px solid var(--foco);outline-offset:3px;box-shadow:0 0 0 6px var(--halo)}\n\n.cuentas{list-style:none;margin:0;padding:0;display:grid;gap:.6rem}\n.cuenta{display:flex;align-items:center;gap:.8rem;width:100%;min-height:3.6rem;padding:.55rem .85rem;text-align:left;color:var(--blanco);\nborder:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);border-radius:10px;background:color-mix(in srgb,var(--tinte) 20%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 14%,transparent);\ntransition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}\n.cuenta:hover{transform:translateY(-2px);border-color:var(--blanco);background:color-mix(in srgb,var(--tinte) 32%,transparent);box-shadow:0 12px 20px -12px color-mix(in srgb,var(--sombra) 70%,transparent)}\n.cuenta:active{transform:scale(.98);transition-duration:.08s}\n.av{flex:none;width:2.3rem;height:2.3rem;border-radius:50%;display:grid;place-items:center;color:var(--blanco);font-size:.85rem;font-weight:700;\nbackground:linear-gradient(135deg,color-mix(in srgb,var(--fondo) 80%,var(--blanco)),var(--marino));box-shadow:0 0 0 2px color-mix(in srgb,var(--blanco) 35%,transparent)}\n.cuenta[data-a=\"otra\"] .av{background:color-mix(in srgb,var(--blanco) 16%,transparent);font-size:1.25rem;font-weight:400}\n.cuenta .txt{min-width:0;display:grid}\n.cuenta .nombre{font-weight:650}\n.cuenta .correo{font-size:.82rem;overflow-wrap:anywhere}\n\n.estado{display:inline-flex;align-items:center;gap:.45rem;margin:0;padding:.2rem .75rem;border-radius:999px;font-size:.8rem;\nfont-weight:650;background:color-mix(in srgb,var(--tinte) 32%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 30%,transparent)}\n.estado::before{content:\"\";width:.5rem;height:.5rem;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--ok) 25%,transparent)}\n.perfil{display:grid;justify-items:center;text-align:center;margin:0 0 .9rem;padding:1.5rem 1rem 1.25rem;border-radius:14px;\nbackground:color-mix(in srgb,var(--tinte) 24%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 25%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 12%,transparent)}\n.avatar{position:relative;display:grid;place-items:center;width:4.5rem;height:4.5rem;border-radius:50%;font-weight:700;font-size:1.45rem;letter-spacing:.02em;\nbackground:linear-gradient(135deg,color-mix(in srgb,var(--fondo) 80%,var(--blanco)),var(--marino));box-shadow:0 0 0 3px color-mix(in srgb,var(--blanco) 40%,transparent),0 0 0 8px color-mix(in srgb,var(--blanco) 8%,transparent),0 14px 26px -12px color-mix(in srgb,var(--sombra) 90%,transparent)}\n.avatar::after{content:\"\";position:absolute;right:.15rem;bottom:.15rem;width:.9rem;height:.9rem;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--fondo) 85%,var(--tinta))}\n.perfil .nombre{margin:1rem 0 .55rem;font-size:1.35rem;font-weight:700;letter-spacing:-.01em;line-height:1.2;overflow-wrap:anywhere}\n.datos{margin:0 0 1.6rem;padding:0 .9rem;border-radius:14px;background:color-mix(in srgb,var(--tinte) 24%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 25%,transparent)}\n.fila{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:.25rem 1rem;padding:.75rem 0}\n.fila+.fila{border-top:1px solid color-mix(in srgb,var(--blanco) 16%,transparent)}\n.datos dt{display:flex;align-items:center;gap:.5rem;font-size:.82rem}\n.datos dt svg{flex:none;width:1.05rem;height:1.05rem;color:var(--foco)}\n.datos dd{margin:0;min-width:0;text-align:right;font-weight:600;font-size:.9rem;overflow-wrap:anywhere}\ncode{display:inline-block;padding:.05rem .45rem;border-radius:5px;background:color-mix(in srgb,var(--blanco) 16%,transparent);font-family:inherit;font-size:.8rem;line-height:1.6}\n.danger{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;width:100%;min-height:var(--alto);border-radius:var(--radio);font-weight:600;color:var(--blanco);\nbackground:color-mix(in srgb,var(--tinte) 22%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);transition:transform .35s var(--muelle),box-shadow .3s,background-color .25s,border-color .25s}\n.danger:hover{background:var(--rojo-fondo);border-color:var(--rojo-claro2);transform:translateY(-2px);box-shadow:0 12px 20px -14px color-mix(in srgb,var(--sombra) 80%,transparent)}\n.danger:active{transform:scale(.98);background:color-mix(in srgb,var(--rojo-fondo) 80%,var(--sombra));transition-duration:.08s}\n.danger svg{width:1rem;height:1rem}\n@container pieza (max-width:23.99rem){.fila{grid-template-columns:1fr}.datos dd{text-align:left}}\n\n.tarjeta:has(.error){padding-top:1.6rem;padding-bottom:1.35rem}\n.tarjeta:has(.error) .logo{margin-bottom:.9rem}\n.tarjeta:has(.error) h2{margin-bottom:.8rem}\n.tarjeta:has(.error) .error{margin-bottom:.7rem;padding:.5rem .75rem}\n.tarjeta:has(.error) label{margin:.75rem 0 .35rem}\n.tarjeta:has(.error) :is(h2,.estado,.aviso,.error)+label{margin-top:0}\n.tarjeta:has(.error) .ayuda{margin-top:.3rem;font-size:.8rem}\n.tarjeta:has(.error) .olvide{margin:.4rem 0 .9rem}\n.tarjeta:has(.error) .acciones{gap:.55rem;margin-top:1rem}\n.tarjeta:has(.error) .olvide+.acciones{margin-top:0}\n.tarjeta:has(.error) .separa{margin:.5rem 0 .1rem}\n.tarjeta:has(.error) .pie{margin-top:.9rem}\n@keyframes entra{from{opacity:0;transform:translateY(.75rem) scale(.985)}}\n@keyframes sube{from{opacity:0;transform:translateY(.45rem);filter:blur(3px)}}\n@keyframes avatar{from{opacity:0;transform:scale(.6)}}\n@keyframes aparece{from{opacity:0;transform:translateY(-.35rem)}}\n@keyframes alerta{from{box-shadow:0 0 0 0 color-mix(in srgb,var(--rojo-claro) 70%,transparent)}to{box-shadow:0 0 0 9px color-mix(in srgb,var(--rojo-claro) 0%,transparent)}}\n@keyframes abrir{0%{transform:translateY(3px)}55%{transform:translateY(-1.2px)}100%{transform:none}}\n@keyframes cerrar{0%{transform:translateY(-3px)}70%{transform:translateY(.6px)}100%{transform:none}}\n@keyframes latido{50%{transform:scale(1.1)}}\n@media (prefers-reduced-motion:no-preference){\n#raiz[data-anim=\"inicio\"] .tarjeta{animation:entra .5s var(--suave) both}\n#raiz[data-anim=\"sesion\"] .tarjeta>*{animation:sube .48s var(--suave) .05s both}\n#raiz[data-anim=\"sesion\"] .avatar{animation:avatar .5s var(--muelle) .2s both}\n.tarjeta[data-candado=\"abre\"] .arco-abierto{animation:abrir .6s var(--muelle) .08s both}\n.tarjeta[data-candado=\"cierra\"] .arco{animation:cerrar .5s var(--muelle) .08s both}\n.tarjeta[data-candado] .marca{animation:latido .5s var(--suave)}\n.tarjeta>:nth-child(2){animation-delay:.07s}.tarjeta>:nth-child(3){animation-delay:.09s}.tarjeta>:nth-child(4){animation-delay:.11s}\n.tarjeta>:nth-child(5){animation-delay:.13s}.tarjeta>:nth-child(6){animation-delay:.15s}.tarjeta>:nth-child(7){animation-delay:.17s}\n.tarjeta>:nth-child(n+8){animation-delay:.19s}\n#raiz .tarjeta>.igual{animation:none}\n.error,.ayuda{animation:aparece .3s var(--suave) both}\ninput[aria-invalid=\"true\"]{animation:alerta .7s ease-out 1}}\n@media (prefers-reduced-motion:reduce){:host :is(*,*::before,*::after){transition:none;animation:none}\n:host :is(.btn,.btn-sec,.prov,.cuenta,.danger,.enlace,.ojo):is(:hover,:active),:host .prov:hover svg,:host .btn:active .flecha{transform:none}}\n@media (forced-colors:active){.tarjeta,.estado,.aviso,.perfil{border:1px solid CanvasText}:focus-visible{outline-color:Highlight}}\n.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}\n</style><div class=\"sr\" id=\"vivo\" role=\"status\"></div>\n        <div class=\"escena\"><div class=\"contenedor\"><div id=\"raiz\"></div></div></div>", this.shadowRoot.addEventListener("keydown", (e) => {
			e.key === "Escape" && [
				"selector",
				"otra",
				"olvide",
				"enlace",
				"nueva"
			].includes(this.#t) && (e.stopPropagation(), this.#_());
		})), this.#f(null, "inicio"), $(this.#e);
	}
	static #u = {
		login: 0,
		registro: 1,
		selector: 1,
		olvide: 1,
		otra: 2,
		enlace: 2,
		nueva: 3
	};
	#d(t, n) {
		let r = e.#u;
		return r[n] >= r[t] ? "adelante" : "atras";
	}
	#f(e = null, t = "") {
		let n = this.shadowRoot.getElementById("raiz");
		n.dataset.anim = t;
		let r = n.querySelector(".tarjeta"), i = r ? r.getBoundingClientRect().height : 0, o = new Set(r ? [...r.children].map((e) => (e.classList.remove("igual"), e.outerHTML)) : []), s = {
			valores: this.#i,
			errores: this.#r,
			resumen: this.#n
		}, c = this.#c;
		if (this.#c = "", this.#e) n.innerHTML = F(this.#e, this.#l ?? /* @__PURE__ */ new Date());
		else {
			let e = a(this.#o);
			n.innerHTML = {
				login: () => k({
					...s,
					exito: c
				}),
				registro: () => A(s),
				selector: () => j({
					proveedor: e,
					cuentas: ne()
				}),
				otra: () => M({
					...s,
					proveedor: e
				}),
				olvide: () => N(s),
				enlace: () => ee({ email: this.#s }),
				nueva: () => te(s)
			}[this.#t]();
		}
		if (this.#m(n), this.#p(n.querySelector(".tarjeta"), {
			antes: o,
			altoAntes: i,
			anim: t
		}), e === "titulo") se(this.shadowRoot);
		else if (e === "error") {
			let e = Object.keys(this.#r)[0];
			e && oe(this.shadowRoot, e);
		} else e?.sel && Q(this.shadowRoot, e.sel);
	}
	#p(e, { antes: t, altoAntes: n, anim: r }) {
		if (!e) return;
		let i = (e) => e.replace(/ abierto/g, ""), a = new Set([...t].map(i));
		for (let n of e.children) t.has(n.outerHTML) ? n.classList.add("igual") : n.classList.contains("logo") && a.has(i(n.outerHTML)) && (n.classList.add("igual"), e.dataset.candado = n.querySelector(".abierto") ? "abre" : "cierra");
		if (!window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !n || r === "inicio" || typeof e.animate != "function") return;
		let o = e.getBoundingClientRect().height;
		if (Math.abs(o - n) >= 2) {
			e.style.overflow = "hidden";
			let t = e.animate([{ height: `${n}px` }, { height: `${o}px` }], {
				duration: 460,
				easing: "cubic-bezier(.2,.8,.2,1)"
			});
			t.onfinish = t.oncancel = () => e.style.overflow = "";
		}
	}
	#m(e) {
		let t = (t, n) => e.querySelectorAll(`[data-a="${t}"]`).forEach((e) => e.onclick = () => n(e)), n = e.querySelector("form"), r = {
			login: () => this.#x(),
			registro: () => this.#S(),
			otra: () => this.#O(),
			olvide: () => this.#A(),
			nueva: () => this.#j()
		}[this.#t];
		n && r && (n.onsubmit = (e) => {
			e.preventDefault(), r();
		}), t("demo", () => this.#C(X(K.email, K.password))), t("ir-registro", () => this.#T("registro")), t("ir-login", () => this.#T("login")), t("out", () => this.#w()), t("ver", (t) => this.#v(e, t)), t("prov", (e) => this.#E(e.dataset.p)), t("cuenta", (e) => this.#D(e.dataset.email)), t("otra", () => this.#h("otra", "titulo")), t("olvide", () => this.#k()), t("abrir-enlace", () => this.#h("nueva", "titulo")), t("cancelar", () => this.#_()), t("volver-cuentas", () => this.#_());
	}
	#h(e, t) {
		let n = this.#d(this.#t, e);
		this.#t = e, this.#b(), this.#f(t, n);
	}
	#g() {
		let e = this.shadowRoot;
		if (this.#t === "login") this.#i.email = I(e, ["email"]).email.trim();
		else if (this.#t === "registro") {
			let t = I(e, ["reg-email", "reg-nombre"]);
			this.#i = {
				email: t["reg-email"].trim(),
				nombre: t["reg-nombre"].trim()
			};
		} else this.#t === "olvide" && (this.#i.email = I(e, ["rec-email"])["rec-email"].trim());
	}
	#_() {
		this.#t === "selector" ? (this.#t = this.#a, this.#b(), this.#f({ sel: `[data-a="prov"][data-p="${this.#o}"]` }, "atras")) : this.#t === "otra" ? this.#h("selector", { sel: "[data-a=\"otra\"]" }) : (this.#g(), this.#h("login", { sel: "[data-a=\"olvide\"]" }));
	}
	#v(e, t) {
		let n = e.querySelector(`[data-f="${t.dataset.para}"]`), r = n.type === "password";
		n.type = r ? "text" : "password", t.setAttribute("aria-pressed", String(r));
	}
	#y(e, t) {
		this.#r = Object.fromEntries(e.map((e) => [e.campo, e.mensaje])), this.#n = t, this.#f("error");
	}
	#b() {
		this.#r = {}, this.#n = "";
	}
	#x() {
		let e = this.shadowRoot, t = I(e, ["email", "password"]);
		this.#i.email = t.email.trim();
		let n = V(t);
		if (!n.ok) return this.#y(n.errores, n.resumen);
		let r = X(t.email, t.password);
		if (!r) return this.#y([{
			campo: "password",
			mensaje: null
		}], "Email o contraseña incorrectos. Revisa los dos campos o entra con la cuenta demo.");
		this.#C(r);
	}
	#S() {
		let e = I(this.shadowRoot, [
			"reg-email",
			"reg-nombre",
			"reg-password"
		]);
		this.#i = {
			email: e["reg-email"].trim(),
			nombre: e["reg-nombre"].trim()
		};
		let t = H({
			email: e["reg-email"],
			nombre: e["reg-nombre"],
			password: e["reg-password"]
		});
		if (!t.ok) return this.#y(t.errores, t.resumen);
		if (Y(e["reg-email"])) return this.#y([{
			campo: "reg-email",
			mensaje: "Usa otro email o vuelve a iniciar sesión con este."
		}], "Ese email ya está registrado. Inicia sesión o usa otro email.");
		let n = Z({
			email: e["reg-email"],
			nombre: e["reg-nombre"],
			password: e["reg-password"]
		});
		this.#C(n, "Cuenta creada. ");
	}
	#C(e, t = "", r = "") {
		this.#e = e, this.#l = /* @__PURE__ */ new Date(), this.#i = {
			email: "",
			nombre: ""
		}, this.#b(), this.#f("titulo", "sesion"), n(this.shadowRoot, `${t}Sesión iniciada${r} como ${e.nombre}.`), $(this.#e);
	}
	#w() {
		this.#e = null, this.#l = null, this.#t = "login", this.#b(), this.#f("titulo", "atras"), n(this.shadowRoot, "Sesión cerrada."), $(null);
	}
	#T(e) {
		this.#g(), this.#h(e, "titulo");
	}
	#E(e) {
		this.#g(), this.#a = this.#t, this.#o = e, this.#h("selector", "titulo");
	}
	#D(e) {
		let { cuenta: t, nueva: n } = ie(e);
		this.#C(t, n ? "Cuenta creada. " : "", ` con ${a(this.#o).nombre}`);
	}
	#O() {
		let e = I(this.shadowRoot, ["prov-email"]);
		this.#i.email = e["prov-email"].trim();
		let t = U({ email: e["prov-email"] }, "prov-email");
		if (!t.ok) return this.#y(t.errores, t.resumen);
		this.#D(e["prov-email"]);
	}
	#k() {
		this.#g(), this.#h("olvide", "titulo");
	}
	#A() {
		let e = I(this.shadowRoot, ["rec-email"]);
		this.#i.email = e["rec-email"].trim();
		let t = U({ email: e["rec-email"] }, "rec-email");
		if (!t.ok) return this.#y(t.errores, t.resumen);
		this.#s = this.#i.email, this.#h("enlace", "titulo");
	}
	#j() {
		let e = I(this.shadowRoot, ["nueva-password"]), t = W({ password: e["nueva-password"] });
		if (!t.ok) return this.#y(t.errores, t.resumen);
		ae(this.#s, e["nueva-password"]);
		let r = "Contraseña cambiada. Inicia sesión con la nueva.";
		this.#i.email = this.#s, this.#c = r, this.#h("login", "titulo"), n(this.shadowRoot, r);
	}
};
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", le);
// src/main.js
var ue = {
	nombre: "identidad",
	version: "0.2.9"
};
export { ue as default };
