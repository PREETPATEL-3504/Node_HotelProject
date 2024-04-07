const mongoose = require('mongoose');

//Create a schema
const menuschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price:{
        type: Number
    },
    taste: {
        type: String,
        require: true
    }
})

//Create a model of person

const menu = mongoose.model('menu', menuschema);

module.exports = menu;


