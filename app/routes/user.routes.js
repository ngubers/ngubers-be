module.exports = (app) => {
    const users = require('../controllers/user.controller')
    const router = require('express').Router()

    router.get('/', users.list)
    router.post('/', users.create)
    router.get('/:id', users.find)
    router.put('/:id', users.update)

    app.use('/api/users', router)
}