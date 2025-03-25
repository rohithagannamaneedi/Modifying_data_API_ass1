const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    decription:{
        type:String

    },
    price:{
        type:Number,
        required:true

    }

})
const user = mongoose.model("menu",schema);
module.exports =user;