const app = require('express')()
const ejs = require('ejs')
const expressSession = require('express-session')
const bodyParser = require('body-parser')


/*

  "/" -> if not signed in - Redicert to Log In Page
      -> if  signed in - dashboard 

  "/login" POST -> Check user credentials ? render dashboard || render login

  "/login" GET -> Render loginPage have a form





 */
