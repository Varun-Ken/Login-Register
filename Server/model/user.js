const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required : [true, "Email should be provided"],
        unique : [true, "This Email ID is already registered"]
    },
    password : {
        type: String,
        required : [true, "Password should be provided"],
        minLength : 5
    }
},{
    timestamps : true
})

module.exports = mongoose.model("User",userSchema)