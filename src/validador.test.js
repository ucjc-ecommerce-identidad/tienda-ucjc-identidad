// ROL: inspector QA (parte 1): el validador es puro, se prueba sin DOM.
import { describe, expect, it } from 'vitest';
import { validarLogin, validarRegistro } from './validador.js';

describe('validador (puro)', () => {
  it('login válido no devuelve errores ni resumen', () => {
    expect(validarLogin({ email: 'a@b.co', password: 'x' })).toEqual({ ok: true, errores: [], resumen: '' });
  });

  it('login vacío: un error por campo, en orden, con pista de cómo corregir', () => {
    const r = validarLogin({});
    expect(r.ok).toBe(false);
    expect(r.errores.map((e) => e.campo)).toEqual(['email', 'password']);
    expect(r.errores[0].mensaje).toContain('Ejemplo: nombre@alumno.ucjc.edu');
    expect(r.resumen).toBe('Escribe tu email y tu contraseña para entrar.');
  });

  it('login: solo falta la contraseña', () => {
    const r = validarLogin({ email: 'a@b.co' });
    expect(r.errores.map((e) => e.campo)).toEqual(['password']);
    expect(r.resumen).toBe('Escribe tu contraseña para entrar.');
  });

  it('login: email sin formato se detecta antes de buscar la cuenta', () => {
    const r = validarLogin({ email: 'sin-arroba', password: 'x' });
    expect(r.errores).toHaveLength(1);
    expect(r.errores[0].campo).toBe('email');
    expect(r.resumen).toContain('formato válido');
  });

  it('registro vacío: los tres campos y el resumen de siempre', () => {
    const r = validarRegistro({});
    expect(r.errores.map((e) => e.campo)).toEqual(['reg-email', 'reg-nombre', 'reg-password']);
    expect(r.resumen).toBe('Rellena email, nombre y contraseña.');
  });

  it('registro: el resumen nombra solo lo que falta', () => {
    expect(validarRegistro({ email: 'a@b.co', nombre: ' ', password: '' }).resumen).toBe('Rellena nombre y contraseña.');
  });

  it('registro: email inválido', () => {
    const r = validarRegistro({ email: 'x@y', nombre: 'N', password: 'p' });
    expect(r.errores.map((e) => e.campo)).toEqual(['reg-email']);
    expect(r.resumen).toContain('formato válido');
  });
});
