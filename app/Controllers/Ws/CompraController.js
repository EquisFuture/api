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
}

module.exports = CompraController
