const { use } = require('express/lib/application')
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
        const user = await userService.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        })
        res.send({
            message: "User berhasil dibuat",
            data: user
        })
    }
    catch(error) {
        res.status(409).send({
            message: error.message || "Some error while create users."
        })
    }
}

exports.find = async (req, res) => {
    try{
        const {id} = req.params
        const user = await userService.find(id)
        
        if (!user) {
            throw Error('Data user tidak ditemukan')
        }

        res.json({
            message: "Data user ditemukan",
            data: user
        })

    } catch(error) {
        res.status(404).send({
            message: error.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        const {id} = req.params
        const {full_name, email, password, address} = req.body
        const user = await userService.update(id, {
            full_name,
            email,
            password,
            address
        })

        if (!user) {
            throw Error('User tidak ditemukan')
        }

        res.json({
            message: "Data user berhasil di update",
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}