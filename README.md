# tienda-ucjc-identidad

Pieza de Identidad de la Tienda UCJC (proyecto de micro-frontends). Se encarga del login simulado, la sesión y el perfil del usuario.

Custom element: `<ucjc-identidad>`

## Equipo

- Sebastián Blanco (responsable) - [@sebasxblanco](https://github.com/sebasxblanco)
- Olivia Troitiño Frydrych - [@oliviatroitino](https://github.com/oliviatroitino)
- Ingrid
- [@FerMelero](https://github.com/FerMelero)
- [@Giordano-jpg](https://github.com/Giordano-jpg)

## Cómo arrancarlo

```bash
npm install
npm run dev
```

## Borrador de eventos

Los eventos se lanzan en `window` como `CustomEvent` (con `bubbles` y `composed` a true). El nombre lleva la versión y el `detail` también, para poder comprobarla al recibirlo.

### Eventos que emitimos

`ucjc:sesion-cambiada:v1`: se lanza al iniciar o cerrar sesión, y una vez al cargar la pieza con el estado actual.

```json
{
  "version": 1,
  "autenticado": true,
  "usuario": { "id": "u-123", "nombre": "Ana Pérez", "email": "ana@alumno.ucjc.edu" },
  "momento": "2026-10-26T10:00:00Z"
}
```

Si se cierra sesión, va con `autenticado: false` y `usuario: null`. Lo usarían Compra (para confirmar el pedido) y Datos (para cargar los pedidos del usuario).

### Eventos que escuchamos

`ucjc:sesion-solicitada:v1`: otra pieza pide que el usuario inicie sesión, por ejemplo Compra al confirmar un pedido sin sesión. Mostramos el login y al terminar lanzamos `ucjc:sesion-cambiada:v1`.

```json
{ "version": 1, "origen": "compra", "motivo": "checkout" }
```

`ucjc:sesion-consultada:v1`: una pieza que carga más tarde pregunta por la sesión actual y le respondemos volviendo a lanzar `ucjc:sesion-cambiada:v1`.

```json
{ "version": 1, "origen": "datos" }
```
