'use strict'

class AndroidController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('Conexion android')
  }
 
}

module.exports = AndroidController
