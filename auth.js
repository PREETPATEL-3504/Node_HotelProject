
const passport = require('passport')
const Localstrategy = require('passport-local').Strategy;
const Person = require('../Node_Tutorial/Models/Person')

passport.use(new Localstrategy(async (USERNAME, password, done) => {
    try {
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: "User not found" })
        }
        const ispassword = await user.comparepassword(password);
        if (ispassword) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Wrong Password" })
        }
    } catch (error) {
        return done(ERR)
    }
}))

module.exports = passport;