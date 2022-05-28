const db = require('../models')

const Items = db.items

module.exports = {
    findById(id) {
        return Items.findById(id)
    },
    // bikin orderan berarti create barang kan ya??
    create(args) {
        return new Items(args)
    }
}