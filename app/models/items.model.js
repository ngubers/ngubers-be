module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            item_name: String,
            price: Number,
            weight: Number,
            starting_location: String,
            destination: String
        },
        {timestamps: true}
    )

    schema.method("toJson", function() {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Items = mongoose.model("items", schema)
    return Items
}