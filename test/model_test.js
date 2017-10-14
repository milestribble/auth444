const expect = require('chai').expect

const users = require('../src/models/users.js')
const roles = require('../src/models/roles.js')
const contacts = require('../src/models/contacts.js')

const { query } = require('../src/models/db/client.js')

/*
  USERS
*/

describe(`users#create`, function () {
  it('Returns an object with an id, a username, and roles', function(){
    return users.create({username: 'Bonnie', password: 'secret', roles: ['admin']})
      .then(userInfo => {
        let {id, username, roles} = userInfo
        expect(id).to.be.a('number')
        expect(username).to.equal('Bonnie')
        expect(roles).to.deep.include('admin')
      })
  })
})


describe(`users#exist`, function() {

  it(`Returns false if user does not already exists`, function() {
    return users.checkExists('Jedai')
    .then(status => {
      expect(status).to.equal(false)
    })
  })

  it(`Returns true if user already exists`, function() {
    return users.checkExists('miles')
    .then(status => {
      expect(status).to.equal(true)
    })
  })
})


describe(`users#verifyPassword`, function() {

  it(`Returns true if the users' password matches the one in the database`, function() {
    return users.verifyPassword({username: 'Bonnie', password: 'secret'})
      .then(res => {
        expect(res).to.equal(true)
      })
  })

  it(`Returns false if the users' username isn't in the same case`, function() {
    return users.verifyPassword({username: 'bonnie', password: 'secret'})
      .then(res => {
        expect(res).to.equal(false)
      })
  })

  it(`Returns false if the users' password doesn't match the one in the database`, function() {
    return users.verifyPassword({username: 'Bonnie', password: 'wrong'})
      .then(res => {
        expect(res).to.equal(false)
      })
  })

  it(`Returns false if the username case doesn't match the one in the database`, function() {
    return users.verifyPassword({username: 'BoNNie', password: 'secret'})
      .then(res => {
        expect(res).to.equal(false)
      })
  })

})

/*
  ROLES
*/

describe(`MODEL roles#linkUser`, function() {
  it(`Links the user to their roles`, function() {
    return users.create({username: 'Sammy', password: 'secret', roles: ['admin','regular']})
      .then(roles.linkUser)
      .then(() => query(`SELECT user_roles.role_id FROM user_roles
                         JOIN users ON
                         users.id = user_roles.user_id
                         WHERE users.username = 'Sammy'
                           `))
      .then(result => {
        let roleIds = result.rows.map(roleInfo => roleInfo.role_id)
        expect(roleIds).to.include(1)
        expect(roleIds).to.include(2)
      })
    return roles.linkUser
  })
})

describe(`roles#getByUsername`, function() {

  it(`Returns an array of role strings for a user by id`, function() {
    return roles.getByUsername('john')
      .then(user => {
        console.log(user)
        expect(user.roles).to.deep.include('admin','regular')
      })
  })
})

/*
  CONTACTS
*/

describe(`contacts#create`, function() {

  it(`Returns the id of the new entry`, function() {
    return contacts.create()
      .then(id => {
        expect(id).to.be.a('number')
        return id
      })
      .then(id =>
        query(`SELECT * FROM contacts WHERE id = $1`,[id])
      )
      .then(result => {
        expect(result.rows.length).to.equal(1)
        expect(result.rows[0].name).to.equal(null)
      })
  })

})

describe(`contacts#edit`, function() {

  it(`Edit the contact with a given id`, function() {
    return query(`SELECT id FROM contacts WHERE name IS null`)
      .then(result => result.rows[0].id )
      .then(id => {
        let contactInfo = {
          id: id,
          newName: 'Shawn',
          newPhone: '123-456-8767'
        }
        return contacts.edit(contactInfo).then(()=>id)
      })
      .then(id =>
        // console.log(results);
        query(`SELECT name FROM contacts WHERE id=$1`, [id])

      )
      .then(results => {
        expect(results.rows[0].name).to.equal('Shawn')
      })
  })

})

describe(`contacts#destroy`, function() {

  it(`Deletes the contact with the given id`, function() {
    return query(`SELECT id FROM contacts WHERE name='Shawn'`)
      .then( results => results.rows[0].id )
      .then( id => contacts.destroy(id) )
      .then( () => query(`SELECT id FROM contacts WHERE name='Shawn'`) )
      .then( results => expect(results.rows.length).to.equal(0) )
  })

})

describe(`contacts#getAll`, function() {

  it(`Returns more than 0 contacts`, function() {
    return contacts.getAll()
      .then( results => expect(results.rows.length).to.not.equal(0) )
  })
})
