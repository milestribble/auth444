const expect = require('chai').expect

const users = require('../src/models/db/users.js')
const roles = require('../src/models/db/roles.js')
const contacts = require('../src/models/db/contacts.js')

const { query } = require('../src/models/db/client.js')

/*
  USERS
*/

describe('users#create', function() {

  it('Inserts username to the database', function() {
    return users.create('John', 'superman12')
     .then((result) => {
       let userInfo = result.rows[0]
       expect(userInfo.username).to.equal('John')
     })
  })

  it('It assigns an integer id', function() {
    return users.create('Ryan', 'superman20')
     .then((result) => {
       let userInfo = result.rows[0]
       expect(userInfo.id).to.be.a('number')
     })
  })
})

describe(`DB users#getByUsername`, function() {

  it(`Returns the encrypted password for a given username`, function() {
    return users.getByUsername('John')
    .then((result) => {
      let userInfo = result.rows[0]
      expect(userInfo.encrypted_password).to.equal('superman12')
    })
  })

})

describe(`roles#getByUsername`, function() {

  it('Gets role for a user with only one role', function () {
    return roles.getByUsername('miles')
    .then(result => {
      let realRoles = result.rows.map((obj) => obj.name)
      expect(realRoles).to.include('regular')
    })
  })

  it('Gets roles for a user with many roles', function () {
    return roles.getByUsername('john')
    .then(result => {
      let realRoles = result.rows.map((obj) => obj.name)
      expect(realRoles).to.include('regular', 'admin')
    })
  })


})


/*
  CONTACTS
*/

describe(`contacts#create`, function() {

  it(`Returns an object with an id that is of type number`, function() {
    return contacts.create()
    .then(result => {
      let id = result.rows[0].id
      expect(id).to.be.a('number')
    })
  })

})

describe(`contacts#edit`, function() {

  it(`Edits the contact with specified id`, function() {
    let newName = 'Jared'
    let newPhone = '510-515-4222'
    return contacts.edit(1, newName, newPhone )
    .then((data) =>
      query(`SELECT * FROM contacts where id=1`)
    )
    .then((results) => {
      let userInfo = results.rows[0];
      expect(userInfo.name).to.equal(newName)
      expect(userInfo.phone).to.equal(newPhone)
    })
  })

})

describe(`contacts#destroy`, function() {

  it(`Deletes the contact with a specified id`, function() {
    return contacts.destroy(3)
    .then(() =>
      query(`SELECT * FROM contacts WHERE id=3`)
    )
    .then(results => {
        expect(results.rows.length).to.equal(0)
    })

  })
})

describe(`contacts#getAll`, function() {

  it(`Gets all contacts from the contacts table`, function() {
    return contacts.getAll()
    .then((results) => {
      let contacts = results.rows
      expect(contacts.length).to.not.equal(0)
      expect(contacts).to.deep.include({ id: 2, name: 'Jill', phone: '999-666-1111' })
    })
  })
})


/*
  ROLES
*/


describe(`roles#assign`, function() {

  it(`Assins a role to a user`, function() {
    return roles.assign(1, 1)
    .then(() =>
      query('SELECT * FROM user_roles WHERE user_id=1 AND role_id=1')
    )
    .then(result => {
      let assignment = result.rows[0]
      expect(assignment.user_id).to.equal(1)
      expect(assignment.role_id).to.equal(1)
    })
  })

})

describe(`roles#getByUserId`, function() {

  it(`Returns an array of rows`, function() {
    return roles.getByUsername('john')
    .then(results => {
      let roles = results.rows.map(obj => obj.name)
      expect(roles.length).to.equal(2)
      expect(roles).to.include('regular')
      expect(roles).to.include('admin')
    })
  })

})


describe(`roles#getAll`, function() {

  it(`Gets all the roles that exists`, function() {
    return roles.getAll()
    .then(results => {
      let roles = results.rows
      expect(roles).to.deep.include({id: 2, name:'regular'})
      expect(roles).to.deep.include({id: 1, name:'admin'})
    })
  })
})
