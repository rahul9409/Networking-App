const mongoose= require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    parent1:{
        type:String
    },
    parent2:{
        type:String,
    },
    parent3:{
        type:String
    },
    addedAmount:{
        type:Number
    },
    recievedAmount:{
        type:Number
    },
    password:{
        type:String,
        required:true,
    }
})
const User= mongoose.model('USER',userSchema);
module.exports=User;