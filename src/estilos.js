// ROL: estilos (parte visual del DOM vivo).
// Qué hace: define el CSS del Shadow DOM: fondo liso de la pieza (degradado con las variables de marca), tarjeta de
//   cristal (velo blanco fino + desenfoque) igual en todas las vistas, controles, estados (hover, pulsado, foco,
//   error) y transiciones entre vistas.
// Qué no hace: no carga fuentes, imágenes ni nada externo (todo es CSS); no cambia nada fuera de <ucjc-identidad>.
// Qué toca: nada en tiempo de ejecución; es una cadena que el componente inserta en su Shadow DOM.
//
// Contrato presentacion-campus@1 (shell): los colores, fuentes y radio salen de las variables --ucjc-* del shell, que llegan
//   al Shadow DOM por herencia. Cada una lleva un valor de reserva (el azul de siempre) para que la pieza se vea igual sola
//   (demo, tests, página propia). Las clases .ucjc-* del shell no entran en el Shadow DOM, así que no se usan.
//   Todo color escrito a mano vive SOLO como valor de reserva en :host; el resto de reglas usan esas variables.
//   Sin forzar prioridades: el modo de movimiento reducido gana por especificidad (prefijo :host).
//
// Los comentarios van aquí y no dentro de la cadena, para que no pesen en remote.js.
//
// Contraste (WCAG 2.2), medido en el PEOR píxel real con el navegador (texto oculto, fondo real detrás):
//   - Todo el texto de la tarjeta es blanco sobre el cristal azul: >= 4,5:1. Por eso el azul del fondo es «medio»
//     (#0d57c4-#1262d4) y no más claro.
//   - Campos: blancos y opacos, >= 3:1 contra el fondo. Proveedores, cuentas, «Entrar con la cuenta demo» y
//     «Cerrar sesión» son de cristal: su BORDE blanco (78-85 %) da >= 3:1 contra el fondo que los rodea.
//   - Texto de ejemplo (placeholder) #6d7587 sobre blanco: 4,6:1. Aviso de error: cristal rojizo con texto blanco.
//   - Foco: anillo #b5dcff (3,2:1 sobre el cristal más claro) con halo azul; dentro del campo blanco, azul oscuro.
//   - El botón principal es marino (#0b2a5c): su texto blanco 14:1. Su silueta contra el cristal ronda 2,5:1;
//     WCAG no exige borde en un botón que se identifica por su texto.
// Objetivos táctiles: campos y botones de 44 px de alto; los enlaces amplían su zona de toque a 44 px sin moverse.
// Movimiento: con prefers-reduced-motion no se desplaza nada (solo cambian colores).
// Al cambiar de vista el contenido cambia directamente (sin fundidos); solo al entrar en la cuenta sube el perfil.
// El panel tiene la MISMA altura en todas las vistas, también con errores (al aparecer un error la tarjeta compacta sus
// espacios para caber): la página no cambia de largo y nada se recoloca. Solo la tarjeta se adapta.

