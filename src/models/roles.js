const roles = require('./db/roles.js')
// console.log(roles);


const linkUser = (user) => {
  return roles.getAll()
    .then(results =>
      results.rows.reduce((acu,el)=>{
        acu[el.name] = el.id
        return acu
      },{})
    )
    .then(roleMap => {
      if(typeof user.roles === 'string') {
        user.roles = Array(user.roles)
      }
      let assignments = user.roles.map( roleName => {
        let roleId = roleMap[roleName]
        console.log(roleId)
        let userId = user.id
        return roles.assign(userId, roleId)
      })
      return Promise.all(assignments).then(()=>user)
    })

}

const getByUsername = (username) => {
  return roles.getByUsername(username)
    .then(results => {
      let userRoles = results.rows.map(obj => obj.name)
      let userInfo = results.rows[0]
      return {id: userInfo.id, username: userInfo.username, roles: userRoles }
    })

    // .then(rows => return {id: . roles: , username})
}
module.exports = {
  linkUser,
  getByUsername
}
