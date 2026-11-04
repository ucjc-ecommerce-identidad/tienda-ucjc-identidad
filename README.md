# tienda-ucjc-identidad

Pieza de Identidad de la Tienda UCJC (proyecto de micro-frontends). Se encarga del login simulado, la sesión y el perfil del usuario.

Custom element: `<ucjc-identidad>`

## Equipo

| Nombre | Correo | GitHub |
|---|---|---|
| Sebastián Blanco (responsable) | | [@sebasxblanco](https://github.com/sebasxblanco) |
| Olivia Troitiño Frydrych | olivia.troitinofrydrych@alumno.ucjc.edu | [@oliviatroitino](https://github.com/oliviatroitino) |
| Ingrid Carvalhais Silva | ingrid.carvalhaissilva@alumno.ucjc.edu | |
| Fernando Melero Muñoz | fmeleromunoz@gmail.com | [@FerMelero](https://github.com/FerMelero) |
| Giordano Fabio Castilla García | giordano.fcg@gmail.com | [@Giordano-jpg](https://github.com/Giordano-jpg) |

## Cómo arrancarlo

```bash
npm install
npm run dev
```

## Eventos

Los eventos se lanzan en `window` como `CustomEvent`. El nombre lleva la versión (`@1`); el `detail` no.

### Eventos que emitimos

`ucjc:identidad:sesion-cambiada@1`: se lanza al iniciar o cerrar sesión, y una vez al cargar la pieza con el estado actual. Lo usan Compra (para confirmar el pedido) y Datos (para cargar los pedidos del usuario).

```json
{
  "autenticado": true,
  "usuario": { "id": "u-123", "email": "ana@alumno.ucjc.edu", "nombre": "Ana Pérez" },
  "momento": "2026-10-26T10:00:00Z"
}
```

Si se cierra sesión, va con `autenticado: false` y `usuario: null`. Permisos y roles se quedan dentro de la pieza y no salen al bus.

### Pendiente (otro PR)

`sesion-solicitada` y `sesion-consultada` quedan fuera de `@1`.

## Cómo se publica (contrato de carga del shell)

Requisito: **Node ≥ 20** (el workflow usa Node 22).

1. `npm ci && npm run build` → genera `dist/remote.js`.
2. Etiquetar y empujar: `git tag v0.2.0 && git push origin v0.2.0`.
3. El workflow `.github/workflows/release.yml` publica `dist/` en la rama `gh-pages` bajo `v0.2.0/`.
4. En el repo: *Settings → Pages* → Source: rama **`gh-pages`**, carpeta **`/`**.
5. URL esperada: `https://<usuario-o-org>.github.io/<repo>/v0.2.0/remote.js`.

Cada release publica también su **página propia** (`demo/index.html` → `dist/index.html`), que carga el mismo `remote.js` y muestra los eventos emitidos:

- Última release: https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/ (redirige a la carpeta del último tag)
- Una release concreta: `https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/vX.Y.Z/`
- Para el shell: `https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/vX.Y.Z/remote.js`

Un tag no se mueve nunca: si hay que corregir algo, se publica una versión nueva.

Esta pieza exporta `{ nombre, version }` y registra su custom element al importar el módulo.

### Tests

```bash
npm test
```

Comprueban el custom element, el `export default`, el evento `@1`, login correcto e incorrecto, registro y email repetido.
