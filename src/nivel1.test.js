// ROL: inspector QA (parte 2): comportamiento del Nivel 1 y contrato del evento en todos los caminos.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import './main.js';

const EVT = 'ucjc:identidad:sesion-cambiada@1';

const montar = () => {
  const spy = vi.fn();
  window.addEventListener(EVT, spy);
  const el = document.createElement('ucjc-identidad');
  document.body.appendChild(el);
  return { el, spy, fin: () => window.removeEventListener(EVT, spy) };
};
const q = (el, sel) => el.shadowRoot.querySelector(sel);
const campo = (el, f) => q(el, `[data-f="${f}"]`);
const rellenar = (el, campos) => Object.entries(campos).forEach(([f, v]) => (campo(el, f).value = v));
const pulsar = (el, a) => q(el, `[data-a="${a}"]`).click();
const enviar = (el) => q(el, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('Nivel 1 · formulario', () => {
  it('antes de enviar no hay aria-invalid ni aviso (los errores solo aparecen tras validar)', () => {
    const { el, fin } = montar();
    expect(el.shadowRoot.querySelector('[aria-invalid]')).toBeNull();
    expect(el.shadowRoot.querySelector('[role="alert"]')).toBeNull();
    fin();
  });

  it('conserva el email tras un error y nunca rellena la contraseña', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'demo@alumno.ucjc.edu', password: 'mala' });
    enviar(el);
    expect(campo(el, 'email').value).toBe('demo@alumno.ucjc.edu');
    expect(campo(el, 'password').value).toBe('');
    fin();
  });

  it('conserva email y nombre del registro tras un error', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'nuevo@alumno.ucjc.edu', 'reg-nombre': 'Nora' });
    enviar(el);
    expect(campo(el, 'reg-email').value).toBe('nuevo@alumno.ucjc.edu');
    expect(campo(el, 'reg-nombre').value).toBe('Nora');
    fin();
  });

  it('no repite datos: el email escrito pasa de entrar a crear cuenta y vuelve (3.3.7)', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'ana@alumno.ucjc.edu' });
    pulsar(el, 'ir-registro');
    expect(campo(el, 'reg-email').value).toBe('ana@alumno.ucjc.edu');
    pulsar(el, 'ir-login');
    expect(campo(el, 'email').value).toBe('ana@alumno.ucjc.edu');
    fin();
  });

  it('con varios campos vacíos: un aviso por campo, cada uno descrito, y el foco al primero', () => {
    const { el, fin } = montar();
    enviar(el);
    for (const f of ['email', 'password']) {
      const c = campo(el, f);
      expect(c.getAttribute('aria-invalid')).toBe('true');
      const ayuda = el.shadowRoot.getElementById(c.getAttribute('aria-describedby'));
      expect(ayuda.textContent.length).toBeGreaterThan(5);
    }
    expect(q(el, '[role="alert"]').textContent).toContain('Escribe tu email y tu contraseña');
    expect(el.shadowRoot.activeElement).toBe(campo(el, 'email'));
    fin();
  });

  it('contraseña incorrecta: el campo remite al resumen (#error), que existe', () => {
    const { el, fin } = montar();
    rellenar(el, { email: 'demo@alumno.ucjc.edu', password: 'mala' });
    enviar(el);
    expect(campo(el, 'password').getAttribute('aria-describedby')).toBe('error');
    expect(el.shadowRoot.getElementById('error')).not.toBeNull();
    fin();
  });

  it('mostrar/ocultar contraseña: cambia el tipo, usa aria-pressed y conserva lo escrito', () => {
    const { el, fin } = montar();
    rellenar(el, { password: 'secreta' });
    const b = q(el, '[data-a="ver"]');
    expect(b.tagName).toBe('BUTTON');
    expect(b.getAttribute('type')).toBe('button');
    expect(b.getAttribute('aria-pressed')).toBe('false');
    b.click();
    expect(campo(el, 'password').type).toBe('text');
    expect(b.getAttribute('aria-pressed')).toBe('true');
    expect(campo(el, 'password').value).toBe('secreta');
    b.click();
    expect(campo(el, 'password').type).toBe('password');
    expect(b.getAttribute('aria-pressed')).toBe('false');
    fin();
  });

  it('atributos de entrada para teclados y gestores de contraseñas, sin bloquear autocompletar ni pegar (3.3.8)', () => {
    const { el, fin } = montar();
    const email = campo(el, 'email');
    expect(email.getAttribute('autocomplete')).toBe('username');
    expect(email.getAttribute('inputmode')).toBe('email');
    expect(email.getAttribute('autocapitalize')).toBe('none');
    expect(email.getAttribute('spellcheck')).toBe('false');
    expect(campo(el, 'password').getAttribute('autocomplete')).toBe('current-password');
    pulsar(el, 'ir-registro');
    expect(campo(el, 'reg-password').getAttribute('autocomplete')).toBe('new-password');
    expect(campo(el, 'reg-nombre').getAttribute('autocomplete')).toBe('name');
    for (const i of el.shadowRoot.querySelectorAll('input')) {
      expect(i.getAttribute('autocomplete')).not.toBe('off');
      expect(i.hasAttribute('onpaste')).toBe(false);
      expect(i.hasAttribute('aria-required')).toBe(true);
    }
    fin();
  });
});

