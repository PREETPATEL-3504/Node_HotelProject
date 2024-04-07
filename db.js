const mongoose = require('mongoose');
require('dotenv').config()
// const mongoURL = 'mongodb://localhost:27017/hotels'

const mongoURL = process.env.DB_URL

mongoose.connect(mongoURL, {
    useNewurlParser: true,
    useUnifiedTopology: true
})

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