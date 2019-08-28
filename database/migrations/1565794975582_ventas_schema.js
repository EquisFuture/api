'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VentasSchema extends Schema {
  up () {
    this.create('ventas', (table) => {
      table.increments()
      table.integer('cliente').notNullable()
      table.double('subtotal').notNullable()
      table.double('impuestos').notNullable()
      table.double('total').notNullable()
      table.date('fecha').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ventas')
  }
}

module.exports = VentasSchema
