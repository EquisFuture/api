'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VentasSchema extends Schema {
  up () {
    this.create('ventas', (table) => {
      table.increments()
      table.integer('cliente').notNullable()
      table.decimal('subtotal',10,8).notNullable()
      table.decimal('impuestos',10,8).notNullable()
      table.decimal('total',10,8).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ventas')
  }
}

module.exports = VentasSchema
