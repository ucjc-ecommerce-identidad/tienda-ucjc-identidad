// ROL: inspector QA (parte 4): rediseño de cristal (paso 2). Estructura, vistas, transiciones y reglas del CSS.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import './main.js';
import { css } from './estilos.js';

const EVT = 'ucjc:identidad:sesion-cambiada@1';
const montar = () => {
  const spy = vi.fn();
  window.addEventListener(EVT, spy);
  const el = document.createElement('ucjc-identidad');
  document.body.appendChild(el);
  return { el, spy, fin: () => window.removeEventListener(EVT, spy) };
};
const q = (el, s) => el.shadowRoot.querySelector(s);
const qa = (el, s) => [...el.shadowRoot.querySelectorAll(s)];
const pulsar = (el, a) => q(el, `[data-a="${a}"]`).click();
const rellenar = (el, campos) => Object.entries(campos).forEach(([f, v]) => (q(el, `[data-f="${f}"]`).value = v));
const enviar = (el) => q(el, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
const esc = (el) => el.shadowRoot.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
const anim = (el) => el.shadowRoot.getElementById('raiz').dataset.anim;

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('estructura del cristal', () => {
  it('fondo liso y la vista dentro de la escena', () => {
    const { el, fin } = montar();
    const escena = q(el, '.escena');
    expect(escena).not.toBeNull();
    expect(escena.querySelector('.formas, .fm')).toBeNull();
    expect(escena.querySelector('.contenedor #raiz .tarjeta')).not.toBeNull();
    // la región viva queda fuera de lo que se repinta
    expect(escena.contains(el.shadowRoot.getElementById('vivo'))).toBe(false);
    fin();
  });

  it('todas las vistas usan la misma tarjeta con el logo (candado + «Tienda UCJC»)', () => {
    const { el, fin } = montar();
    const revisar = (titulo) => {
      expect(q(el, '.tarjeta h2').textContent).toBe(titulo);
      expect(q(el, '.tarjeta .logo').textContent.trim()).toBe('Tienda UCJC');
      expect(q(el, '.tarjeta .logo .marca svg')).not.toBeNull();
    };
    revisar('Inicia sesión');
    pulsar(el, 'ir-registro'); revisar('Crear cuenta');
    pulsar(el, 'ir-login');
    q(el, '[data-a="prov"][data-p="google"]').click(); revisar('Elige una cuenta de Google');
    pulsar(el, 'otra'); revisar('Usar otra cuenta de Google');
    esc(el); esc(el);
    pulsar(el, 'olvide'); revisar('Recupera tu contraseña');
    rellenar(el, { 'rec-email': 'a@b.co' }); enviar(el); revisar('Revisa tu correo');
    pulsar(el, 'abrir-enlace'); revisar('Elige una contraseña nueva');
    esc(el);
    pulsar(el, 'demo'); revisar('Tu cuenta');
    fin();
  });

  it('«Entrar con la cuenta demo» es un botón visible, no un enlace', () => {
    const { el, fin } = montar();
    const b = q(el, '[data-a="demo"]');
    expect(b.tagName).toBe('BUTTON');
    expect(b.classList.contains('btn-sec')).toBe(true);
    expect(b.classList.contains('enlace')).toBe(false);
    expect(b.classList.contains('sr')).toBe(false);
    expect(b.textContent.trim()).toBe('Entrar con la cuenta demo');
    fin();
  });

  it('el botón principal se nombra por su texto; la flecha es decorativa', () => {
    const { el, fin } = montar();
    const b = q(el, '[data-a="in"]');
    expect(b.textContent.trim()).toBe('Iniciar sesión');
    expect(b.querySelector('svg.flecha').getAttribute('aria-hidden')).toBe('true');
    fin();
  });

  it('los proveedores muestran solo el logo y conservan el nombre como texto accesible', () => {
    const { el, fin } = montar();
    for (const b of qa(el, '[data-a="prov"]')) {
      const nombre = b.querySelector('.sr').textContent;
      expect(b.textContent.trim()).toBe(nombre);
      expect(b.getAttribute('title')).toBe(nombre);
    }
    fin();
  });

  it('el estado «Sin sesión» queda para lectores de pantalla y «Sesión activa» se ve', () => {
    const { el, fin } = montar();
    expect(q(el, '.estado').classList.contains('sr')).toBe(true);
    pulsar(el, 'demo');
    expect(q(el, '.estado').textContent).toBe('Sesión activa');
    expect(q(el, '.estado').classList.contains('sr')).toBe(false);
    fin();
  });

  it('el candado abierto es un dibujo propio (otro arco), no el cerrado girado', () => {
    const { el, fin } = montar();
    expect(q(el, '.marca .arco')).not.toBeNull();
    expect(q(el, '.marca .arco-abierto')).not.toBeNull();
    expect(css).not.toMatch(/\.arco\{[^}]*rotate/);
    fin();
  });

  it('al entrar y salir el logo no se redibuja: se queda quieto y solo cambia el candado', () => {
    const { el, fin } = montar();
    pulsar(el, 'demo');
    expect(q(el, '.logo').classList.contains('igual')).toBe(true);
    expect(q(el, '.tarjeta').dataset.candado).toBe('abre');
    pulsar(el, 'out');
    expect(q(el, '.logo').classList.contains('igual')).toBe(true);
    expect(q(el, '.tarjeta').dataset.candado).toBe('cierra');
    pulsar(el, 'ir-registro');
    expect(q(el, '.tarjeta').dataset.candado).toBeUndefined(); // sin cambio de candado, sin animación del arco
    fin();
  });

  it('el candado solo está abierto con la sesión iniciada, en todas las vistas', () => {
    const { el, fin } = montar();
    for (const a of ['ir-registro', 'ir-login', 'olvide']) {
      pulsar(el, a);
      expect(q(el, '.marca').classList.contains('abierto')).toBe(false);
    }
    esc(el);
    pulsar(el, 'demo');
    expect(q(el, '.marca').classList.contains('abierto')).toBe(true);
    fin();
  });
});

describe('transiciones entre vistas (data-anim)', () => {
  it('avanzar desliza «adelante», volver «atras», entrar «sesion»; al cargar «inicio»', () => {
    const { el, fin } = montar();
    expect(anim(el)).toBe('inicio');
    pulsar(el, 'ir-registro'); expect(anim(el)).toBe('adelante');
    pulsar(el, 'ir-login'); expect(anim(el)).toBe('atras');
    q(el, '[data-a="prov"][data-p="github"]').click(); expect(anim(el)).toBe('adelante');
    pulsar(el, 'otra'); expect(anim(el)).toBe('adelante');
    esc(el); expect(anim(el)).toBe('atras');
    esc(el); expect(anim(el)).toBe('atras');
    pulsar(el, 'olvide'); expect(anim(el)).toBe('adelante');
    rellenar(el, { 'rec-email': 'a@b.co' }); enviar(el); expect(anim(el)).toBe('adelante');
    pulsar(el, 'abrir-enlace'); expect(anim(el)).toBe('adelante');
    rellenar(el, { 'nueva-password': 'z9' }); enviar(el); expect(anim(el)).toBe('atras');
    pulsar(el, 'demo'); expect(anim(el)).toBe('sesion');
    pulsar(el, 'out'); expect(anim(el)).toBe('atras');
    fin();
  });

  it('repintar por un error no anima la vista (solo aparece el aviso)', () => {
    const { el, fin } = montar();
    pulsar(el, 'ir-registro');
    enviar(el);
    expect(anim(el)).toBe('');
    expect(q(el, '[role="alert"]')).not.toBeNull();
    fin();
  });
});

describe('reglas del CSS', () => {
  // Quita el bloque @media (prefers-reduced-motion:no-preference){...} y devuelve el resto.
  const fueraDeMovimiento = () => {
    const ini = css.indexOf('@media (prefers-reduced-motion:no-preference){');
    let i = css.indexOf('{', ini) + 1, n = 1;
    while (n && i < css.length) { if (css[i] === '{') n++; if (css[i] === '}') n--; i++; }
    return css.slice(0, ini) + css.slice(i);
  };

  it('sin recursos externos: ni url(), ni @import, ni http', () => {
    expect(css).not.toMatch(/url\(|@import|https?:/i);
  });

  it('las animaciones solo existen dentro de prefers-reduced-motion: no-preference', () => {
    const resto = fueraDeMovimiento();
    expect(resto.match(/animation:(?!none)/g)).toBeNull();
    expect(css).toContain('@media (prefers-reduced-motion:reduce)');
  });
});
