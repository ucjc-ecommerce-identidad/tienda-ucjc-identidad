import { beforeEach, describe, expect, it, vi } from 'vitest';
import mod from './main.js';

describe('ucjc-identidad', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('exporta metadatos de carga', () => {
    expect(mod).toEqual({ nombre: 'identidad', version: '0.2.7' });
  });

  it('emite sesion-cambiada al conectar y al login demo', async () => {
    const spy = vi.fn();
    window.addEventListener('ucjc:identidad:sesion-cambiada@1', spy);
    const el = document.createElement('ucjc-identidad');
    document.body.appendChild(el);
    expect(spy.mock.calls[0][0].detail.autenticado).toBe(false);

    el.shadowRoot.querySelector('[data-a="demo"]').click();
    expect(spy.mock.calls.at(-1)[0].detail).toMatchObject({
      autenticado: true,
      usuario: { email: 'demo@alumno.ucjc.edu' },
    });
  });

  // Rellena el formulario visible y pulsa un botón del shadow DOM.
  const rellenar = (el, campos) => {
    for (const [f, v] of Object.entries(campos)) el.shadowRoot.querySelector(`[data-f="${f}"]`).value = v;
  };
  const pulsar = (el, a) => el.shadowRoot.querySelector(`[data-a="${a}"]`).click();
  const montar = () => {
    const spy = vi.fn();
    window.addEventListener('ucjc:identidad:sesion-cambiada@1', spy);
    const el = document.createElement('ucjc-identidad');
    document.body.appendChild(el);
    return { el, spy, fin: () => window.removeEventListener('ucjc:identidad:sesion-cambiada@1', spy) };
  };

  it('login correcto emite usuario sin contraseña', () => {
    const { el, spy, fin } = montar();
    rellenar(el, { email: 'juan.perez@alumno.ucjc.edu', password: 'juan123' });
    pulsar(el, 'in');
    const detail = spy.mock.calls.at(-1)[0].detail;
    expect(detail).toMatchObject({ autenticado: true, usuario: { id: 'u-juanperez', email: 'juan.perez@alumno.ucjc.edu' } });
    expect(JSON.stringify(detail)).not.toContain('juan123');
    fin();
  });

  it('login incorrecto muestra error y no emite', () => {
    const { el, spy, fin } = montar();
    const antes = spy.mock.calls.length;
    rellenar(el, { email: 'demo@alumno.ucjc.edu', password: 'mala' });
    pulsar(el, 'in');
    expect(spy.mock.calls.length).toBe(antes);
    expect(el.shadowRoot.textContent).toContain('Email o contraseña incorrectos');
    fin();
  });

  it('registro entra directo y rechaza email repetido', () => {
    const { el, spy, fin } = montar();
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'nueva@alumno.ucjc.edu', 'reg-nombre': 'Nueva', 'reg-password': 'x1' });
    pulsar(el, 'registrar');
    expect(spy.mock.calls.at(-1)[0].detail).toMatchObject({ autenticado: true, usuario: { email: 'nueva@alumno.ucjc.edu' } });

    pulsar(el, 'out');
    expect(spy.mock.calls.at(-1)[0].detail).toEqual(expect.objectContaining({ autenticado: false, usuario: null }));

    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'demo@alumno.ucjc.edu', 'reg-nombre': 'Otra', 'reg-password': 'x' });
    pulsar(el, 'registrar');
    expect(el.shadowRoot.textContent).toContain('Ese email ya está registrado');
    fin();
  });

  it('el nombre se muestra como texto, no como HTML', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'xss@alumno.ucjc.edu', 'reg-nombre': '<img src=x>', 'reg-password': 'x' });
    pulsar(el, 'registrar');
    expect(el.shadowRoot.querySelector('img')).toBeNull();
    expect(el.shadowRoot.textContent).toContain('<img src=x>');
    fin();
  });

  it('Enter en el formulario inicia sesión (submit, no solo clic)', () => {
    const { el, spy, fin } = montar();
    rellenar(el, { email: 'maria.garcia@alumno.ucjc.edu', password: 'maria456' });
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(spy.mock.calls.at(-1)[0].detail).toMatchObject({ autenticado: true, usuario: { id: 'u-mariagarcia' } });
    fin();
  });

  it('el error se anuncia (role=alert), marca el campo y le lleva el foco', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'demo@alumno.ucjc.edu', password: 'mala' });
    pulsar(el, 'in');
    const alerta = el.shadowRoot.querySelector('[role="alert"]');
    expect(alerta.textContent).toContain('Email o contraseña incorrectos');
    const pass = el.shadowRoot.querySelector('[data-f="password"]');
    expect(pass.getAttribute('aria-invalid')).toBe('true');
    expect(pass.getAttribute('aria-describedby')).toBe('error');
    expect(el.shadowRoot.activeElement).toBe(pass);
    fin();
  });

  it('login con campos vacíos pide rellenarlos y no emite', () => {
    const { el, spy, fin } = montar();
    const antes = spy.mock.calls.length;
    pulsar(el, 'in');
    expect(spy.mock.calls.length).toBe(antes);
    expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('Escribe tu email y tu contraseña');
    fin();
  });

  it('registro rechaza un email con formato inválido', () => {
    const { el, spy, fin } = montar();
    const antes = spy.mock.calls.length;
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'sin-arroba', 'reg-nombre': 'X', 'reg-password': 'x' });
    pulsar(el, 'registrar');
    expect(spy.mock.calls.length).toBe(antes);
    expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('formato válido');
    expect(el.shadowRoot.querySelector('[data-f="reg-email"]').getAttribute('aria-invalid')).toBe('true');
    fin();
  });

  it('se puede quitar y volver a poner sin romper', () => {
    const { el, fin } = montar();
    // jsdom no relanza errores de connectedCallback: se reportan como evento 'error' en window.
    const errores = vi.fn((e) => e.preventDefault());
    window.addEventListener('error', errores);
    el.remove();
    document.body.appendChild(el);
    window.removeEventListener('error', errores);
    expect(errores).not.toHaveBeenCalled();
    expect(el.shadowRoot.querySelector('h2')).not.toBeNull();
    fin();
  });

  it('v0.2.5: la sesión muestra avatar con iniciales y el id', () => {
    const { el, fin } = montar();
    pulsar(el, 'demo');
    expect(el.shadowRoot.querySelector('.avatar').textContent).toBe('UD');
    expect(el.shadowRoot.querySelector('code').textContent).toBe('u-demo');
    expect(el.shadowRoot.querySelector('[data-a="out"]').classList.contains('danger')).toBe(true);
    fin();
  });
});
