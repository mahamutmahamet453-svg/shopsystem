import mongoose from "mongoose";

const saleSchema =
  mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      productName: {

        type: String,

        required: true,

      },

      quantity: {

        type: Number,

        required: true,

      },

      total: {

        type: Number,

        required: true,

      },

    },

    {

      timestamps: true,

    }

  );

const Sale =
  mongoose.model(
    "Sale",
    saleSchema
  );

export default Sale;