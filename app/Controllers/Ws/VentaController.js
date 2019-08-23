'use strict'

class VentaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }


onActualizar(ventas) {
  this.socket.broadcastToAll("actualizar",ventas)
}

 }
module.exports = VentaController
