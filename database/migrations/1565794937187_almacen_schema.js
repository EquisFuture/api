'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlmacenSchema extends Schema {
  up () {
    this.create('almacens', (table) => {
      table.increments()
      table.string('concepto', 50).notNullable()
      table.string('descripcion', 100).notNullable()
      table.integer('cantidad').notNullable()
      table.string('udm').notNullable()
      table.integer('precio_lista').notNullable()
      table.integer('precio_publico').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('almacens')
  }
}

module.exports = AlmacenSchema
