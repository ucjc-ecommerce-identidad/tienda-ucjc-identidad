// ROL: gestor de foco.
// Qué hace: mueve el foco del teclado a donde la persona lo necesita tras un cambio de vista.
//   - Tras un error: al primer campo inválido.
//   - Tras iniciar sesión, cerrar sesión o cambiar entre entrar/crear cuenta: al título de la vista nueva
//     (el botón que tenía el foco desaparece al repintar y, sin esto, el foco volvería al principio de la página).
// Qué no hace: no enfoca al cargar la pieza (no roba el foco de la página), no valida y no anuncia mensajes.
// Qué toca: llama a .focus() sobre un elemento del Shadow DOM.

export const enfocarCampo = (raiz, campo) => raiz.querySelector(`[data-f="${campo}"]`)?.focus();

export const enfocarTitulo = (raiz) => raiz.querySelector('h2')?.focus();
