// ROL: estilos (parte visual del DOM vivo).
// Qué hace: define el CSS del Shadow DOM con variables, responsive y estados (hover, :focus-visible, error).
// Qué no hace: no depende de fuentes ni recursos externos; no cambia nada fuera de <ucjc-identidad>.
// Qué toca: nada en tiempo de ejecución; es una cadena que el componente inserta en su Shadow DOM.
//
// Contrastes calculados (WCAG 2.2): texto >= 4,5:1; borde de campos y anillo de foco >= 3:1 (1.4.11).
//   #5b6577/#fff 5,9 · #334155/#fff 10,3 · #0b6b3a/#e7f6ee 5,9 · #8a4b00/#fff3e0 6,2
//   #b3261e/#fff 6,5 · #7a1d0b/#fdecea 9,1 · borde campo #7b8699/#fbfcfe 3,6 · foco #1e3a8a/#fff 10,4
// Objetivos táctiles: botones, campos y enlaces de 44 px de alto (mínimo exigido: 24 px, criterio 2.5.8).

export const css = `
  :host {
    --marca: #1e3a8a; --marca-osc: #172e6e; --marca-suave: rgba(30,58,138,.16);
    --texto: #0f172a; --tenue: #5b6577; --borde: #dfe4ec; --borde-campo: #7b8699; --fondo-campo: #fbfcfe;
    --rojo: #b3261e; --rojo-suave: #fdecea; --rojo-borde: #f3c9c5;
    --alto: 2.75rem; /* 44 px: objetivo táctil cómodo */
    display:block; font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; color:var(--texto);
  }
  * { box-sizing:border-box; }
  .sr {
    position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden;
    clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap; border:0;
  }
  .box {
    width:100%; max-width:22rem; background:#fff; border:1px solid var(--borde); border-radius:16px; padding:1.25rem;
    box-shadow:0 1px 2px rgba(15,23,42,.04), 0 12px 28px -16px rgba(15,23,42,.28);
  }
  .cab { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
  .marca {
    flex:none; width:2.5rem; height:2.5rem; border-radius:12px; display:grid; place-items:center; color:#fff;
    background:linear-gradient(135deg, #2b4fb3, var(--marca-osc));
  }
  .marca svg { width:1.2rem; height:1.2rem; }
  /* Candado abierto con la sesión iniciada: el arco gira sobre su pata izquierda y sube. */
  .arco { transform-origin:8px 11px; }
  .marca.abierto .arco { transform:translateY(-1.5px) rotate(-30deg); }
  @media (prefers-reduced-motion: no-preference) {
    .marca.abierto .arco { animation:abrir .45s cubic-bezier(.3,1.4,.5,1); }
  }
  @keyframes abrir { from { transform:none; } }
  .ceja { margin:0; font-size:.72rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--tenue); }
  h2 { margin:0; font-size:1.12rem; line-height:1.3; font-weight:650; letter-spacing:-.01em; scroll-margin-block:6rem; }
  /* El título recibe el foco por código (no es un control): no necesita anillo. */
  h2:focus { outline:none; }
  .estado {
    display:inline-flex; align-items:center; gap:.4rem; margin:0 0 1rem; padding:.2rem .65rem; border-radius:999px;
    font-size:.8rem; font-weight:600;
  }
  .estado::before { content:""; width:.45rem; height:.45rem; border-radius:50%; background:currentColor; }
  .ok { background:#e7f6ee; color:#0b6b3a; }
  .ko { background:#fff3e0; color:#8a4b00; }
  label { display:block; margin:.85rem 0 .35rem; font-size:.82rem; font-weight:600; color:#334155; }
  input {
    width:100%; height:var(--alto); padding:0 .85rem; color:var(--texto);
    /* 16 px: por debajo, iOS amplía la página al enfocar el campo */
    font:inherit; font-size:max(16px, 1rem);
    background:var(--fondo-campo); border:1px solid var(--borde-campo); border-radius:10px;
    scroll-margin-block:6rem; /* la barra fija del shell no tapa el campo enfocado (2.4.11) */
    transition:border-color .15s, box-shadow .15s, background-color .15s;
  }
  input:hover { border-color:var(--tenue); }
  input:focus-visible { outline:3px solid var(--marca); outline-offset:1px; background:#fff; border-color:var(--marca); box-shadow:0 0 0 5px var(--marca-suave); }
  input[aria-invalid="true"] { border-color:var(--rojo); background:#fff; }
  input[aria-invalid="true"]:focus-visible { outline-color:var(--rojo); box-shadow:0 0 0 5px rgba(179,38,30,.15); }
  .clave { position:relative; }
  .clave input { padding-right:var(--alto); }
  .ojo {
    position:absolute; top:0; right:0; width:var(--alto); height:var(--alto); min-height:0; padding:0;
    border:0; border-radius:0 10px 10px 0; background:none; color:var(--tenue);
  }
  .ojo:hover { background:#eef2f8; color:var(--texto); }
  .ojo svg { width:1.15rem; height:1.15rem; }
  .ojo .tapado { display:none; }
  .ojo[aria-pressed="true"] .visto { display:none; }
  .ojo[aria-pressed="true"] .tapado { display:inline; }
  .ayuda { display:flex; gap:.4rem; align-items:flex-start; margin:.35rem 0 0; font-size:.82rem; color:var(--rojo); }
  .ayuda svg { flex:none; width:1rem; height:1rem; margin-top:.12rem; }
  .acciones { display:grid; gap:.6rem; margin-top:1.25rem; }
  button {
    display:inline-flex; align-items:center; justify-content:center; gap:.5rem; width:100%; min-height:var(--alto);
    padding:0 1rem; font:inherit; font-weight:600; border-radius:10px; border:1px solid transparent; cursor:pointer;
    background:var(--marca); color:#fff; transition:background-color .15s, border-color .15s, transform .05s;
    scroll-margin-block:6rem;
  }
  button:hover { background:var(--marca-osc); }
  button:active { transform:translateY(1px); }
  button.sec { background:#fff; color:var(--texto); border-color:var(--borde-campo); }
  button.sec:hover { background:#f4f6fa; }
  button.danger { background:#fff; color:var(--rojo); border-color:var(--rojo-borde); }
  button.danger:hover { background:var(--rojo-suave); border-color:#e8a9a3; }
  button svg { width:1rem; height:1rem; flex:none; }
  button:focus-visible { outline:3px solid var(--marca); outline-offset:2px; }
  button.danger:focus-visible { outline-color:var(--rojo); }
  .separa { display:flex; align-items:center; gap:.75rem; margin:.15rem 0; color:var(--tenue); font-size:.8rem; }
  .separa::before, .separa::after { content:""; flex:1; height:1px; background:var(--borde); }
  .pie { display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:0 .35rem; margin:.75rem 0 0; text-align:center; font-size:.85rem; color:var(--tenue); }
  .enlace {
    width:auto; padding:0 .5rem; border:0; background:none; color:var(--marca);
    font-weight:600; text-decoration:underline; text-underline-offset:3px;
  }
  .enlace:hover { background:none; color:var(--marca-osc); }
  .error {
    display:flex; gap:.55rem; align-items:flex-start; margin:0 0 .25rem; padding:.65rem .75rem; border-radius:10px;
    background:var(--rojo-suave); border:1px solid var(--rojo-borde); color:#7a1d0b; font-size:.86rem;
  }
  .error svg { flex:none; width:1.05rem; height:1.05rem; margin-top:.1rem; }
  .perfil { display:flex; align-items:center; gap:.85rem; padding:.85rem; border:1px solid var(--borde); border-radius:12px; background:#f8fafc; }
  .avatar {
    flex:none; width:3rem; height:3rem; border-radius:50%; display:grid; place-items:center; color:#fff;
    font-weight:700; font-size:1.05rem; letter-spacing:.02em; background:linear-gradient(135deg, #3b63d1, var(--marca-osc));
    box-shadow:0 0 0 3px #fff, 0 0 0 4px var(--borde);
  }
  .datos { display:grid; grid-template-columns:minmax(0,1fr); gap:0; margin:0; min-width:0; }
  .datos dt { margin-top:.45rem; font-size:.72rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--tenue); }
  .datos dt:first-child { margin-top:0; }
  .datos dd { margin:0; min-width:0; overflow-wrap:anywhere; } /* se parte, nunca se corta con «…» */
  .nombre { font-weight:650; }
  code {
    display:inline-block; padding:.05rem .45rem; border-radius:6px; background:#eef2f8; color:#334155;
    font:.75rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  @media (prefers-reduced-motion: reduce) { * { transition:none !important; } button:active { transform:none; } }
  @media (forced-colors: active) { .estado::before { background:CanvasText; } input:focus-visible, button:focus-visible { outline-color:Highlight; } }
`;
