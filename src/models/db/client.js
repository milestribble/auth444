const { Pool } = require('pg')

const connectionString = process.env.NODE_ENV === 'test'
  ? 'postresql://localhost:5432/auth444_test'
  : 'postresql://localhost:5432/auth444'

const pool = new Pool({connectionString})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})



function query (statement, params) {
  return new Promise(function (resolve, reject) {
    pool.connect()
      .then(client => {
        client.query(statement, params)
        .then(res => { client.release(); resolve(res) })
        .catch(e => { client.release(); reject(e.stack) })
      })
  })
}

module.exports = { query }
