const bcrypt = require('bcrypt');
const users = require('./db/users.js')

const create = (body) => {
  let username = body.username
  let password = body.password

  if (!username || !password) throw new Error('Improper Signup Data')

  return bcrypt.hash(password, 10)
    .then(encrypted_password =>
      users.create(username, encrypted_password) )
    .then(result => {
      let userId = result.rows[0].id
      let userName = result.rows[0].username
      return {
        "id": Number(userId),
        "username": userName,
        "roles": body.roles
      }
    })
}

const exists = (username) => {
  return users.checkExists(username)
  .then(result => result.rows[0].exists )
}

const verifyPassword = (body) => {
  let username = body.username
  let password = body.password

  return users.getByUsername(username)
  .then(result => {
    if (result.rows.length === 0) return false
    let encrypted_password = result.rows[0].encrypted_password
    return bcrypt.compare(password, encrypted_password)
  })
}

module.exports = {
  create,
  exists,
  verifyPassword
}
