'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class DetallesVenta
 */
class DetallesVenta extends BaseModel {
  /**
   * Exclude created_at and updated_at from the model
   */
  static get timestamps () {
    return false
  }
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'DetallesVentaHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * DetallesVenta's schema
   */
  static get schema () {
    return {
      folio_venta: Number,
            concepto: Number,
            cantidad: Number,
            descripcion: String,
            total: Number
    }
  }
}

module.exports = DetallesVenta.buildModel('DetallesVenta')
