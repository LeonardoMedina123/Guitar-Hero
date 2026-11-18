# Guitar Hero

Tienda de instrumentos migrada a React y Vite. Incluye la tienda, el flujo de compra, las secciones de cuenta del cliente y el panel de administración.

## Desarrollo

```sh
npm install
npm run dev
```

Para validar o generar la versión de producción:

```sh
npm run lint
npm run build
```

## Pantallas

- Tienda: `/` o `/index.html`, `/catalogo.html`, `/producto.html`
- Compra: `/carrito.html`, `/pago.html`, `/confirmacion.html`
- Cuenta: `/cuenta.html`, `/cuenta-pedidos.html`, `/cuenta-direcciones.html`, `/contacto.html`
- Administración: `/admin-dashboard.html`, `/admin-inventario.html`, `/admin-pedidos.html`, `/admin-apartados.html`, `/admin-clientes.html`, `/admin-producto.html`, `/admin-producto-editar.html`
- Opciones pendientes: `/mantenimiento.html`

Las rutas con extensión `.html` se conservan para que sigan funcionando los enlaces del proyecto original. El carrito, los filtros del catálogo y la búsqueda funcionan en el cliente. El pago y la administración son una demostración de interfaz; no están conectados a un servicio de pagos ni a una API.
