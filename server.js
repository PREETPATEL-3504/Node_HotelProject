const express = require('express')
const app = express()
const db = require('./db')
const person = require('./Models/Person')
const menu = require('./Models/Menu')
const bodyParser = require('body-parser')
app.use(bodyParser.json())




const personRoutes = require('./routes/personroutes');
app.use('/person', personRoutes);


const menuRoutes = require('./routes/menuroutes');
app.use('/menu', menuRoutes);

app.listen(3000)