const { query } = require('./client.js')
const bcrypt = require('bcrypt');


const create = (username, encrypted_password) =>
  query(`INSERT INTO
           users (username, encrypted_password)
         VALUES ($1, $2)
         RETURNING id, username`,
         [username, encrypted_password])



const getByUsername = (username) =>
  query(`SELECT * FROM users WHERE username=$1`, [username])


module.exports = { create, getByUsername }
