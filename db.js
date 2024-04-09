const mongoose = require('mongoose');
require('dotenv').config()
// const mongoURL = 'mongodb://localhost:27017/hotels'

const mongoURL = 'mongodb+srv://preetpatel3504:preet3504@nodehotelcluster.nvjckqh.mongodb.net/'

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to mongodb server');
})


db.on('disconnected', ()=>{
    console.log('Mongodb server disconnected');
})


db.on('error', (err)=>{
    console.log('Connection Error');
})

module.exports = db;