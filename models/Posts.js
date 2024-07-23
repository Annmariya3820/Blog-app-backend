const { default: mongoose } = require("mongoose")
const  Mongoose  = require("mongoose")

const postShema =Mongoose.Schema(

    {
        userId : {
            type: Mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        Message:String,
        postDate: {
            type: Date,
          
            default: Date.now
        }
    }
)
var postModel=mongoose.model("posts",postShema)
module.exports=postModel