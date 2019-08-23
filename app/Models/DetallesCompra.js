'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class DetallesCompra
 */
class DetallesCompra extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'DetallesCompraHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * DetallesCompra's schema
   */
  static get schema () {
    return {
      folio_compra: Number,
      concepto: String,
      descripcion: String,
      cantidad: Number,
      udm: String,
      precio: Number
    }
  }
}

module.exports = DetallesCompra.buildModel('DetallesCompra')
