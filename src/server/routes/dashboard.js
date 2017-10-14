const router = require('express').Router()
const users = require('../../models/users')
const roles = require('../../models/roles')


router.get('/', (req, res) => {
  if (!req.session.user){
    res.status(302).render('login', {err:null})
  } else {
    res.render('dashboard',{user: req.session.user})
  }
})

module.exports = router
