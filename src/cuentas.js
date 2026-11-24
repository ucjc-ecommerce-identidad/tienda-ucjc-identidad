// ROL: datos de cuentas (simulado, solo en memoria).
// Qué hace: guarda las cuentas de demostración, busca una por email y contraseña, da de alta cuentas nuevas
//   (también las creadas con un proveedor simulado, que no tienen contraseña hasta que se recupera una) y cambia
//   la contraseña de una cuenta en memoria.
// Qué no hace: no valida formatos (validador.js), no toca el DOM y no emite eventos.
// Qué toca: solo la lista USUARIOS de este módulo. Las contraseñas nunca salen de aquí.

const USUARIOS = [
  { id: 'u-demo', email: 'demo@alumno.ucjc.edu', nombre: 'Usuario demo', password: 'demo', demo: true },
  { id: 'u-juanperez', email: 'juan.perez@alumno.ucjc.edu', nombre: 'Juan Pérez', password: 'juan123', demo: true },
  { id: 'u-mariagarcia', email: 'maria.garcia@alumno.ucjc.edu', nombre: 'María García', password: 'maria456', demo: true },
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
  // Las cuentas creadas con un proveedor no tienen contraseña (null): con contraseña no se puede entrar.
  const u = USUARIOS.find((x) => x.email === mail && x.password !== null && x.password === password);
  return u ? publico(u) : null;
}

export function registrar({ email, nombre, password }) {
  const nueva = { id: `u-${USUARIOS.length + 1}`, email: normalizar(email), nombre: nombre.trim(), password: password ?? null };
  USUARIOS.push(nueva);
  return publico(nueva);
}

// Las cuentas de demostración que ofrece el selector de cuenta de los proveedores (sin contraseñas).
export const cuentasDemo = () => USUARIOS.filter((u) => u.demo).map(publico);

// «ana.lopez@x.es» -> «Ana Lopez»: nombre para una cuenta creada con un proveedor, que no pide nombre.
export function nombreDesdeEmail(email) {
  const base = normalizar(email).split('@')[0].replace(/[._+-]+/g, ' ').trim();
  return base.replace(/(^|\s)(\S)/g, (_, esp, l) => esp + l.toUpperCase()) || 'Usuario';
}

// Entrar con un proveedor simulado: si el email ya existe se reutiliza su cuenta (mismo id); si no, se crea.
export function entrarOCrear(email) {
  const mail = normalizar(email);
  const u = USUARIOS.find((x) => x.email === mail);
  if (u) return { cuenta: publico(u), nueva: false };
  return { cuenta: registrar({ email: mail, nombre: nombreDesdeEmail(mail), password: null }), nueva: true };
}

// Cambia la contraseña en memoria. Devuelve false si el email no existe (quien llama no debe revelarlo).
export function cambiarPassword(email, password) {
  const u = USUARIOS.find((x) => x.email === normalizar(email));
  if (!u) return false;
  u.password = password;
  return true;
}
