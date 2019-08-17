'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VentasSchema extends Schema {
  up () {
    this.create('ventas', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('ventas')
  }
}

module.exports = VentasSchema
