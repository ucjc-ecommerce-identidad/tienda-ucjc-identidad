// ROL: inspector QA (parte 3): proveedores simulados, selector de cuenta y recuperación de contraseña.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import './main.js';
import { PROVEEDORES } from './proveedores.js';

const EVT = 'ucjc:identidad:sesion-cambiada@1';

const montar = () => {
  const spy = vi.fn();
  window.addEventListener(EVT, spy);
  const el = document.createElement('ucjc-identidad');
  document.body.appendChild(el);
  return { el, spy, fin: () => window.removeEventListener(EVT, spy) };
};
const q = (el, sel) => el.shadowRoot.querySelector(sel);
const qa = (el, sel) => [...el.shadowRoot.querySelectorAll(sel)];
const campo = (el, f) => q(el, `[data-f="${f}"]`);
const rellenar = (el, campos) => Object.entries(campos).forEach(([f, v]) => (campo(el, f).value = v));
const pulsar = (el, a) => q(el, `[data-a="${a}"]`).click();
const prov = (el, id) => q(el, `[data-a="prov"][data-p="${id}"]`).click();
const cuenta = (el, email) => q(el, `[data-a="cuenta"][data-email="${email}"]`).click();
const enviar = (el) => q(el, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
const esc = (el) => el.shadowRoot.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
const vivo = (el) => el.shadowRoot.getElementById('vivo').textContent;
const titulo = (el) => q(el, 'h2').textContent;

const CLAVES = ['autenticado', 'momento', 'usuario'];
const CLAVES_USUARIO = ['email', 'id', 'nombre'];
const revisar = (detail, autenticado) => {
  expect(Object.keys(detail).sort()).toEqual(CLAVES);
  expect(detail.autenticado).toBe(autenticado);
  if (autenticado) {
    expect(Object.keys(detail.usuario).sort()).toEqual(CLAVES_USUARIO);
    for (const k of CLAVES_USUARIO) expect(typeof detail.usuario[k]).toBe('string');
  } else expect(detail.usuario).toBeNull();
  expect(JSON.stringify(detail)).not.toMatch(/password|contraseña|version|roles?\b|permisos|proveedor|google|microsoft|github/i);
};

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('proveedores.js (datos)', () => {
  it('Google, Microsoft y GitHub, en ese orden, con logo SVG decorativo y sin recursos externos', () => {
    expect(PROVEEDORES.map((p) => p.nombre)).toEqual(['Google', 'Microsoft', 'GitHub']);
    for (const p of PROVEEDORES) {
      expect(p.logo).toContain('aria-hidden="true"');
      expect(p.logo).not.toMatch(/https?:|<script|<image|href=|xlink/i);
    }
  });
});

describe('botones de proveedor', () => {
  it('login: tres botones en orden, bajo «o continúa con», con nombre accesible y sin bloquear pegar', () => {
    const { el, fin } = montar();
    const botones = qa(el, '[data-a="prov"]');
    expect(botones.map((b) => b.textContent.trim())).toEqual(['Google', 'Microsoft', 'GitHub']);
    expect(botones.every((b) => b.type === 'button' && b.querySelector('svg[aria-hidden="true"]'))).toBe(true);
    const grupo = q(el, '.provs');
    expect(grupo.getAttribute('role')).toBe('group');
    expect(el.shadowRoot.getElementById(grupo.getAttribute('aria-labelledby')).textContent).toBe('o continúa con');
    expect(qa(el, 'input').some((i) => i.hasAttribute('onpaste'))).toBe(false);
    fin();
  });

  it('registro: también aparecen, con «o regístrate con»', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    expect(qa(el, '[data-a="prov"]')).toHaveLength(3);
    expect(q(el, '#etq-prov').textContent).toBe('o regístrate con');
    fin();
  });

  it('«¿Olvidaste tu contraseña?» va entre la contraseña y el botón principal', () => {
    const { el, fin } = montar();
    const orden = qa(el, 'input[data-f="password"], [data-a="olvide"], [data-a="in"]').map((n) => n.dataset.f || n.dataset.a);
    expect(orden).toEqual(['password', 'olvide', 'in']);
    fin();
  });
});

