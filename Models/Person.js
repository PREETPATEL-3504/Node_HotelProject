const mongoose = require('mongoose');


//Create a schema
const personschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age:{
        type: Number
    },
    work: {
        type: String,
        enuf: ['chef','waiter','manager'],
        require: true
    },
    mobile: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    salary: {
        type: Number,
        require: true
    }
})


//Create a model of person

const person = mongoose.model('person', personschema);

module.exports = person;

