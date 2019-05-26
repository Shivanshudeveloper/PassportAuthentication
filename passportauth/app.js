const express = require('express')
// Bringing the Layouts
const expressLayouts = require('express-ejs-layouts')
// Mongoose
const mongoose = require('mongoose')
// Flash Messages
const flash = require('connect-flash')
// Session
const session = require('express-session')
// Passport
const passport = require('passport')
const app = express()

// Passport Config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MongoURI
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDB Connected') )
    .catch(err => console.log(err))

// EJS Middle Layer
app.use(expressLayouts)
app.set('view engine', 'ejs')

// BodyParser
app.use(express.urlencoded({ extended: false }) )

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash())

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server Running On Port', PORT))