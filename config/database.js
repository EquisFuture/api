'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'pg'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', '127.0.0.1'),
      port: Env.get('DB_PORT', '5432'),
      user: Env.get('DB_USER', 'postgres'),
      password: Env.get('DB_PASSWORD', '1234'),
      database: Env.get('DB_DATABASE', 'api')
    },
  
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MongoDB
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MongoDB database.
  |
  | npm i --save mongodb
  |
  */
  mongodb: {
    client: 'mongodb',
    connectionString: Env.get('MONGO_CONNECTION_STRING', 'mongodb://manuel:Manuel123@127.0.0.1:27017/api'),
    connection: {
      host: Env.get('MONGO_HOST', '127.0.0.1'),
      port: Env.get('MONGO_PORT', 27017),
      username: Env.get('MONGO_USER', 'manuel'),
      password: Env.get('MONGO_PASSWORD', 'Manuel123'),
      database: Env.get('MONGO_DATABASE', 'api'),
      options: {
        useNewUrlParser: true
      }
    }
  }
}
