'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VentasSchema extends Schema {
  up () {
    this.create('ventas', (table) => {
      table.increments()
      table.integer('vendedor').references('id').inTable('users')
      table.string('concepto').notNullable()
      table.integer('cantidad').notNullable()
      table.integer('costo_total').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ventas')
  }
}

module.exports = VentasSchema
