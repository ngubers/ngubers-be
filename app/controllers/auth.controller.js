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

function validateEmail(email) {
    return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Ngubers")
}

exports.register = async (req, res) => {
    const {full_name, email, password, repassword, phone_number, address} = req.body
    try {

        if (full_name === "" || email === "" || 
            password === "" || repassword === "") {
            res.statusCode = 400
            res.json({
                status: false,
                message: "Email, Nama Lengkap, Nomor Hp, Password dan Repassword harus diisi"
            })

            return
        }

        if (!validateEmail(email)) {
            res.statusCode = 400
            res.json({
                status: false,
                message: "Email yang dimasukkan tidak valid"
            })

            return
        }

        const emailExist = await userService.findByEmail(email)

        if (emailExist) {
            res.statusCode = 400
            res.json({
                status: false,
                message: "Email sudah digunakan sebelumnya"
            })

            return
        }

        if (password !== repassword) {
            res.statusCode = 400
            res.json({
                status: false,
                message: "Password tidak sama"
            })

            return
        }

        const encryptedPassword = await encryptPassword(password)
        const user = await userService.create({
            full_name: full_name,
            email: email,
            password: encryptedPassword,
            phone_number: phone_number,
            address: address
        })
        res.statusCode = 201
        res.json({
            status: true,
            message: "User berhasil dibuat",
            data: user
        })
    }
    catch(error) {
        res.statusCode = 500
        res.json({
            status: false,
            message: error.message || "Some error while create users."
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userService.findByEmail(email)
        if (!user) {
            res.statusCode = 404
            res.json({
                status: false,
                message: "Email tidak ditemukan"
            })

            return
        }

        const isPasswordCorrect = await checkPassword(
            user.password,
            password
        )

        if (!isPasswordCorrect) {
            res.statusCode = 404
            res.json({
                status: false,
                message: "Password salah!"
            })

            return
        }

        const token = createToken({
            id: user.id,
            email: user.email,
        })
        res.statusCode = 200
        res.json({
            status: true,
            message: "Berhasil login",
            token
        })

    } catch(error) {
        console.log(error)
        res.statusCode = 500
        res.json({
            status: false,
            message: "Terjadi kesalahan di server"
        })
    }
}

exports.authorize = async (req, res, next) => {
    try {
        if (req.headers.key) {
            next()
        } else {
            const bearerToken = req.headers.authorization
            const token = bearerToken.split("Bearer ")[1]
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || "Ngubers"
            )
            req.user = await userService.find(tokenPayload.id)
            next()
        }
    }
    catch(error) {
        console.log(error)
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
