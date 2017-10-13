const { query } = require('./client.js')

const create = () =>
  query(`INSERT INTO contacts DEFAULT VALUES RETURNING id;`)

const edit = (id, newName, newPhone) =>
  query(`UPDATE contacts
         SET name=$1,
             phone=$2
         WHERE id=$3`,
       [newName, newPhone, id])

const destroy = (id) =>
  query(`DELETE FROM contacts WHERE id=$1`, [id])

const getAll = () =>
  query(`SELECT * FROM contacts`)

module.exports = {
  create,
  edit,
  destroy,
  getAll
}
