const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const passport = require('./auth')

app.use(passport.initialize());

const localauth = passport.authenticate('local', { session: false })

app.get('/',localauth, function (req, res) {
    res.send('Welcome to Hotel')
})

const personRoutes = require('./routes/personroutes');
app.use('/person',localauth, personRoutes);

const menuRoutes = require('./routes/menuroutes');
app.use('/menu',localauth, menuRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listing on ${port}`)
})