const userRepository = require('../repositories/user.respository')

module.exports = {
    async list() {
        try {
            const user = await userRepository.findAll()

            return {
                data: user
            }
        }
        catch(error) {
            console.log(error)
        }
    },

    async create(args) {
        try {
            const user = await userRepository.create(args)
            return user.save()
        }
        catch(error) {
            console.log(error)
        }
    },

    async find(id) {
        try {
            const user = await userRepository.findById(id)
            return user
        } catch(error) {
            console.log(error)
        }
    },

    async findByEmail(email) {
        try {
            const user = await userRepository.findByEmail(email)
            return user
        }
        catch(error) {
            console.log(error)
        }
    },

    async update(id, args) {
        try {
            const user = await userRepository.update(id, args)
            return user
        } catch(error) {
            console.log(error)
        }
    }
}