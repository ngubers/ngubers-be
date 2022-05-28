const userService = require('../services/user.service')

exports.list = async (req, res) => {
    try {
        const response = await userService.list()
        const {data} = response

        res.json({
            status: "OK",
            data
        })
    } catch(error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}

exports.create = async (req, res) => {
    try {
        const user = userService.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        })
        res.send(user)
    }
    catch(error) {
        res.status(409).send({
            message: error.message || "Some error while create users."
        })
    }
}