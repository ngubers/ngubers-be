const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = 10

function encryptPassword(password) {
    return new Promise((resolve, rejected) => {
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (!!err) {
                rejected(err)
                return
            }

            resolve(encryptedPassword)
        })
    })
}

function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, rejected) => {
        bcrypt.compare(
            password,
            encryptedPassword,
            (err, isPasswordCorrect) => {
                if (!!err) {
                    rejected(err)
                    return
                }

                resolve(isPasswordCorrect)
            }
        )
    })
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Ngubers")
}

exports.register = async (req, res) => {
    const {full_name, email, password, address} = req.body
    try {
        const encryptedPassword = await encryptPassword(password)
        const user = await userService.create({
            full_name: full_name,
            email: email,
            password: encryptedPassword,
            address: address
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

exports.login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userService.findByEmail(email)
        if (!user) {
            throw Error('Email tidak ditemukan')
        }

        const isPasswordCorrect = await checkPassword(
            user.password,
            password
        )

        if (!isPasswordCorrect) {
            throw Error('Password salah!')
        }

        const token = createToken({
            id: user.id,
            email: user.email,
        })

        res.status(201).json({
            token
        })

    } catch(error) {
        console.log(error)
    }
}

exports.authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        const token = bearerToken.split("Bearer ")[1]
        const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SIGNATURE_KEY || "Ngubers"
        )
        req.user = await userService.find(tokenPayload.id)
        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
