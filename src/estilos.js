// ROL: estilos (parte visual del DOM vivo).
// Qué hace: define el CSS del Shadow DOM: fondo azul propio de la pieza con formas decorativas QUIETAS, tarjeta de
//   cristal (velo blanco fino + desenfoque) igual en todas las vistas, controles, estados (hover, pulsado, foco,
//   error) y transiciones entre vistas.
// Qué no hace: no carga fuentes, imágenes ni nada externo (todo es CSS); no cambia nada fuera de <ucjc-identidad>.
// Qué toca: nada en tiempo de ejecución; es una cadena que el componente inserta en su Shadow DOM.
//
// Los comentarios van aquí y no dentro de la cadena, para que no pesen en remote.js.
//
// Contraste (WCAG 2.2), medido en el PEOR píxel real con el navegador (texto oculto, fondo real detrás):
//   - Todo el texto de la tarjeta es blanco sobre el cristal azul: >= 4,5:1. Por eso el azul del fondo es «medio»
//     (#0d57c4-#1262d4) y no más claro, y las formas claras solo cruzan los MÁRGENES laterales de la tarjeta.
//   - Campos: blancos y opacos, >= 3:1 contra el fondo. Proveedores, cuentas, «Entrar con la cuenta demo» y
//     «Cerrar sesión» son de cristal: su BORDE blanco (78-85 %) da >= 3:1 contra el fondo que los rodea.
//   - Texto de ejemplo (placeholder) #6d7587 sobre blanco: 4,6:1. Aviso de error: cristal rojizo con texto blanco.
//   - Foco: anillo #b5dcff (3,2:1 sobre el cristal más claro) con halo azul; dentro del campo blanco, azul oscuro.
//   - El botón principal es marino (#0b2a5c): su texto blanco 14:1. Su silueta contra el cristal ronda 2,5:1;
//     WCAG no exige borde en un botón que se identifica por su texto.
// Objetivos táctiles: campos y botones de 44 px de alto; los enlaces amplían su zona de toque a 44 px sin moverse.
// Movimiento: con prefers-reduced-motion no se desplaza nada (solo cambian colores). Las formas no se mueven nunca.
// Al cambiar de vista el contenido cambia directamente (sin fundidos); solo al entrar en la cuenta sube el perfil.
// Posiciones de las formas: respecto al centro de la escena; la tarjeta mide 29 rem (±14,5) y el texto ±8,8 rem.
// El panel tiene la MISMA altura en todas las vistas, también con errores (al aparecer un error la tarjeta compacta sus
// espacios para caber): la página no cambia de largo y las formas, ancladas en rem, no se mueven. Solo la tarjeta se adapta.

