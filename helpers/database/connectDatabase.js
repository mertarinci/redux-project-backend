const mongoose = require("mongoose");

const connectDatabase = () => {

    mongoose.connect(process.env.MONGODB_SECRET)
    .then(() => {console.log("MongoDB Connection Successful.")})
    .catch(err => console.log(err))

}


module.exports = connectDatabase;