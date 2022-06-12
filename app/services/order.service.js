const userRepository = require('../repositories/user.respository')
const orderRepository = require('../repositories/order.repository')

async function findIdUser(id) {
    const users = await userRepository.findById(id)

    return {
        user: {
            id: users.id,
            full_name: users.full_name,
        }
    }

}

module.exports = {
    async list() {
        try {
            let orders = await orderRepository.findAll()

            orders = orders.map(arr => ({
                ...orders,
                user: findIdUser(orders.userId)
            }))

            return {
                data: orders
            }
        }
        catch(error) {
            console.log(error)
        }
    },

    async create(args) {
        try {
            const order = await orderRepository.create(args)
            return order.save()
        }
        catch(error) {
            console.log(error)
        }
    },

    async find(id) {
        try {
            const order = await orderRepository.findById(id)
            return order
        } catch(error) {
            console.log(error)
        }
    },

    async update(id, args) {
        try {
            const order = await orderRepository.update(id, args)
            return order
        } catch(error) {
            console.log(error)
        }
    }
}