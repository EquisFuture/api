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
Route.get('buscar-usuario', 'UsuarioController.buscarUsuario')

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
Route.get('obtener-ventas-android','VentaController.android')
//Route.get('buscar-venta','VentaController.buscarVenta')
Route.post('registrar-venta','VentaController.registrarVenta')
Route.get('buscar-venta/:folio','VentaController.bventa')
//Compras
Route.post('registrar-compra', 'CompraController.registrar')
// Route.post('registrar-articulo', 'CompraController.regarticulo')
Route.get('buscar-compra/:folio', 'CompraController.bcompra')
Route.delete('borrar-compra', 'CompraController.dcompra')
Route.get('compras', 'CompraController.compras')
Route.get('buscar-usuario/:id', 'CompraController.autorizacompra')
Route.get('buscar-proveedor/:id', 'CompraController.proveedorcompra')
Route.get('buscador-compras/:keyword', 'CompraController.buscador')
Route.get('filtrar/:inicio/:fin', 'CompraController.filtrar')

//Clientes
Route.post('registrar-cliente','ClienteController.registrarCliente')
Route.get('obtener-clientes','ClienteController.getClientes')

//proveedores
Route.post('registrar-proveedor','ProveedorController.registrarProveedor')
Route.get('proveedores', 'ProveedorController.getProveedores')
