'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompraSchema extends Schema {
  up () {
    this.create('compras', (table) => {
      table.increments()
      table.double('costo_total').notNullable()
      table.integer('autoriza').references('id').inTable('users')
      table.integer('proveedor').references('id').inTable('proveedores')
      table.timestamps()
      
    })
  }

  down () {
    this.drop('compras')
  }
}

module.exports = CompraSchema
