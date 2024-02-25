import mongoose from "mongoose"

const UserSchema = new mongoose.Schema ({

     name:{
        type:String,
        required:true,
        trim:true

     },
     email:{
        type:String,
        required:true,
        unique:true
     },

     password:{
        type:String,
        required:true,
     },

     mobilenumber:{
        type:String,
        required:true

     },
     role: {
      type: Number,
      default: 0,
    },
    
},{timestamps:true})

export default mongoose.model("Users",UserSchema)