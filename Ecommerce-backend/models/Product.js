import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {

    photo: {
      type: String,
      required: true,
    },
    Productname: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      size:{
        type:Number,
        required: true
       
    },

    quantity: {
        type: Number,
        required: true,
      },

    description: {
      type: String,
      required: true,
    },
    
    stock:{
        type:Number,
        required: true
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);