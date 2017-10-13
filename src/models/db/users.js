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

const checkExists = (username) =>
  query(`SELECT EXISTS (SELECT username FROM users WHERE LOWER(username)=$1)`, [username.toLowerCase()])

module.exports = { create, getByUsername, checkExists }
