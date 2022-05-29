const db = require('../models')

const User = db.users

module.exports = {
    findAll() {
        return User.find()
    },
    findById(id) {
        return User.findById(id)
    },
    create(args) {
        return new User(args)
    },
    update(id, args) {
        return User.findByIdAndUpdate(id, args)
    }
}