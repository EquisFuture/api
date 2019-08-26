'use strict'

class VentaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }


onActualizar(ventas) {
  this.socket.broadcastToAll("actualizar",ventas)
}
onnuevoProveedor(){
  this.socket.broadcastToAll('actualizarProveedores')
  console.log('nuevo registro de cliente')
}
onnuevaCompra(){
  this.socket.broadcastToAll('actualizarCompras')
  console.log('nueva compra registrada')

}

 }
module.exports = VentaController
