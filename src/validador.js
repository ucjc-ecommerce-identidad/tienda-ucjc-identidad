// ROL: validador (puro).
// Qué hace: decide si los datos de un formulario son válidos y, si no, qué campo falla y cómo corregirlo.
// Qué no hace: no lee el DOM, no pinta, no mira si la cuenta existe ni la contraseña (eso es de cuentas.js).
// Qué toca: nada. Recibe un objeto y devuelve otro; por eso se puede probar sin navegador.

// Formato mínimo de email: algo@algo.algo, sin espacios.
export const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PISTA_EMAIL = 'Ejemplo: nombre@alumno.ucjc.edu';

// Une una lista en español: ["a"] -> "a"; ["a","b","c"] -> "a, b y c".
const unir = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs.at(-1)}`);

// Devuelve { ok, errores:[{campo, mensaje}], resumen }. Los errores salen en el orden en que se ven los campos.
const resultado = (errores, resumen) => ({ ok: errores.length === 0, errores, resumen: errores.length ? resumen : '' });

export function validarLogin({ email = '', password = '' }) {
  const mail = email.trim();
  const errores = [];
  const faltan = [];

  if (!mail) {
    errores.push({ campo: 'email', mensaje: `Escribe tu email. ${PISTA_EMAIL}` });
    faltan.push('tu email');
  } else if (!EMAIL_OK.test(mail)) {
    errores.push({ campo: 'email', mensaje: `Al email le falta la @ o el dominio. ${PISTA_EMAIL}` });
  }
  if (!password) {
    errores.push({ campo: 'password', mensaje: 'Escribe tu contraseña.' });
    faltan.push('tu contraseña');
  }

  const resumen = faltan.length
    ? `Escribe ${unir(faltan)} para entrar.`
    : 'El email no tiene un formato válido. ' + PISTA_EMAIL;
  return resultado(errores, resumen);
}

export function validarRegistro({ email = '', nombre = '', password = '' }) {
  const mail = email.trim();
  const errores = [];
  const faltan = [];

  if (!mail) {
    errores.push({ campo: 'reg-email', mensaje: `Escribe tu email. ${PISTA_EMAIL}` });
    faltan.push('email');
  } else if (!EMAIL_OK.test(mail)) {
    errores.push({ campo: 'reg-email', mensaje: `Al email le falta la @ o el dominio. ${PISTA_EMAIL}` });
  }
  if (!nombre.trim()) {
    errores.push({ campo: 'reg-nombre', mensaje: 'Escribe tu nombre para que la tienda sepa cómo llamarte.' });
    faltan.push('nombre');
  }
  if (!password) {
    errores.push({ campo: 'reg-password', mensaje: 'Elige una contraseña.' });
    faltan.push('contraseña');
  }

  const resumen = faltan.length
    ? `Rellena ${unir(faltan)}.`
    : 'El email no tiene un formato válido. ' + PISTA_EMAIL;
  return resultado(errores, resumen);
}

// Solo el email (recuperar contraseña y «usar otra cuenta» de un proveedor). `campo` es el data-f del campo.
export function validarEmail({ email = '' }, campo) {
  const mail = email.trim();
  if (!mail) return resultado([{ campo, mensaje: `Escribe tu email. ${PISTA_EMAIL}` }], 'Escribe tu email para continuar.');
  if (!EMAIL_OK.test(mail)) {
    return resultado([{ campo, mensaje: `Al email le falta la @ o el dominio. ${PISTA_EMAIL}` }], `El email no tiene un formato válido. ${PISTA_EMAIL}`);
  }
  return resultado([], '');
}

// Contraseña nueva (recuperación): mismas reglas que el registro, que solo pide que no esté vacía.
export function validarClaveNueva({ password = '' }) {
  return password
    ? resultado([], '')
    : resultado([{ campo: 'nueva-password', mensaje: 'Elige una contraseña nueva.' }], 'Elige una contraseña nueva para continuar.');
}
