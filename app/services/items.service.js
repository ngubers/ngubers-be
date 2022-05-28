const itemsRepository = require('../repositories/items.respository')

module.exports = {
    //Ini ku komen gara gara gamungkin dong user lain bisa ngedapetin semua data barang? apa salah aku?
    // async list() {
    //     try {
    //         const user = await userRepository.findAll()

    //         return {
    //             data: user
    //         }
    //     }
    //     catch(error) {
    //         console.log(error)
    //     }
    // },

    async create(args) {
        try {
            const items = await itemsRepository.create(args)
            return items
        }
        catch(error) {
            console.log(error)
        }
    }
}