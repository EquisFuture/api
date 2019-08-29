'use strict'
const Venta = use('App/Models/Venta');

class AndroidController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('Conexion android')
  }
 
  async onMessage(){
    console.log('android pidio datos');
    let ventas = await Venta.query().select('id','fecha','total').fetch();
    this.socket.broadcastToAll("message", ventas);      
  }
}

module.exports = AndroidController
