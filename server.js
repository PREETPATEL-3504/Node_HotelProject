const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const port = process.env.PORT || 3000

app.get('/', function(req,res) {
    res.send('Welcome to Hotel')
})

const personRoutes = require('./routes/personroutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuroutes');
app.use('/menu', menuRoutes);


app.listen(port, ()=>{
    console.log(`Listing on ${port}`)
})