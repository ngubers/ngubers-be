module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            full_name: String,
            email: String,
            password: String,
            address: String
        },
        {timestamps: true}
    )

    schema.method("toJson", function() {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("users", schema)
    return User
}