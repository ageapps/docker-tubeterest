module.exports = function(mongoose) {
    const userSchema = mongoose.Schema({
        name: String,
        favorites: [String]
    }, {
        timestamps: true
    });
    return userSchema;
}