export const css = `
:host{--foco:#b5dcff;--halo:rgba(120,190,255,.38);--marino:#0b2a5c;--tinta:#0b1f45;--gris:#6d7587;--borde-campo:#d6dee9;
--rojo:#c5221f;--muelle:cubic-bezier(.34,1.56,.64,1);--suave:cubic-bezier(.2,.8,.2,1);--alto:2.75rem;
display:block;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#fff}
*{box-sizing:border-box}
button{font:inherit;color:inherit;cursor:pointer;scroll-margin-block:6rem}

.escena{position:relative;isolation:isolate;overflow:hidden;border-radius:20px;display:grid;grid-template-columns:minmax(0,1fr);
justify-items:center;align-items:center;padding:1.25rem .6rem;container:escena/inline-size;
background:radial-gradient(60% 70% at 50% 45%,#1262d4 0%,transparent 75%),linear-gradient(180deg,#0f5ccd 0%,#0d57c4 100%)}
.formas{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.fm{position:absolute;display:block}
.capsula{border-radius:999px}
.esfera{border-radius:50%}
.clara{background:linear-gradient(150deg,#b4dcff 0%,#66adff 38%,#2f7ae8 100%);
box-shadow:inset .45rem .55rem 1rem rgba(255,255,255,.55),inset -.7rem -.9rem 1.3rem rgba(12,62,170,.45),0 1.4rem 2.4rem -1.1rem rgba(2,22,80,.55)}
.osc{background:linear-gradient(150deg,#2363cf 0%,#134dbb 45%,#0a3896 100%);
box-shadow:inset .35rem .45rem .9rem rgba(255,255,255,.14),inset -.7rem -.9rem 1.3rem rgba(2,20,80,.5),0 1.4rem 2.4rem -1.1rem rgba(2,22,80,.55)}
.esfera.clara{background:radial-gradient(circle at 32% 28%,#eaf6ff 0%,#9acdff 18%,#4594f6 52%,#1c60d0 90%)}
.esfera.osc{background:radial-gradient(circle at 32% 28%,#4a8be8 0%,#1f5ecc 30%,#0f46b0 70%,#0a3690 100%)}
.f1{width:19rem;height:4.8rem;left:calc(50% + 4.5rem);top:7.2rem;transform:rotate(-58deg)}
.f2{width:16rem;height:4.4rem;left:calc(50% - 6rem);top:-1.8rem;transform:rotate(8deg)}
.f3{width:15rem;height:4.4rem;left:calc(50% - 26rem);top:31rem;transform:rotate(-26deg)}
.f4{width:10rem;height:3.4rem;left:calc(50% + 19rem);top:1.2rem;transform:rotate(32deg)}
.f5{width:12rem;height:3.6rem;left:calc(50% - 30rem);top:6.2rem;transform:rotate(-34deg)}
.f6{width:7rem;height:7rem;left:calc(50% - 18.5rem);top:2.5rem}
.f7{width:9.5rem;height:9.5rem;left:calc(50% + 10.5rem);top:32.8rem}
.f8{width:3.2rem;height:3.2rem;left:calc(50% + 21rem);top:28.2rem}
.f9{width:11rem;height:3.4rem;left:calc(50% - 28rem);top:38.5rem;transform:rotate(18deg)}
.f10{width:4.2rem;height:4.2rem;left:calc(50% + 17rem);top:39rem}
@container escena (max-width:36rem){
.escena .contenedor{min-height:49.5rem}
.f6{left:-4.2rem;top:-3rem;width:5.5rem;height:5.5rem}.f4,.f5,.f8,.f9,.f10{display:none}.f1{left:auto;right:-13.5rem;top:13.8rem}
.f3{left:-13.5rem;top:auto;bottom:-1.6rem}.f7{left:auto;right:-5rem;top:auto;bottom:-6.5rem}}

.contenedor{container:pieza/inline-size;width:100%;max-width:29rem;min-height:47rem;display:grid;align-items:center}
#raiz{position:relative}
.tarjeta{width:100%;padding:2.4rem 1.5rem 2rem;border-radius:24px;
background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.07));
-webkit-backdrop-filter:blur(12px) saturate(115%);backdrop-filter:blur(12px) saturate(115%);
border:1px solid rgba(255,255,255,.32);
box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 0 2.5rem rgba(255,255,255,.05),0 24px 48px -28px rgba(2,22,80,.45)}
@container pieza (min-width:24rem){.tarjeta{padding-inline:min(19.5cqi,5.6rem)}}
@container pieza (max-width:23.99rem){.tarjeta{padding:1.8rem 1.15rem 1.5rem}.logo{margin-bottom:1.4rem;font-size:1.3rem;gap:.5rem}
.marca{width:2rem;height:2rem}h2{font-size:1.5rem}.btn-sec{font-size:.93rem}.provs{gap:.75rem}}

.logo{display:flex;align-items:center;justify-content:center;gap:.6rem;margin:0 0 1.7rem;font-size:1.55rem;font-weight:700;letter-spacing:-.015em;line-height:1.2}
.marca{flex:none;display:grid;place-items:center;width:2.3rem;height:2.3rem;border-radius:11px;
background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.3)}
.marca svg{width:1.2rem;height:1.2rem;overflow:visible}
.arco-abierto,.marca.abierto .arco{display:none}
.marca.abierto .arco-abierto{display:inline}
h2{margin:0 0 1.35rem;font-size:1.75rem;line-height:1.2;font-weight:700;letter-spacing:-.015em;scroll-margin-block:6rem}
h2:focus{outline:none}

label{display:block;margin:1.3rem 0 .5rem;font-size:.95rem;line-height:1.2}
:is(h2,.estado,.aviso,.error)+label{margin-top:0}
input{width:100%;height:var(--alto);padding:0 1rem;font:inherit;font-size:max(16px,1rem);color:var(--tinta);background:#fff;
border:1px solid var(--borde-campo);border-radius:5px;box-shadow:0 1px 2px rgba(2,22,80,.08);scroll-margin-block:6rem;
transition:box-shadow .2s,border-color .2s}
input::placeholder{color:var(--gris);font-size:.9rem}
input:hover{border-color:#b9cde8}
input:focus{outline:2px solid var(--foco);outline-offset:2px;border-color:#7fb3ee;box-shadow:0 0 0 6px var(--halo),0 0 22px 2px rgba(120,190,255,.45)}
input[aria-invalid="true"]{border:2px solid var(--rojo);box-shadow:0 0 0 4px rgba(255,120,110,.22)}
.clave{position:relative}
.clave input{padding-right:2.9rem}
.ojo{position:absolute;right:0;top:0;width:var(--alto);height:var(--alto);display:grid;place-items:center;padding:0;border:0;
border-radius:0 5px 5px 0;background:none;color:var(--gris)}
.ojo:hover{color:var(--tinta);background:#eef3fb}
.ojo:active{background:#e1eaf8}
.ojo:focus-visible{outline:2px solid #1e5fd0;outline-offset:-4px}
.ojo svg{width:1.05rem;height:1.05rem}
.ojo .tapado,.ojo[aria-pressed="true"] .visto{display:none}
.ojo[aria-pressed="true"] .tapado{display:inline}

.ayuda{display:flex;gap:.45rem;align-items:flex-start;margin:.45rem 0 0;font-size:.85rem;font-weight:600}
.ayuda svg{flex:none;width:1rem;height:1rem;margin-top:.12rem;color:#ffd2cc}
.error{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.65rem .85rem;border-radius:10px;
background:rgba(150,22,40,.9);border:1px solid rgba(255,180,171,.75);box-shadow:inset 0 1px 0 rgba(255,255,255,.12);font-size:.88rem}
.error svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.1rem;color:#ffb4ab}
.aviso{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.6rem .8rem;border-radius:6px;
background:rgba(3,18,58,.28);border:1px solid rgba(255,255,255,.28);font-size:.88rem}
.aviso svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.12rem;color:var(--foco)}
.texto{margin:0 0 1.4rem;font-size:.95rem;overflow-wrap:anywhere}

.enlace{position:relative;padding:0;border:0;font-size:.95rem;
background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .3s var(--suave),opacity .15s}
.enlace::after{content:"";position:absolute;inset:-.7rem -.25rem}
.enlace:hover,.enlace:focus-visible{background-size:100% 1px}
.enlace:active{opacity:.75}
.olvide{margin:.8rem 0 1.9rem}
.acciones{display:grid;gap:.75rem;margin-top:1.9rem}
.olvide+.acciones{margin-top:0}

.btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:2.9rem;padding:.55rem 1rem;line-height:1.25;border:0;border-radius:6px;
font-size:1.08rem;font-weight:600;color:#fff;background:var(--marino);box-shadow:inset 0 1px 0 rgba(255,255,255,.08);
transition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}
.flecha{flex:none;width:0;height:1.05rem;margin-left:0;opacity:0;transform:translateX(-.4rem);
transition:width .3s var(--muelle),margin-left .3s var(--muelle),opacity .2s,transform .35s var(--muelle)}
.btn:hover{background:#0f3576;transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 14px 22px -14px rgba(2,14,48,.9)}
.btn:hover .flecha,.btn:focus-visible .flecha{width:1.05rem;margin-left:.5rem;opacity:1;transform:none}
.btn:active{background:#08214a;transform:translateY(0) scale(.98);box-shadow:inset 0 2px 4px rgba(0,0,0,.25);transition-duration:.08s}
.btn:active .flecha{transform:translateX(.2rem)}
.btn-sec{min-height:var(--alto);padding:.45rem .8rem;line-height:1.25;border-radius:6px;font-weight:600;background:rgba(3,18,58,.22);border:1px solid rgba(255,255,255,.85);
transition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}
.btn-sec:hover{background:rgba(3,18,58,.34);transform:translateY(-2px);box-shadow:0 12px 20px -14px rgba(2,14,48,.85)}
.btn-sec:active{transform:translateY(0) scale(.98);background:rgba(3,18,58,.42);transition-duration:.08s}
.separa{margin:1rem 0 .3rem;text-align:center;font-size:.95rem}
.provs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.35rem}
.prov{display:grid;place-items:center;height:var(--alto);padding:0;border:1px solid var(--borde-campo);border-radius:5px;background:#fff;color:var(--tinta);
box-shadow:0 1px 2px rgba(2,22,80,.08);transition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}
.prov svg{width:1.2rem;height:1.2rem;transition:transform .4s var(--muelle)}
.prov:hover{transform:translateY(-3px);border-color:#b9cde8;box-shadow:0 14px 22px -12px rgba(2,22,80,.65)}
.prov:hover svg{transform:scale(1.18) rotate(-8deg)}
.prov:active{transform:translateY(0) scale(.95);background:#eef3fb;box-shadow:none;transition-duration:.08s}
.pie{margin:1.75rem 0 0;text-align:center;font-size:.8rem}
.pie .enlace{font-size:.8rem;font-weight:700}
:is(.btn,.btn-sec,.prov,.cuenta,.danger,.enlace):focus-visible{outline:2px solid var(--foco);outline-offset:3px;box-shadow:0 0 0 6px var(--halo)}

.cuentas{list-style:none;margin:0;padding:0;display:grid;gap:.6rem}
.cuenta{display:flex;align-items:center;gap:.8rem;width:100%;min-height:3.6rem;padding:.55rem .85rem;text-align:left;color:#fff;
border:1px solid rgba(255,255,255,.85);border-radius:10px;background:rgba(3,18,58,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.14);
transition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}
.cuenta:hover{transform:translateY(-2px);border-color:#fff;background:rgba(3,18,58,.32);box-shadow:0 12px 20px -12px rgba(2,22,80,.7)}
.cuenta:active{transform:scale(.98);transition-duration:.08s}
.av{flex:none;width:2.3rem;height:2.3rem;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:.85rem;font-weight:700;
background:linear-gradient(135deg,#2f6fe0,var(--marino));box-shadow:0 0 0 2px rgba(255,255,255,.35)}
.cuenta[data-a="otra"] .av{background:rgba(255,255,255,.16);font-size:1.25rem;font-weight:400}
.cuenta .txt{min-width:0;display:grid}
.cuenta .nombre{font-weight:650}
.cuenta .correo{font-size:.82rem;overflow-wrap:anywhere}

.estado{display:inline-flex;align-items:center;gap:.45rem;margin:0;padding:.2rem .75rem;border-radius:999px;font-size:.8rem;
font-weight:650;background:rgba(3,18,58,.32);border:1px solid rgba(255,255,255,.3)}
.estado::before{content:"";width:.5rem;height:.5rem;border-radius:50%;background:#5ee0a0;box-shadow:0 0 0 3px rgba(94,224,160,.25)}
.perfil{display:grid;justify-items:center;text-align:center;margin:0 0 .9rem;padding:1.5rem 1rem 1.25rem;border-radius:14px;
background:rgba(3,18,58,.24);border:1px solid rgba(255,255,255,.25);box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}
.avatar{position:relative;display:grid;place-items:center;width:4.5rem;height:4.5rem;border-radius:50%;font-weight:700;font-size:1.45rem;letter-spacing:.02em;
background:linear-gradient(135deg,#2f6fe0,var(--marino));box-shadow:0 0 0 3px rgba(255,255,255,.4),0 0 0 8px rgba(255,255,255,.08),0 14px 26px -12px rgba(2,14,48,.9)}
.avatar::after{content:"";position:absolute;right:.15rem;bottom:.15rem;width:.9rem;height:.9rem;border-radius:50%;background:#5ee0a0;box-shadow:0 0 0 3px #1c4fae}
.perfil .nombre{margin:1rem 0 .55rem;font-size:1.35rem;font-weight:700;letter-spacing:-.01em;line-height:1.2;overflow-wrap:anywhere}
.datos{margin:0 0 1.6rem;padding:0 .9rem;border-radius:14px;background:rgba(3,18,58,.24);border:1px solid rgba(255,255,255,.25)}
.fila{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:.25rem 1rem;padding:.75rem 0}
.fila+.fila{border-top:1px solid rgba(255,255,255,.16)}
.datos dt{display:flex;align-items:center;gap:.5rem;font-size:.82rem}
.datos dt svg{flex:none;width:1.05rem;height:1.05rem;color:var(--foco)}
.datos dd{margin:0;min-width:0;text-align:right;font-weight:600;font-size:.9rem;overflow-wrap:anywhere}
code{display:inline-block;padding:.05rem .45rem;border-radius:5px;background:rgba(255,255,255,.16);font:.8rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace}
.danger{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;width:100%;min-height:var(--alto);border-radius:6px;font-weight:600;color:#fff;
background:rgba(3,18,58,.22);border:1px solid rgba(255,255,255,.85);transition:transform .35s var(--muelle),box-shadow .3s,background-color .25s,border-color .25s}
.danger:hover{background:rgba(165,24,44,.9);border-color:#ffb4ab;transform:translateY(-2px);box-shadow:0 12px 20px -14px rgba(60,0,10,.8)}
.danger:active{transform:scale(.98);background:rgba(130,16,32,.95);transition-duration:.08s}
.danger svg{width:1rem;height:1rem}
@container pieza (max-width:23.99rem){.fila{grid-template-columns:1fr}.datos dd{text-align:left}}

.tarjeta:has(.error){padding-top:1.6rem;padding-bottom:1.35rem}
.tarjeta:has(.error) .logo{margin-bottom:.9rem}
.tarjeta:has(.error) h2{margin-bottom:.8rem}
.tarjeta:has(.error) .error{margin-bottom:.7rem;padding:.5rem .75rem}
.tarjeta:has(.error) label{margin:.75rem 0 .35rem}
.tarjeta:has(.error) :is(h2,.estado,.aviso,.error)+label{margin-top:0}
.tarjeta:has(.error) .ayuda{margin-top:.3rem;font-size:.8rem}
.tarjeta:has(.error) .olvide{margin:.4rem 0 .9rem}
.tarjeta:has(.error) .acciones{gap:.55rem;margin-top:1rem}
.tarjeta:has(.error) .olvide+.acciones{margin-top:0}
.tarjeta:has(.error) .separa{margin:.5rem 0 .1rem}
.tarjeta:has(.error) .pie{margin-top:.9rem}
@keyframes entra{from{opacity:0;transform:translateY(.75rem) scale(.985)}}
@keyframes sube{from{opacity:0;transform:translateY(.45rem);filter:blur(3px)}}
@keyframes avatar{from{opacity:0;transform:scale(.6)}}
@keyframes aparece{from{opacity:0;transform:translateY(-.35rem)}}
@keyframes alerta{from{box-shadow:0 0 0 0 rgba(255,120,110,.7)}to{box-shadow:0 0 0 9px rgba(255,120,110,0)}}
@keyframes abrir{0%{transform:translateY(3px)}55%{transform:translateY(-1.2px)}100%{transform:none}}
@keyframes cerrar{0%{transform:translateY(-3px)}70%{transform:translateY(.6px)}100%{transform:none}}
@keyframes latido{50%{transform:scale(1.1)}}
@media (prefers-reduced-motion:no-preference){
#raiz[data-anim="inicio"] .tarjeta{animation:entra .5s var(--suave) both}
#raiz[data-anim="sesion"] .tarjeta>*{animation:sube .48s var(--suave) .05s both}
#raiz[data-anim="sesion"] .avatar{animation:avatar .5s var(--muelle) .2s both}
.tarjeta[data-candado="abre"] .arco-abierto{animation:abrir .6s var(--muelle) .08s both}
.tarjeta[data-candado="cierra"] .arco{animation:cerrar .5s var(--muelle) .08s both}
.tarjeta[data-candado] .marca{animation:latido .5s var(--suave)}
.tarjeta>:nth-child(2){animation-delay:.07s}.tarjeta>:nth-child(3){animation-delay:.09s}.tarjeta>:nth-child(4){animation-delay:.11s}
.tarjeta>:nth-child(5){animation-delay:.13s}.tarjeta>:nth-child(6){animation-delay:.15s}.tarjeta>:nth-child(7){animation-delay:.17s}
.tarjeta>:nth-child(n+8){animation-delay:.19s}
#raiz .tarjeta>.igual{animation:none}
.error,.ayuda{animation:aparece .3s var(--suave) both}
input[aria-invalid="true"]{animation:alerta .7s ease-out 1}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}
.btn:hover,.btn-sec:hover,.prov:hover,.prov:hover svg,.cuenta:hover,.danger:hover,:active{transform:none!important}}
@media (forced-colors:active){.tarjeta,.estado,.aviso,.perfil{border:1px solid CanvasText}:focus-visible{outline-color:Highlight}}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
`;
