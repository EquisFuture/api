'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Venta extends Model {
    static get schema () {
        return {
          folio_venta: Number,
          concepto: [{descripcion: String, cantidad: Number, udm: Number, precio: Number}]
        }
      }
}

module.exports = Venta
