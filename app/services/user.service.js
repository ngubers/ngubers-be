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
            return user
        }
        catch(error) {
            console.log(error)
        }
    }
}