'use strict'

class CompraController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  //Atualiza tabla de ventas
  onActualizar(compras){
    this.socket.broadcastToAll('actualizarTabla', compras)
  }
  onnuevoProveedor(){
    this.socket.broadcastToAll('actualizarProveedores');
    console.log('nuevo registro de proveedor')
  }
  onnuevaCompra(){
    this.socket.broadcastToAll('actualizarCompras');
    console.log('nueva compra registrada')
  }
}

module.exports = CompraController