describe('selector de cuenta', () => {
  it('se abre con el aviso «Modo demo», el foco en el título, las cuentas demo y «Usar otra cuenta»; no emite nada', () => {
    const { el, spy, fin } = montar();
    const n = spy.mock.calls.length;
    prov(el, 'google');
    expect(titulo(el)).toBe('Elige una cuenta de Google');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    expect(q(el, '.aviso').textContent).toBe('Modo demo: no contacta con Google.');
    expect(qa(el, '[data-a="cuenta"]').map((b) => b.dataset.email)).toEqual([
      'demo@alumno.ucjc.edu',
      'juan.perez@alumno.ucjc.edu',
      'maria.garcia@alumno.ucjc.edu',
    ]);
    expect(q(el, '[data-a="otra"]').textContent).toContain('Usar otra cuenta');
    expect(spy.mock.calls.length).toBe(n);
    fin();
  });

  it('el aviso nombra al proveedor elegido', () => {
    const { el, fin } = montar();
    prov(el, 'microsoft');
    expect(q(el, '.aviso').textContent).toBe('Modo demo: no contacta con Microsoft.');
    esc(el);
    prov(el, 'github');
    expect(q(el, '.aviso').textContent).toBe('Modo demo: no contacta con GitHub.');
    fin();
  });

  it('elegir una cuenta demo reutiliza su id, anuncia el proveedor y emite el evento con las claves exactas', () => {
    const { el, spy, fin } = montar();
    prov(el, 'google');
    cuenta(el, 'juan.perez@alumno.ucjc.edu');
    const d = spy.mock.calls.at(-1)[0].detail;
    revisar(d, true);
    expect(d.usuario).toEqual({ id: 'u-juanperez', email: 'juan.perez@alumno.ucjc.edu', nombre: 'Juan Pérez' });
    expect(vivo(el)).toBe('Sesión iniciada con Google como Juan Pérez.');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    fin();
  });

  it('Esc cancela y devuelve el foco al botón del proveedor (desde el login)', () => {
    const { el, spy, fin } = montar();
    const n = spy.mock.calls.length;
    prov(el, 'microsoft');
    esc(el);
    expect(titulo(el)).toBe('Inicia sesión');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="prov"][data-p="microsoft"]'));
    expect(spy.mock.calls.length).toBe(n);
    fin();
  });

  it('desde el registro, Esc vuelve al registro con lo escrito y el foco en el botón', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'a.b@alumno.ucjc.edu', 'reg-nombre': 'Ana B' });
    prov(el, 'github');
    esc(el);
    expect(titulo(el)).toBe('Crear cuenta');
    expect(campo(el, 'reg-email').value).toBe('a.b@alumno.ucjc.edu');
    expect(campo(el, 'reg-nombre').value).toBe('Ana B');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="prov"][data-p="github"]'));
    fin();
  });

  it('el botón «Cancelar» hace lo mismo que Esc', () => {
    const { el, fin } = montar();
    prov(el, 'google');
    pulsar(el, 'cancelar');
    expect(titulo(el)).toBe('Inicia sesión');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="prov"][data-p="google"]'));
    fin();
  });

  it('el email escrito en el login se conserva al abrir el selector y al cancelar', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'ana@alumno.ucjc.edu' });
    prov(el, 'google');
    esc(el);
    expect(campo(el, 'email').value).toBe('ana@alumno.ucjc.edu');
    fin();
  });
});

