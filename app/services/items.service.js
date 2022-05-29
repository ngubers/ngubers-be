const itemsRepository = require('../repositories/items.repository')

module.exports = {
    async list() {
        try {
            const user = await itemsRepository.findAll()

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
            const items = await itemsRepository.create(args)
            return items.save()
        }
        catch(error) {
            console.log(error)
        }
    }
}