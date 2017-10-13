const roles = require('./db/roles.js')
// console.log(roles);


const linkUser = (userInfo) => {
  return roles.getAll()
    .then(results =>
      results.rows.reduce((acu,el)=>{
        acu[el.name] = el.id
        return acu
      },{})
    )
    .then(roleMap => {
      // console.log('userInfo: ',userInfo);
      let assignments = userInfo['roles'].map( roleName => {
        let roleId = roleMap[roleName]
        let userId = userInfo.id
        return roles.assign(userId, roleId)
      })
      return Promise.all(assignments).then(()=>userInfo)
    })
    
}

module.exports = {
  linkUser
}
