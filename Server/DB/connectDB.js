const mongoose = require("mongoose")

const connectDB = async (URL) => {
    try {
        const connect = await mongoose.connect(URL)
        console.log(`Database Connected : ${connect.connection.host} ${connect.connection.name}`)
    } catch (error) {
        console.log(`Database Connection Error : ${error}`)
    }
}

module.exports = connectDB