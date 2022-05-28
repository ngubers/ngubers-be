const itemsService = require('../services/items.service')

//kukomen lagi gara2 belom tau apa ga kepakenya
// exports.list = async (req, res) => {
//     try {
//         const response = await itemsService.list()
//         const {data} = response

//         res.json({
//             status: "OK",
//             data
//         })
//     } catch(error) {
//         res.status(400).json({
//             status: "FAIL",
//             message: error.message
//         })
//     }
// }

exports.create = async (req, res) => {
    try {
        const user = userService.create({
            item_name: req.body.item_name,
            price: req.body.price,
            weight: req.body.weight,
            starting_location: req.body.starting_location,
            destination : req.body.destination
        })
        res.send(user)
    }
    catch(error) {
        res.status(409).send({
            message: error.message || "Some error while making an order"
        })
    }
}