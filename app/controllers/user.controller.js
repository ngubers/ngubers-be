const db = require('../models')

const User = db.users

exports.findAll = (req, res) => {
    User.find()
    .then((response) => {
        res.send(response)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Some error while retrieving users."
        })
    })
}

exports.create = (req, res) => {
    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    })

    user.save(user)
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.status(409).send({
            message: error.message || "Some error while create users."
        })
    })
}