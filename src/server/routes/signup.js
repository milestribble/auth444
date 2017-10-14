const router = require('express').Router()
const users = require('../../models/users')
const roles = require('../../models/roles')


router.get('/signup', (req, res) => {
  if (req.session.user){
    res.status(302).redirect('/')
  } else {
    res.render('signup', {err:null})
  }
})

router.post('/signup', (req, res) => {
  users.checkExists(req.body.username)
    .then(doesExist => {
      console.log(doesExist)
      if (!doesExist){
        users.create(req.body)
          .then(roles.linkUser)
          .then(user => {
            console.log('setting user on req');
            req.session.user = user
            res.status(302).redirect('/')
          })
      } else {
        res.render('signup', {err:'That username already exists.'})
      }
    })
})

module.exports = router
