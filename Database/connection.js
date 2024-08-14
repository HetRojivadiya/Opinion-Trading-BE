const mongoose = require('mongoose');

const connectDB = (uri) =>{
    mongoose.connect(uri)
    .then(()=>console.log("Database Connected"))
    .catch((err)=>console.log("Error while connecting with Database : ",err));
}

module.exports = connectDB;