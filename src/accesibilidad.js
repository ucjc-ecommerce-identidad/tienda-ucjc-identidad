// ROL: motor de accesibilidad.
// Qué hace: genera los atributos ARIA de los campos con error y anuncia mensajes a lectores de pantalla.
//   - aria-invalid y aria-describedby se ponen SOLO después de validar o enviar, nunca antes.
//   - Los avisos de «sesión iniciada/cerrada» van a una región viva (role="status") que no se repinta,
//     así se anuncian sin mover el foco.
// Qué no hace: no valida, no mueve el foco (foco.js) y no pinta vistas.
// Qué toca: el texto de la región viva #vivo del Shadow DOM.

export const idAyuda = (campo) => `ayuda-${campo}`;

// `errores` es { campo: mensaje|null }. Si el campo tiene mensaje propio, lo describe él;
// si no (p. ej. contraseña incorrecta), lo describe el resumen de arriba (#error).
export function atributosCampo(campo, errores) {
  if (!(campo in errores)) return '';
  return ` aria-invalid="true" aria-describedby="${errores[campo] ? idAyuda(campo) : 'error'}"`;
}

export function anunciar(raiz, texto) {
  const vivo = raiz.getElementById('vivo');
  if (vivo) vivo.textContent = texto;
}
