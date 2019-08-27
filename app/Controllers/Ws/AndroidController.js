'use strict'

class AndroidController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('Conexion android')
  }
 
    onMensaje(mensaje){
      console.log(mensaje)
    }
}

module.exports = AndroidController
