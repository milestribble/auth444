const contacts = require('./db/contacts.js')
// console.log(roles);


const create = () =>
  contacts.create()
    .then(result => result.rows[0].id)

const edit = (contactInfo) => {
  let { id, newName, newPhone } = contactInfo
  return contacts.edit(id, newName, newPhone)
}

const destroy = (id) => {
  return contacts.destroy(id)
}

const getAll = () =>
  contacts.getAll()

module.exports = {
  create,
  edit,
  destroy,
  getAll
}
