module.exports = (app) => {
    const items = require('../controllers/items.controller')
    const router = require('express').Router()

    //router.get('/', users.list)
    router.post('/', items.create)

    app.use('/api/items', router)
}