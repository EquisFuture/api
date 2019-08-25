'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proveedor extends Model {
    static get table () {
        return 'proveedores'
      }
}

module.exports = Proveedor