describe('«Usar otra cuenta»', () => {
  it('abre un formulario con foco en el título; Esc vuelve a la lista con el foco en «Usar otra cuenta»', () => {
    const { el, fin } = montar();
    prov(el, 'google');
    pulsar(el, 'otra');
    expect(titulo(el)).toBe('Usar otra cuenta de Google');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    esc(el);
    expect(titulo(el)).toBe('Elige una cuenta de Google');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="otra"]'));
    esc(el);
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="prov"][data-p="google"]'));
    fin();
  });

  it('email vacío o con mal formato: error accesible, foco al campo y nada de evento', () => {
    const { el, spy, fin } = montar();
    prov(el, 'google');
    pulsar(el, 'otra');
    const n = spy.mock.calls.length;
    enviar(el);
    expect(q(el, '[role="alert"]').textContent).toContain('Escribe tu email');
    expect(campo(el, 'prov-email').getAttribute('aria-invalid')).toBe('true');
    expect(el.shadowRoot.activeElement).toBe(campo(el, 'prov-email'));
    rellenar(el, { 'prov-email': 'sin-arroba' });
    enviar(el);
    expect(q(el, '[role="alert"]').textContent).toContain('formato válido');
    expect(campo(el, 'prov-email').value).toBe('sin-arroba');
    expect(spy.mock.calls.length).toBe(n);
    fin();
  });

  it('un email nuevo crea la cuenta simulada (id nuevo) y un email ya existente reutiliza su id', () => {
    const { el, spy, fin } = montar();
    prov(el, 'github');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'Lucia.Mora@gmail.com' });
    enviar(el);
    const d1 = spy.mock.calls.at(-1)[0].detail;
    revisar(d1, true);
    expect(d1.usuario).toMatchObject({ email: 'lucia.mora@gmail.com', nombre: 'Lucia Mora' });
    expect(vivo(el)).toBe('Cuenta creada. Sesión iniciada con GitHub como Lucia Mora.');
    pulsar(el, 'out');

    prov(el, 'google');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'lucia.mora@gmail.com' });
    enviar(el);
    expect(spy.mock.calls.at(-1)[0].detail.usuario.id).toBe(d1.usuario.id);
    expect(vivo(el)).toBe('Sesión iniciada con Google como Lucia Mora.');
    pulsar(el, 'out');

    prov(el, 'microsoft');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'MARIA.GARCIA@alumno.ucjc.edu' });
    enviar(el);
    expect(spy.mock.calls.at(-1)[0].detail.usuario.id).toBe('u-mariagarcia');
    fin();
  });

  it('desde el registro, entrar con un proveedor un email nuevo crea la cuenta y emite', () => {
    const { el, spy, fin } = montar();
    pulsar(el, 'ir-registro');
    prov(el, 'google');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'pablo.nuevo@alumno.ucjc.edu' });
    enviar(el);
    const d = spy.mock.calls.at(-1)[0].detail;
    revisar(d, true);
    expect(d.usuario.email).toBe('pablo.nuevo@alumno.ucjc.edu');
    fin();
  });

  it('una cuenta creada con un proveedor no admite entrar con contraseña vacía ni inventada', () => {
    const { el, spy, fin } = montar();
    prov(el, 'google');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'sin.clave@alumno.ucjc.edu' });
    enviar(el);
    pulsar(el, 'out');
    const n = spy.mock.calls.length;
    rellenar(el, { email: 'sin.clave@alumno.ucjc.edu', password: 'null' });
    enviar(el);
    expect(spy.mock.calls.length).toBe(n);
    expect(q(el, '[role="alert"]').textContent).toContain('Email o contraseña incorrectos');
    fin();
  });
});

