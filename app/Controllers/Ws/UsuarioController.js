'use strict'

class UsuarioController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  //Atualiza tabla de ventas
  onActualizar(usuarios){
    this.socket.broadcastToAll('actualizar', usuarios)
  }
}

module.exports = UsuarioController
