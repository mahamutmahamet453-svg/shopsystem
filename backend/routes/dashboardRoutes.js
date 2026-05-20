import express from "express";

import Product from "../models/Product.js";

import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const totalProducts =
      await Product.countDocuments();






    const sales =
      await Sale.find();






    const totalSales =
      sales.length;






    const totalRevenue =
      sales.reduce(

        (acc, sale) =>
          acc + sale.total,

        0
      );






    const lowStock =
      await Product.find({

        stock: {
          $lte: 5,
        },

      });






    res.json({

      totalProducts,

      totalSales,

      totalRevenue,

      lowStockCount:
        lowStock.length,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

export default router;