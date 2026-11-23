// ROL: gestor de eventos hacia fuera (el contrato con el resto de la tienda).
// Qué hace: emite en window `ucjc:identidad:sesion-cambiada@1` con el detail firmado en el contrato.
// Qué no hace: no decide cuándo emitir (lo decide el componente), no lee el DOM y no añade campos.
// Qué toca: window (dispatchEvent). El detail lleva SOLO autenticado, usuario ({id, email, nombre} o null) y momento.

export const EVT = 'ucjc:identidad:sesion-cambiada@1';

export function emitirSesion(usuario) {
  const detail = {
    autenticado: Boolean(usuario),
    usuario: usuario ? { id: usuario.id, email: usuario.email, nombre: usuario.nombre } : null,
    momento: new Date().toISOString(),
  };
  window.dispatchEvent(new CustomEvent(EVT, { detail }));
}
