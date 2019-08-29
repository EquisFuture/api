'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/
const compra = use('App/Models/Compra')

const Ws = use('Ws')

Ws.channel('usuarios','UsuarioController'); 
Ws.channel('inventario','AlmacenController'); 
Ws.channel('ventas:*','VentaController'); 
Ws.channel('compras:*','CompraController');

Ws.channel('android','AndroidController');
