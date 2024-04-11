const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//Create a schema
const personschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enuf: ['chef', 'waiter', 'manager'],
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
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

personschema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hasepassword = await bcrypt.hash(person.password, salt);
        person.password = hasepassword;
        next();
    } catch (err) {
        return next(err);
    }
})

personschema.methods.comparepassword = async function (candidatePassword) {
    try {
        const ismatch = await bcrypt.compare(candidatePassword, this.password);
        return ismatch
    } catch (error) {
        console.log("Error")
    }
}

//Create a model of person

const person = mongoose.model('person', personschema);

module.exports = person;

