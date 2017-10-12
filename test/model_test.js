// const {expect} = require('chai')
// const {query} = require('../src/db/client.js')
// const db = require('../src/db/db.js')
//
// describe('createUser()', function() {
//   beforeEach(function(done) {
//     query('TRUNCATE TABLE users CASCADE').then(res => done()).catch(err => done())
//
//   })
//
//   it('Throws an error if it does not see a username and/or password', function() {
//     expect(() => db.createUser({password: 0})).to.throw('Improper Signup Data')
//     expect(() => db.createUser({username: 0})).to.throw('Improper Signup Data')
//   })
//
//   it("Returns the form's roles", function(done) {
//     db.createUser({
//       username: 'testUser',
//       password: '12345',
//       roles: ['admin', 'regular']
//     }).then(result => {
//       // expect(result).to.deep.includes(['admin', 'regular'])
//       expect(result.roles).to.deep.equal(['admin', 'regular'])
//       done()
//     })
//   })
//
//   it('Returns the user_id', function(done) {
//     db.createUser({
//       username: 'testUser',
//       password: '12345',
//       roles: ['admin', 'regular']
//     }).then(result => {
//       // expect(result[0]).to.be.a('number')
//       expect(result.id).to.be.a('number')
//       done()
//     })
//   })
// })
//
// describe('linkUser()', function() {
//   let testUser
//   before(function(done) {
//     query(`INSERT INTO users
//             (username, encrypted_password)
//           VALUES
//             ('baibhav', '3456yu' ),
//             ('miles', '465789'),
//             ('john','56e7890i')
//           RETURNING id;`)
//     .then(res => {
//       testUser = res.rows[0]['id']
//       done()
//     })
//     .catch(err => {
//       console.log(err)
//       done()
//     })
//
//   })
//   it('Throws an error if it does not see a user_id', function() {
//     expect(() => db.linkUser({
//       "id": undefined,
//       "roles": ['admin', 'regular']
//     })).to.throw('No User_info')
//   })
//   it('Throws an error if it does not see a roles', function() {
//     expect(() => db.linkUser({
//       "id": testUser,
//       "roles": undefined
//     })).to.throw('No User_info')
//   })
//   it('Returns a user id and the req.body', function(done) {
//     db.linkUser({
//       "id": testUser,
//       "roles": ['admin', 'regular']
//     })
//       .then(user_info => {
//         expect(user_info.id).to.be.a('number')
//         done()
//       })
//
//   })
// })
//
// // pg.end()
// //
// //
