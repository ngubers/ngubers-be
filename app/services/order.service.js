const userRepository = require('../repositories/user.respository')
const orderRepository = require('../repositories/order.repository')

async function findIdUser(id) {
    const users = await userRepository.findById(id)
    return {
        id: users.id,
        full_name: users.full_name,
    }

}

module.exports = {
    async list() {
        try {
            let orders = await orderRepository.findAll()

            orders = await Promise.all(orders.map(async (arr) => {
                const user = await findIdUser(arr.userId)
                return {
                    id: arr.id,
                    service: arr.service,
                    from: arr.from,
                    destination: arr.destination,
                    driver: arr.driverId,
                    price: arr.price,
                    date: arr.date,
                    description: arr.description,
                    status: arr.status,
                    user,
                }
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
    },

    async delete(id) {
        try {
            const order = await orderRepository.delete(id)
            return order
        } catch(error) {
            console.log(error)
        }
    }
}