describe('Nivel 1 · foco y anuncios', () => {
  it('al cargar no se roba el foco', () => {
    const { el, fin } = montar();
    expect(el.shadowRoot.activeElement).toBeNull();
    fin();
  });

  it('tras iniciar sesión el foco va al título y se anuncia en la región viva', () => {
    const { el, fin } = montar();
    pulsar(el, 'demo');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    expect(q(el, 'h2').textContent).toBe('Tu cuenta');
    expect(el.shadowRoot.getElementById('vivo').textContent).toBe('Sesión iniciada como Usuario demo.');
    fin();
  });

  it('tras cerrar sesión el foco va al título de entrar y se anuncia', () => {
    const { el, fin } = montar();
    pulsar(el, 'demo');
    pulsar(el, 'out');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    expect(q(el, 'h2').textContent).toBe('Inicia sesión');
    expect(el.shadowRoot.getElementById('vivo').textContent).toBe('Sesión cerrada.');
    fin();
  });

  it('la región viva es role=status y no se repinta (sobrevive a los cambios de vista)', () => {
    const { el, fin } = montar();
    const vivo = el.shadowRoot.getElementById('vivo');
    expect(vivo.getAttribute('role')).toBe('status');
    pulsar(el, 'demo');
    pulsar(el, 'out');
    expect(el.shadowRoot.getElementById('vivo')).toBe(vivo);
    fin();
  });

  it('cambiar entre entrar y crear cuenta lleva el foco al título nuevo', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    expect(el.shadowRoot.activeElement).toBe(q(el, 'h2'));
    fin();
  });
});

describe('Candado', () => {
  it('se muestra abierto solo con la sesión iniciada', () => {
    const { el, fin } = montar();
    expect(q(el, '.marca').classList.contains('abierto')).toBe(false);
    pulsar(el, 'demo');
    expect(q(el, '.marca').classList.contains('abierto')).toBe(true);
    pulsar(el, 'out');
    expect(q(el, '.marca').classList.contains('abierto')).toBe(false);
    fin();
  });
});

describe('Contrato sesion-cambiada@1: claves exactas en todos los caminos', () => {
  const CLAVES = ['autenticado', 'momento', 'usuario'];
  const CLAVES_USUARIO = ['email', 'id', 'nombre'];

  const revisar = (detail, autenticado) => {
    expect(Object.keys(detail).sort()).toEqual(CLAVES);
    expect(detail.autenticado).toBe(autenticado);
    expect(Number.isNaN(Date.parse(detail.momento))).toBe(false);
    if (autenticado) {
      expect(Object.keys(detail.usuario).sort()).toEqual(CLAVES_USUARIO);
      for (const k of CLAVES_USUARIO) expect(typeof detail.usuario[k]).toBe('string');
    } else {
      expect(detail.usuario).toBeNull();
    }
    expect(JSON.stringify(detail)).not.toMatch(/password|contraseña|version|roles?\b|permisos/i);
  };

  it('carga, login demo, logout, login con formulario y registro', () => {
    const { el, spy, fin } = montar();
    expect(spy).toHaveBeenCalledTimes(1);
    revisar(spy.mock.calls[0][0].detail, false); // al cargar

    pulsar(el, 'demo');
    expect(spy).toHaveBeenCalledTimes(2);
    revisar(spy.mock.calls[1][0].detail, true); // iniciar

    pulsar(el, 'out');
    expect(spy).toHaveBeenCalledTimes(3);
    revisar(spy.mock.calls[2][0].detail, false); // cerrar

    rellenar(el, { email: 'juan.perez@alumno.ucjc.edu', password: 'juan123' });
    enviar(el);
    expect(spy).toHaveBeenCalledTimes(4);
    revisar(spy.mock.calls[3][0].detail, true);
    pulsar(el, 'out');

    pulsar(el, 'ir-registro');
    rellenar(el, { 'reg-email': 'contrato@alumno.ucjc.edu', 'reg-nombre': 'Cora Trato', 'reg-password': 'abc' });
    enviar(el);
    revisar(spy.mock.calls.at(-1)[0].detail, true); // registrar
    expect(spy.mock.calls.at(-1)[0].detail.usuario.nombre).toBe('Cora Trato');
    fin();
  });

  it('los errores y los cambios de vista no emiten nada', () => {
    const { el, spy, fin } = montar();
    const n = spy.mock.calls.length;
    enviar(el); // vacío
    rellenar(el, { email: 'demo@alumno.ucjc.edu', password: 'mala' });
    enviar(el); // incorrecta
    pulsar(el, 'ir-registro');
    pulsar(el, 'ir-login');
    expect(spy.mock.calls.length).toBe(n);
    fin();
  });

  it('el id del usuario es estable entre inicios de sesión', () => {
    const { el, spy, fin } = montar();
    pulsar(el, 'demo');
    pulsar(el, 'out');
    pulsar(el, 'demo');
    const ids = spy.mock.calls.map((c) => c[0].detail.usuario?.id).filter(Boolean);
    expect(new Set(ids)).toEqual(new Set(['u-demo']));
    fin();
  });

  it('volver a conectar el elemento reemite el estado actual', () => {
    const { el, spy, fin } = montar();
    pulsar(el, 'demo');
    el.remove();
    document.body.appendChild(el);
    const d = spy.mock.calls.at(-1)[0].detail;
    revisar(d, true);
    expect(d.usuario.id).toBe('u-demo');
    fin();
  });
});
