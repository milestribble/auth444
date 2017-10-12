const bcrypt = require('bcrypt');
const user = require('./db/user.js')

const create = function (body) {
  let username = body.username
  let password = body.password
  if (!username || !password) throw new Error('Improper Signup Data')
  bcrypt.hash(password, 10).then(encrypted_password =>
    user.create(username, encrypted_password)
    .then(id => {
      return {
      "id": Number(id),
      "roles": body.roles
      }
    })
}

// set the user name  : Miles
// set the password:    superman12
// --> abc1234abcd
//
//
// When I create a user with username something and password superman12
// --> abc1234abcd
//
