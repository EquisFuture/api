'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// login
Route.post('login', 'UsuarioController.login')
Route.post('registrar-usuario', 'UsuarioController.registrarUsuario')

// Inventario
Route.post('registrar-concepto', 'InventarioController.registrarConcepto')
Route.post('editar-concepto', 'InventarioController.editarConcepto')
Route.get('obtener-inventario', 'InventarioController.obtenerInventario')
Route.get('buscar-inventario', 'InventarioController.buscar')

// Ventas
Route.get('obtener-ventas','VentaController.obtenerVentas')
Route.get('buscar-venta','VentaController.buscarVenta')

//Compras
Route.post('registrar-compra', 'CompraController.registrar')
