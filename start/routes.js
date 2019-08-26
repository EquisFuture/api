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

// Login
Route.post('login', 'UsuarioController.login')
Route.post('registrar-usuario', 'UsuarioController.registrarUsuario')
Route.get('login2/:correo', 'UsuarioController.loginAndroid') 
Route.post('login3', 'UsuarioController.loginAndroid2')

// Usuarios
Route.get('obtener-usuarios', 'UsuarioController.obtenerUsuarios')
Route.post('editar-usuario', 'UsuarioController.editarUsuario')


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
// Route.post('registrar-articulo', 'CompraController.regarticulo')
Route.post('buscar-compra', 'CompraController.bcompra')
Route.delete('borrar-compra', 'CompraController.dcompra')
