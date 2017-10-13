const expect = require('chai').expect

const users = require('../src/models/users.js')
const roles = require('../src/models/roles.js')
// const contacts = require('../src/models/contacts.js')

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
    return users.exists('Jedai')
    .then(status => {
      expect(status).to.equal(false)
    })
  })

  it(`Returns true if user already exists`, function() {
    return users.exists('miles')
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

describe(`roles#linkUser`, function() {
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
