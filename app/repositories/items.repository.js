const db = require('../models')

const Items = db.items

module.exports = {
    findAll() {
        return Items.find()
    },
    findById(id) {
        return Items.findById(id)
    },
    // bikin orderan berarti create barang kan ya??
    create(args) {
        return new Items(args)
    }
}