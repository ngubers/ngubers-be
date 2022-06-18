module.exports = (app) => {
    const order = require('../controllers/order.controller')
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()

    router.get('/', auth.authorize, order.list)
    router.post('/', auth.authorize, order.create)
    router.get('/user/:id', auth.authorize, order.getByUser)
    router.get('/:id', auth.authorize, order.find)
    router.put('/:id', auth.authorize, order.update)
    router.delete('/:id', auth.authorize, order.delete)

    app.use('/api/order', router)
}