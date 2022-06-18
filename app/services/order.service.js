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
        catch (error) {
            console.log(error)
        }
    },

    async create(args) {
        try {
            const order = await orderRepository.create(args)
            return order.save()
        }
        catch (error) {
            console.log(error)
        }
    },

    async find(id) {
        try {
            let order = await orderRepository.findById(id)

            const user = await findIdUser(order.userId)
            order = {
                id: order.id,
                service: order.service,
                from: order.from,
                destination: order.destination,
                driver: order.driverId,
                price: order.price,
                date: order.date,
                description: order.description,
                status: order.status,
                user,
            }

            return order
        } catch (error) {
            console.log(error)
        }
    },

    async findByUser(id) {
        try {
            let orders = await orderRepository.findAll({ userId: id })
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

            return orders
        } catch (error) {
            console.log(error)
        }
    },

    async update(id, args) {
        try {
            const order = await orderRepository.update(id, args)
            return order
        } catch (error) {
            console.log(error)
        }
    },

    async delete(id) {
        try {
            const order = await orderRepository.delete(id)
            return order
        } catch (error) {
            console.log(error)
        }
    }
}