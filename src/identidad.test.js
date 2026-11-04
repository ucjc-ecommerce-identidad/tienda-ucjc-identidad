import { beforeEach, describe, expect, it, vi } from 'vitest';
import mod from './main.js';

describe('ucjc-identidad', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('exporta metadatos de carga', () => {
    expect(mod).toEqual({ nombre: 'identidad', version: '0.2.0' });
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
});
