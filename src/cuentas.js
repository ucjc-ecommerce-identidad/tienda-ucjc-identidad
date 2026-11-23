// ROL: datos de cuentas (simulado, solo en memoria).
// Qué hace: guarda las cuentas de demostración, busca una por email y contraseña y da de alta cuentas nuevas.
// Qué no hace: no valida formatos (validador.js), no toca el DOM y no emite eventos.
// Qué toca: solo la lista USUARIOS de este módulo. Las contraseñas nunca salen de aquí.

const USUARIOS = [
  { id: 'u-demo', email: 'demo@alumno.ucjc.edu', nombre: 'Usuario demo', password: 'demo' },
  { id: 'u-juanperez', email: 'juan.perez@alumno.ucjc.edu', nombre: 'Juan Pérez', password: 'juan123' },
  { id: 'u-mariagarcia', email: 'maria.garcia@alumno.ucjc.edu', nombre: 'María García', password: 'maria456' },
];

export const DEMO = { email: USUARIOS[0].email, password: USUARIOS[0].password };

const normalizar = (email) => (email || '').trim().toLowerCase();

// Solo lo que puede salir de aquí: id, email y nombre (nunca la contraseña).
const publico = ({ id, email, nombre }) => ({ id, email, nombre });

export function existe(email) {
  const mail = normalizar(email);
  return USUARIOS.some((u) => u.email === mail);
}

export function buscar(email, password) {
  const mail = normalizar(email);
  const u = USUARIOS.find((x) => x.email === mail && x.password === password);
  return u ? publico(u) : null;
}

export function registrar({ email, nombre, password }) {
  const nueva = { id: `u-${USUARIOS.length + 1}`, email: normalizar(email), nombre: nombre.trim(), password };
  USUARIOS.push(nueva);
  return publico(nueva);
}
