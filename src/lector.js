// ROL: lector.
// Qué hace: lee los valores que la persona ha escrito en los campos de la vista actual.
// Qué no hace: no valida, no recorta ni cambia lo escrito (la contraseña se lee tal cual) y no pinta.
// Qué toca: nada; solo lee `value` de los campos con data-f dentro del Shadow DOM.

export const leer = (raiz, campos) =>
  Object.fromEntries(campos.map((f) => [f, raiz.querySelector(`[data-f="${f}"]`)?.value ?? '']));
