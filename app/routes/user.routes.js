module.exports = (app) => {
    const users = require('../controllers/user.controller')
    const router = require('express').Router()

    router.get('/', users.list)
    router.post('/', users.create)

    app.use('/api/users', router)
}