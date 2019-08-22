'use strict'

class AlmacenController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  // este metodo se ejecutará cada vez que el cliente lo solicite
  onActualizar(inventario) {
    this.socket.broadcastToAll("actualizar",inventario)
  }
}

module.exports = AlmacenController
