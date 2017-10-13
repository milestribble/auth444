const { query } = require('./client.js')


//
const assign = (userId, roleId) =>
  query(`INSERT INTO  user_roles
          (user_id, role_id)
         VALUES
          ($1, $2)`, [userId, roleId])


const getByUserId = (userId) =>
  query(`SELECT roles.name
          FROM roles JOIN user_roles
          ON roles.id = user_roles.role_id
          WHERE user_roles.user_id=$1`, [userId])

const getAll = () =>
  query(`SELECT * FROM roles`)


module.exports = {
  assign,
  getByUserId,
  getAll
}
