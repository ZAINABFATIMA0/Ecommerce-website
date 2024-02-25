import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        name: String,
        color: String,
        description: String,
        initialQuantity: Number,
        photo: String,
        price: Number,
        quantity: Number,
        size: Number,
        stock: Number,
      },
    ],
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order",orderSchema);