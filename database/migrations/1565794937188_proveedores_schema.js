'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProveedoresSchema extends Schema {
  up () {
    this.create('proveedores', (table) => {
      table.increments()
      table.string('nombre_proveedor').notNullable()
      table.string('direccion').notNullable()
      table.string('telefono').notNullable()
      table.string('correo').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('proveedores')
  }
}

module.exports = ProveedoresSchema