describe('recuperar contraseña (modo demo)', () => {
  const aClave = (el, email) => {
    pulsar(el, 'olvide');
    rellenar(el, { 'rec-email': email });
    enviar(el);
    pulsar(el, 'abrir-enlace');
  };

  it('abre con el foco en el título y el email del login ya escrito', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'juan.perez@alumno.ucjc.edu' });
    pulsar(el, 'olvide');
    expect(titulo(el)).toBe('Recupera tu contraseña');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    expect(campo(el, 'rec-email').value).toBe('juan.perez@alumno.ucjc.edu');
    expect(q(el, '.aviso').textContent).toBe('Modo demo: no se envía ningún correo.');
    fin();
  });

  it('valida el email con el validador y deja el foco en el campo', () => {
    const { el, fin } = montar();
    pulsar(el, 'olvide');
    enviar(el);
    expect(q(el, '[role="alert"]').textContent).toContain('Escribe tu email');
    expect(el.shadowRoot.activeElement).toBe(campo(el, 'rec-email'));
    fin();
  });

  it('el aviso es el mismo exista o no el email y ofrece abrir el enlace (demo)', () => {
    const { el, fin } = montar();
    const texto = (email) => {
      pulsar(el, 'olvide');
      rellenar(el, { 'rec-email': email });
      enviar(el);
      const t = q(el, '.texto').textContent.replace(email, '«email»');
      const boton = q(el, '[data-a="abrir-enlace"]').textContent;
      pulsar(el, 'cancelar');
      return [t, boton];
    };
    const existe = texto('juan.perez@alumno.ucjc.edu');
    const noExiste = texto('nadie.de.nada@alumno.ucjc.edu');
    expect(existe).toEqual(noExiste);
    expect(existe[1]).toBe('Abrir el enlace del correo (demo)');
    expect(existe[0]).toContain('Si «email» está registrado');
    fin();
  });

  it('contraseña nueva: se valida, se cambia en memoria, vuelve al login SIN sesión y no emite nada', () => {
    const { el, spy, fin } = montar();
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'rec.uno@alumno.ucjc.edu', 'reg-nombre': 'Rec Uno', 'reg-password': 'vieja' });
    enviar(el);
    pulsar(el, 'out');
    const n = spy.mock.calls.length;

    pulsar(el, 'olvide');
    rellenar(el, { 'rec-email': 'rec.uno@alumno.ucjc.edu' });
    enviar(el);
    pulsar(el, 'abrir-enlace');
    expect(titulo(el)).toBe('Elige una contraseña nueva');
    enviar(el);
    expect(q(el, '[role="alert"]').textContent).toContain('Elige una contraseña nueva');
    expect(el.shadowRoot.activeElement).toBe(campo(el, 'nueva-password'));
    rellenar(el, { 'nueva-password': 'nueva123' });
    enviar(el);

    expect(titulo(el)).toBe('Inicia sesión');
    expect(q(el, '.estado').textContent).toBe('Sin sesión');
    expect(q(el, '.aviso').textContent).toBe('Contraseña cambiada. Inicia sesión con la nueva.');
    expect(vivo(el)).toBe('Contraseña cambiada. Inicia sesión con la nueva.');
    expect(campo(el, 'email').value).toBe('rec.uno@alumno.ucjc.edu');
    expect(spy.mock.calls.length).toBe(n); // ningún evento en todo el flujo

    rellenar(el, { email: 'rec.uno@alumno.ucjc.edu', password: 'vieja' });
    enviar(el);
    expect(q(el, '[role="alert"]').textContent).toContain('incorrectos');
    rellenar(el, { email: 'rec.uno@alumno.ucjc.edu', password: 'nueva123' });
    enviar(el);
    revisar(spy.mock.calls.at(-1)[0].detail, true);
    fin();
  });

  it('con un email que no existe el resultado visible es igual y no se crea ninguna cuenta', () => {
    const { el, spy, fin } = montar();
    aClave(el, 'fantasma@alumno.ucjc.edu');
    rellenar(el, { 'nueva-password': 'x1' });
    enviar(el);
    expect(q(el, '.aviso').textContent).toBe('Contraseña cambiada. Inicia sesión con la nueva.');
    const n = spy.mock.calls.length;
    rellenar(el, { email: 'fantasma@alumno.ucjc.edu', password: 'x1' });
    enviar(el);
    expect(spy.mock.calls.length).toBe(n);
    expect(q(el, '[role="alert"]').textContent).toContain('incorrectos');
    fin();
  });

  it('Esc en cualquier paso vuelve al login con el foco en «¿Olvidaste tu contraseña?»', () => {
    const { el, spy, fin } = montar();
    const n = spy.mock.calls.length;
    pulsar(el, 'olvide');
    esc(el);
    expect(titulo(el)).toBe('Inicia sesión');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="olvide"]'));

    pulsar(el, 'olvide');
    rellenar(el, { 'rec-email': 'a@b.co' });
    enviar(el);
    esc(el);
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="olvide"]'));
    expect(campo(el, 'email').value).toBe('a@b.co');

    aClave(el, 'a@b.co');
    esc(el);
    expect(titulo(el)).toBe('Inicia sesión');
    expect(el.shadowRoot.activeElement).toBe(q(el, '[data-a="olvide"]'));
    expect(spy.mock.calls.length).toBe(n);
    fin();
  });

  it('el aviso de contraseña cambiada se muestra una sola vez', () => {
    const { el, fin } = montar();
    aClave(el, 'a@b.co');
    rellenar(el, { 'nueva-password': 'z' });
    enviar(el);
    expect(q(el, '.aviso')).not.toBeNull();
    enviar(el); // login vacío: repinta con errores
    expect(q(el, '.aviso')).toBeNull();
    fin();
  });

  it('el campo de contraseña nueva admite gestor de contraseñas y pegar', () => {
    const { el, fin } = montar();
    pulsar(el, 'olvide');
    rellenar(el, { 'rec-email': 'a@b.co' });
    enviar(el);
    pulsar(el, 'abrir-enlace');
    const c = campo(el, 'nueva-password');
    expect(c.getAttribute('autocomplete')).toBe('new-password');
    expect(c.hasAttribute('onpaste')).toBe(false);
    expect(q(el, '[data-a="ver"]').getAttribute('aria-pressed')).toBe('false');
    fin();
  });
});

describe('Contrato sesion-cambiada@1 con proveedores y recuperación', () => {
  it('todos los caminos nuevos emiten solo autenticado, usuario{id,email,nombre}|null y momento', () => {
    const { el, spy, fin } = montar();
    revisar(spy.mock.calls[0][0].detail, false); // carga
    prov(el, 'google');
    cuenta(el, 'demo@alumno.ucjc.edu');
    revisar(spy.mock.calls.at(-1)[0].detail, true); // proveedor, cuenta demo
    pulsar(el, 'out');
    revisar(spy.mock.calls.at(-1)[0].detail, false); // cierre
    prov(el, 'github');
    pulsar(el, 'otra');
    rellenar(el, { 'prov-email': 'contrato.prov@alumno.ucjc.edu' });
    enviar(el);
    revisar(spy.mock.calls.at(-1)[0].detail, true); // proveedor, cuenta nueva
    el.remove();
    document.body.appendChild(el);
    revisar(spy.mock.calls.at(-1)[0].detail, true); // reconexión
    fin();
  });
});
