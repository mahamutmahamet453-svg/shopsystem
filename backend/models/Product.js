import mongoose from "mongoose";

const productSchema =
  mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      name: {

        type: String,

        required: true,

      },

      price: {

        type: Number,

        required: true,

      },

      stock: {

        type: Number,

        required: true,

      },

    },

    {

      timestamps: true,

    }

  );

const Product =
  mongoose.model(
    "Product",
    productSchema
  );

export default Product;