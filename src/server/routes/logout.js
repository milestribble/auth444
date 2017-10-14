const router = require('express').Router()

router.get('/logout', (req, res) => {
  if (req.session.user){
    req.session.user = undefined
  }
    res.status(302).redirect('/login')
})

module.exports = router
