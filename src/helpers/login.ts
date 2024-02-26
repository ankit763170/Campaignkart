import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique :  true,
    },
    email :{
        type   :String ,
        required :[true,"Please provide an Email address"],
        unique  : [true,'Email already in use']
    },
    password:{
        type :  String,
        required : [true, 'Password is required'],
    },
    isVerified:{
        type: Boolean,
        default :false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry  : Date,
    verifyToken :  String,
    verifyTokenExpiry  :Date,
})
const User = mongoose.models.users || mongoose.model("users", userSchema);
module.exports=User;
