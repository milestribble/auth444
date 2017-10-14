const { query } = require('./client.js')


//
const assign = (userId, roleId) =>
  query(`INSERT INTO  user_roles
          (user_id, role_id)
         VALUES
          ($1, $2)`, [userId, roleId])


const getByUsername = (username) =>
  query(`SELECT users.id, roles.name
          FROM roles
          JOIN user_roles
            ON roles.id = user_roles.role_id
          JOIN users
            ON user_roles.user_id = users.id
          WHERE users.username=$1`, [username])

const getAll = () =>
  query(`SELECT * FROM roles`)


module.exports = {
  assign,
  getByUsername,
  getAll
}
