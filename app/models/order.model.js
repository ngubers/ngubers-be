module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            userId:
                {type: mongoose.Schema.Types.ObjectId,ref:'users'},
            service:{
                type: String,
                required: true
            },
            from:{
                type: String,
                required: true
            },
            destination:{
                type: String,
                required: true
            },
            driverId:{
                type: String,
            },
            price:{
                type: String,
                required: true
            },
            date:{
                type: String,
                required: true
            },
            description:{
                type: String,
                required: true
            },
            status:{
                type: String,
                required: true
            }
        },
        {timestamps: true}
    )

    schema.method("toJson", function() {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Order = mongoose.model("orders", schema)
    return Order
}