export const css = `
:host{--blanco:var(--ucjc-panel,#fff);--tinta:var(--ucjc-ink,#0b1f45);--gris:var(--ucjc-muted,#6d7587);--marino:var(--ucjc-brand,#0b2a5c);
--fondo:var(--ucjc-brand-bright,#1262d4);--fondo-osc:var(--ucjc-brand,#0d57c4);--borde-campo:var(--ucjc-mist,#d6dee9);
--rojo:var(--ucjc-warn,#c5221f);--rojo-fondo:var(--ucjc-warn,#961628);--tinte:var(--ucjc-brand,#03123a);--sombra:var(--ucjc-ink,#021650);
--foco:color-mix(in srgb,var(--fondo) 30%,var(--blanco));--halo:color-mix(in srgb,var(--foco) 38%,transparent);
--rojo-claro:color-mix(in srgb,var(--rojo) 40%,var(--blanco));--rojo-claro2:color-mix(in srgb,var(--rojo) 25%,var(--blanco));
--ok:color-mix(in srgb,var(--ucjc-leaf,#2e9e6a) 55%,var(--blanco));
--radio:var(--ucjc-radius,6px);--fuente:var(--ucjc-font-sans,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif);--titulo:var(--ucjc-font-display,var(--fuente));
--muelle:cubic-bezier(.34,1.56,.64,1);--suave:var(--ucjc-ease,cubic-bezier(.2,.8,.2,1));--alto:2.75rem;--esp:var(--ucjc-space,.75rem);--esp-lg:var(--ucjc-space-lg,1.25rem);
display:block;font:15px/1.5 var(--fuente);color:var(--blanco)}
*{box-sizing:border-box}
button{font:inherit;color:inherit;cursor:pointer;scroll-margin-block:6rem}

.escena{position:relative;isolation:isolate;overflow:hidden;border-radius:20px;display:grid;grid-template-columns:minmax(0,1fr);
justify-items:center;align-items:center;padding:var(--esp-lg) .6rem;container:escena/inline-size;
background:radial-gradient(60% 70% at 50% 45%,var(--fondo) 0%,transparent 75%),linear-gradient(180deg,var(--fondo) 0%,var(--fondo-osc) 100%)}
@container escena (max-width:36rem){.escena .contenedor{min-height:49.5rem}}

.contenedor{container:pieza/inline-size;width:100%;max-width:29rem;min-height:47rem;display:grid;align-items:center}
#raiz{position:relative}
.tarjeta{width:100%;padding:2.4rem 1.5rem 2rem;border-radius:24px;
background:linear-gradient(180deg,color-mix(in srgb,var(--blanco) 10%,transparent),color-mix(in srgb,var(--blanco) 7%,transparent));
-webkit-backdrop-filter:blur(12px) saturate(115%);backdrop-filter:blur(12px) saturate(115%);
border:1px solid color-mix(in srgb,var(--blanco) 32%,transparent);
box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 22%,transparent),inset 0 0 2.5rem color-mix(in srgb,var(--blanco) 5%,transparent),0 24px 48px -28px color-mix(in srgb,var(--sombra) 45%,transparent)}
@container pieza (min-width:24rem){.tarjeta{padding-inline:min(19.5cqi,5.6rem)}}
@container pieza (max-width:23.99rem){.tarjeta{padding:1.8rem 1.15rem 1.5rem}.logo{margin-bottom:1.4rem;font-size:1.3rem;gap:.5rem}
.marca{width:2rem;height:2rem}h2{font-size:1.5rem}.btn-sec{font-size:.93rem}.provs{gap:var(--esp)}}

.logo{display:flex;align-items:center;justify-content:center;gap:.6rem;margin:0 0 1.7rem;font-family:var(--titulo);font-size:1.55rem;font-weight:700;letter-spacing:-.015em;line-height:1.2}
.marca{flex:none;display:grid;place-items:center;width:2.3rem;height:2.3rem;border-radius:11px;
background:color-mix(in srgb,var(--blanco) 14%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 35%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 30%,transparent)}
.marca svg{width:1.2rem;height:1.2rem;overflow:visible}
.arco-abierto,.marca.abierto .arco{display:none}
.marca.abierto .arco-abierto{display:inline}
h2{margin:0 0 1.35rem;font-family:var(--titulo);font-size:1.75rem;line-height:1.2;font-weight:700;letter-spacing:-.015em;scroll-margin-block:6rem}
h2:focus{outline:none}

label{display:block;margin:1.3rem 0 .5rem;font-size:.95rem;line-height:1.2}
:is(h2,.estado,.aviso,.error)+label{margin-top:0}
input{width:100%;height:var(--alto);padding:0 1rem;font:inherit;font-size:max(16px,1rem);color:var(--tinta);background:var(--blanco);
border:1px solid var(--borde-campo);border-radius:var(--radio);box-shadow:0 1px 2px color-mix(in srgb,var(--sombra) 8%,transparent);scroll-margin-block:6rem;
transition:box-shadow .2s,border-color .2s}
input::placeholder{color:var(--gris);font-size:.9rem}
input:hover{border-color:color-mix(in srgb,var(--borde-campo) 70%,var(--fondo))}
input:focus{outline:2px solid var(--foco);outline-offset:2px;border-color:color-mix(in srgb,var(--fondo) 50%,var(--blanco));box-shadow:0 0 0 6px var(--halo),0 0 22px 2px color-mix(in srgb,var(--foco) 45%,transparent)}
input[aria-invalid="true"]{border:2px solid var(--rojo);box-shadow:0 0 0 4px color-mix(in srgb,var(--rojo-claro) 22%,transparent)}
.clave{position:relative}
.clave input{padding-right:2.9rem}
.ojo{position:absolute;right:0;top:0;width:var(--alto);height:var(--alto);display:grid;place-items:center;padding:0;border:0;
border-radius:0 5px 5px 0;background:none;color:var(--gris)}
.ojo:hover{color:var(--tinta);background:color-mix(in srgb,var(--fondo) 8%,var(--blanco))}
.ojo:active{background:color-mix(in srgb,var(--fondo) 15%,var(--blanco))}
.ojo:focus-visible{outline:2px solid var(--fondo);outline-offset:-4px}
.ojo svg{width:1.05rem;height:1.05rem}
.ojo .tapado,.ojo[aria-pressed="true"] .visto{display:none}
.ojo[aria-pressed="true"] .tapado{display:inline}

.ayuda{display:flex;gap:.45rem;align-items:flex-start;margin:.45rem 0 0;font-size:.85rem;font-weight:600}
.ayuda svg{flex:none;width:1rem;height:1rem;margin-top:.12rem;color:var(--rojo-claro2)}
.error{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.65rem .85rem;border-radius:10px;
background:var(--rojo-fondo);border:1px solid color-mix(in srgb,var(--rojo-claro2) 75%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 12%,transparent);font-size:.88rem}
.error svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.1rem;color:var(--rojo-claro2)}
.aviso{display:flex;gap:.55rem;align-items:flex-start;margin:0 0 1.1rem;padding:.6rem .8rem;border-radius:6px;
background:color-mix(in srgb,var(--tinte) 28%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 28%,transparent);font-size:.88rem}
.aviso svg{flex:none;width:1.05rem;height:1.05rem;margin-top:.12rem;color:var(--foco)}
.texto{margin:0 0 1.4rem;font-size:.95rem;overflow-wrap:anywhere}

.enlace{position:relative;padding:0;border:0;font-size:.95rem;
background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .3s var(--suave),opacity .15s}
.enlace::after{content:"";position:absolute;inset:-.7rem -.25rem}
.enlace:hover,.enlace:focus-visible{background-size:100% 1px}
.enlace:active{opacity:.75}
.olvide{margin:.8rem 0 1.9rem}
.acciones{display:grid;gap:var(--esp);margin-top:1.9rem}
.olvide+.acciones{margin-top:0}

.btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:2.9rem;padding:.55rem 1rem;line-height:1.25;border:0;border-radius:var(--radio);
font-size:1.08rem;font-weight:600;color:var(--blanco);background:var(--marino);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 8%,transparent);
transition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}
.flecha{flex:none;width:0;height:1.05rem;margin-left:0;opacity:0;transform:translateX(-.4rem);
transition:width .3s var(--muelle),margin-left .3s var(--muelle),opacity .2s,transform .35s var(--muelle)}
.btn:hover{background:color-mix(in srgb,var(--marino) 85%,var(--blanco));transform:translateY(-2px);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 10%,transparent),0 14px 22px -14px color-mix(in srgb,var(--sombra) 90%,transparent)}
.btn:hover .flecha,.btn:focus-visible .flecha{width:1.05rem;margin-left:.5rem;opacity:1;transform:none}
.btn:active{background:color-mix(in srgb,var(--marino) 75%,var(--tinta));transform:translateY(0) scale(.98);box-shadow:inset 0 2px 4px color-mix(in srgb,var(--sombra) 25%,transparent);transition-duration:.08s}
.btn:active .flecha{transform:translateX(.2rem)}
.btn-sec{min-height:var(--alto);padding:.45rem .8rem;line-height:1.25;border-radius:var(--radio);font-weight:600;background:color-mix(in srgb,var(--tinte) 22%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);
transition:background-color .25s,transform .35s var(--muelle),box-shadow .3s}
.btn-sec:hover{background:color-mix(in srgb,var(--tinte) 34%,transparent);transform:translateY(-2px);box-shadow:0 12px 20px -14px color-mix(in srgb,var(--sombra) 85%,transparent)}
.btn-sec:active{transform:translateY(0) scale(.98);background:color-mix(in srgb,var(--tinte) 42%,transparent);transition-duration:.08s}
.separa{margin:1rem 0 .3rem;text-align:center;font-size:.95rem}
.provs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.35rem}
.prov{display:grid;place-items:center;height:var(--alto);padding:0;border:1px solid var(--borde-campo);border-radius:var(--radio);background:var(--blanco);color:var(--tinta);
box-shadow:0 1px 2px color-mix(in srgb,var(--sombra) 8%,transparent);transition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}
.prov svg{width:1.2rem;height:1.2rem;transition:transform .4s var(--muelle)}
.prov:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--borde-campo) 70%,var(--fondo));box-shadow:0 14px 22px -12px color-mix(in srgb,var(--sombra) 65%,transparent)}
.prov:hover svg{transform:scale(1.18) rotate(-8deg)}
.prov:active{transform:translateY(0) scale(.95);background:color-mix(in srgb,var(--fondo) 8%,var(--blanco));box-shadow:none;transition-duration:.08s}
.pie{margin:1.75rem 0 0;text-align:center;font-size:.8rem}
.pie .enlace{font-size:.8rem;font-weight:700}
:is(.btn,.btn-sec,.prov,.cuenta,.danger,.enlace):focus-visible{outline:2px solid var(--foco);outline-offset:3px;box-shadow:0 0 0 6px var(--halo)}

.cuentas{list-style:none;margin:0;padding:0;display:grid;gap:.6rem}
.cuenta{display:flex;align-items:center;gap:.8rem;width:100%;min-height:3.6rem;padding:.55rem .85rem;text-align:left;color:var(--blanco);
border:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);border-radius:10px;background:color-mix(in srgb,var(--tinte) 20%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 14%,transparent);
transition:transform .35s var(--muelle),box-shadow .3s,border-color .25s,background-color .25s}
.cuenta:hover{transform:translateY(-2px);border-color:var(--blanco);background:color-mix(in srgb,var(--tinte) 32%,transparent);box-shadow:0 12px 20px -12px color-mix(in srgb,var(--sombra) 70%,transparent)}
.cuenta:active{transform:scale(.98);transition-duration:.08s}
.av{flex:none;width:2.3rem;height:2.3rem;border-radius:50%;display:grid;place-items:center;color:var(--blanco);font-size:.85rem;font-weight:700;
background:linear-gradient(135deg,color-mix(in srgb,var(--fondo) 80%,var(--blanco)),var(--marino));box-shadow:0 0 0 2px color-mix(in srgb,var(--blanco) 35%,transparent)}
.cuenta[data-a="otra"] .av{background:color-mix(in srgb,var(--blanco) 16%,transparent);font-size:1.25rem;font-weight:400}
.cuenta .txt{min-width:0;display:grid}
.cuenta .nombre{font-weight:650}
.cuenta .correo{font-size:.82rem;overflow-wrap:anywhere}

.estado{display:inline-flex;align-items:center;gap:.45rem;margin:0;padding:.2rem .75rem;border-radius:999px;font-size:.8rem;
font-weight:650;background:color-mix(in srgb,var(--tinte) 32%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 30%,transparent)}
.estado::before{content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--ok) 25%,transparent)}
.perfil{display:grid;justify-items:center;text-align:center;margin:0 0 .9rem;padding:1.5rem 1rem 1.25rem;border-radius:14px;
background:color-mix(in srgb,var(--tinte) 24%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 25%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--blanco) 12%,transparent)}
.avatar{position:relative;display:grid;place-items:center;width:4.5rem;height:4.5rem;border-radius:50%;font-weight:700;font-size:1.45rem;letter-spacing:.02em;
background:linear-gradient(135deg,color-mix(in srgb,var(--fondo) 80%,var(--blanco)),var(--marino));box-shadow:0 0 0 3px color-mix(in srgb,var(--blanco) 40%,transparent),0 0 0 8px color-mix(in srgb,var(--blanco) 8%,transparent),0 14px 26px -12px color-mix(in srgb,var(--sombra) 90%,transparent)}
.avatar::after{content:"";position:absolute;right:.15rem;bottom:.15rem;width:.9rem;height:.9rem;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--fondo) 85%,var(--tinta))}
.perfil .nombre{margin:1rem 0 .55rem;font-size:1.35rem;font-weight:700;letter-spacing:-.01em;line-height:1.2;overflow-wrap:anywhere}
.datos{margin:0 0 1.6rem;padding:0 .9rem;border-radius:14px;background:color-mix(in srgb,var(--tinte) 24%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 25%,transparent)}
.fila{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:.25rem 1rem;padding:.75rem 0}
.fila+.fila{border-top:1px solid color-mix(in srgb,var(--blanco) 16%,transparent)}
.datos dt{display:flex;align-items:center;gap:.5rem;font-size:.82rem}
.datos dt svg{flex:none;width:1.05rem;height:1.05rem;color:var(--foco)}
.datos dd{margin:0;min-width:0;text-align:right;font-weight:600;font-size:.9rem;overflow-wrap:anywhere}
code{display:inline-block;padding:.05rem .45rem;border-radius:5px;background:color-mix(in srgb,var(--blanco) 16%,transparent);font-family:inherit;font-size:.8rem;line-height:1.6}
.danger{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;width:100%;min-height:var(--alto);border-radius:var(--radio);font-weight:600;color:var(--blanco);
background:color-mix(in srgb,var(--tinte) 22%,transparent);border:1px solid color-mix(in srgb,var(--blanco) 85%,transparent);transition:transform .35s var(--muelle),box-shadow .3s,background-color .25s,border-color .25s}
.danger:hover{background:var(--rojo-fondo);border-color:var(--rojo-claro2);transform:translateY(-2px);box-shadow:0 12px 20px -14px color-mix(in srgb,var(--sombra) 80%,transparent)}
.danger:active{transform:scale(.98);background:color-mix(in srgb,var(--rojo-fondo) 80%,var(--sombra));transition-duration:.08s}
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
@keyframes alerta{from{box-shadow:0 0 0 0 color-mix(in srgb,var(--rojo-claro) 70%,transparent)}to{box-shadow:0 0 0 9px color-mix(in srgb,var(--rojo-claro) 0%,transparent)}}
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
@media (prefers-reduced-motion:reduce){:host :is(*,*::before,*::after){transition:none;animation:none}
:host :is(.btn,.btn-sec,.prov,.cuenta,.danger,.enlace,.ojo):is(:hover,:active),:host .prov:hover svg,:host .btn:active .flecha{transform:none}}
@media (forced-colors:active){.tarjeta,.estado,.aviso,.perfil{border:1px solid CanvasText}:focus-visible{outline-color:Highlight}}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
`;
