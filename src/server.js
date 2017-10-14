const app = require('express')()
const ejs = require('ejs')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const bodyParser = require('body-parser')
const pgPool = require('./models/db/client.js').pool
const signupRoute = require('./server/routes/signup')
const dashboardRoute = require('./server/routes/dashboard')
const logoutRoute = require('./server/routes/logout')
const loginRoute = require('./server/routes/login')
const path = require('path')

app.disable('etag');

app.use(bodyParser.urlencoded({ extended: true }))

// app.use(session({
//   store: new (require('connect-pg-simple')(session))(),
//   secret: 'keyboard cat',
//   cookie: { maxAge: 600000 }
// }))

app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "ejs")

app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'user_sessions'   // Use another table-name than the default "session" one
  }),
  secret: 'secretstuffdontlook',
  saveUninitialized: false,
  resave: true,
  id: 5,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000} // 30 days
}));

app.use((req, res, next) => {
  if(req.body){
    console.log(req.body);
    if(req.session.user)
      req.session.user['username'] = req.body.username
  }
  console.log(`before hitting routes:
req.session:  ${JSON.stringify(req.session, null, 2)},

req.session.user:  ${JSON.stringify(req.session.user, null, 2)}`);
  next()
})

app.use('/', signupRoute)
app.use('/', dashboardRoute)
app.use('/', logoutRoute)
app.use('/', loginRoute)

app.listen(3000)



/*

  "/" -> if not signed in - Redicert to Log In Page
      -> if  signed in - dashboard

  "/login" POST -> Check user credentials ? render dashboard || render login

  "/login" GET -> Render loginPage have a form





 */
