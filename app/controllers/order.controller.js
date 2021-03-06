const moment = require('moment')
const orderService = require('../services/order.service')
// const userService = require('../services/user.service')

exports.list = async (req, res) => {
    try {
        const response = await orderService.list()
        const { data } = response

        res.json({
            status: "OK",
            message: "Data order berhasil ditemukan!",
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}

exports.create = async (req, res) => {
    // Date = "DD/MM/YYYY"
    const {
        userId,
        service,
        from,
        destination,
        driverId = "",
        price = 0,
        date = moment().format("DD/MM/YYYY"),
        description,
        status = "pending"
    } = req.body
    try {

        // const userExist = userService.find(userId)

        // if (!userExist) {
        //     res.statusCode = 400
        //     res.json({
        //         status: "FAIL",
        //         message: "User tidak ditemukan!"
        //     })
        // }

        const order = await orderService.create({
            userId,
            service,
            from,
            destination,
            driverId,
            price,
            date,
            description,
            status // pending, accept, or cancel
        })
        res.send({
            status: "OK",
            message: "Order Berhasil didaftarkan",
            data: order
        })
    }
    catch (error) {
        res.status(500).send({
            status: "FAIL",
            message: error.message || "Some error while making an order"
        })
    }
}

exports.update = async (req, res) => {
    const { driverId, status = "pending" } = req.body
    const { id } = req.params
    try {
        if (!driverId) {
            res.statusCode = 400
            res.json({
                status: "FAIL",
                message: "driver id harus diisi!"
            })

            return

        }

        await orderService.update(id, {
            driverId,
            status
        })

        res.json({
            status: "OK",
            message: "Order berhasil di update!",
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error while making an order"
        })
    }
}

exports.getByUser = async (req, res) => {
    try {
        const { id } = req.params

        const order = await orderService.findByUser(id)

        res.json({
            status: "OK",
            message: "Data order user berhasil ditemukan!",
            data: order
        })

    } catch (error) {
        res.statusCode = 500
        res.json({
            status: "FAIL",
            message: error.message
        })
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params
    try {
        await orderService.delete(id)
        res.json({
            status: "OK",
            message: "Order berhasil dihapus!",
        })
    } catch (error) {
        res.statusCode = 500
        res.json({
            status: "FAIL",
            message: error.message || "Some error while delete an order"
        })
    }
}
exports.find = async (req, res) => {
    try {
        const { id } = req.params
        const order = await orderService.find(id)

        if (!order) {
            throw Error('Data order tidak ditemukan')
        }

        res.json({
            message: "Data order ditemukan",
            data: order
        })

    } catch (error) {
        res.status(404).send({
            message: error.message
        })
    }
}