const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    categories:{
        type:Array,
        require:true,
    },
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Post", PostSchema)