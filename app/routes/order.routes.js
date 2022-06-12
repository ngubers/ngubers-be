module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()

    router.get('/', auth.authorize, order.list)
    router.post('/', auth.authorize, order.create)
    router.put('/:id', auth.authorize, order.update)

    app.use('/api/order', router)
}