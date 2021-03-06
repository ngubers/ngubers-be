const db = require('../models')

const Order = db.orders

module.exports = {
    findAll(query = {}) {
        return Order.find(query)
    },
    findById(id) {
        return Order.findById(id)
    },
    create(args) {
        return new Order(args)
    },
    update(id, args) {
        return Order.findByIdAndUpdate(id, args)
    },
    delete(id) {
        return Order.findByIdAndRemove(id)
    }
}