const expect = require('chai').expect

const users = require('../src/models/db/users.js')
const roles = require('../src/models/db/roles.js')

const { query } = require('../src/models/db/client.js')


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

describe(`users#getByUsername`, function() {

  it(`Returns the encrypted password for a given username`, function() {
    return users.getByUsername('John')
    .then((result) => {
      let userInfo = result.rows[0]
      expect(userInfo.encrypted_password).to.equal('superman12')
    })
  })

})

describe(`roles#getByUserId`, function() {

  it('Gets role for a user with only one role', function () {
    return roles.getByUserId(1)
    .then(result => {
      let realRoles = result.rows.map((obj) => obj.name)
      expect(realRoles).to.include('regular')
    })
  })

  it('Gets roles for a user with many roles', function () {
    return roles.getByUserId(3)
    .then(result => {
      let realRoles = result.rows.map((obj) => obj.name)
      expect(realRoles).to.include('regular', 'admin')
    })
  })


})


describe(`roles#assign`, function() {



  // it(``, function() {
  //   return roles.assign(userId, 1)
  //     .then(() => {
  //       // select * from user_roles where roleid = 1
  //       // query(`SELECT * FROM user_roles WHERE role_id=1`)
  //       roles.
  //     })
  //
  // })


})
