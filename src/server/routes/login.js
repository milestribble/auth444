const router = require('express').Router()
const users = require('../../models/users')
const roles = require('../../models/roles')


router.get('/login', (req, res) => {
  if (req.session.user){
    res.status(302).redirect('/')
  } else {
    res.render('login', {err:null})
  }
})

router.post('/login', (req, res) => {
  users.verifyPassword(req.body)
    .then(verified => {
      if (verified) {
       return roles.getByUsername(req.body.username)
     } else {
       res.render('login', {err:'Incorrect username or password.'})
     }
   })
    .then(user => {
      req.session.user = user
      res.status(302).redirect('/')
    })
})





//       doesExist => {
//       console.log(doesExist)
//       if (!doesExist){
//         users.create(req.body)
//           .then(roles.linkUser)
//           .then(user => {
//             console.log('setting user on req');
//             req.session.user = user
//             res.status(302).redirect('/')
//           })
//       } else {
//         res.render('signup', {err:'That username already exists.'})
//       }
//     })
// })

module.exports = router
