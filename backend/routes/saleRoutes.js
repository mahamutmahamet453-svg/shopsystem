import express from "express";

import Sale from "../models/Sale.js";

import Product from "../models/Product.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();






router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const sales =
        await Sale.find({

          user:
            req.user._id,

        }).sort({
          createdAt: -1,
        });






      res.json(sales);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);






router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      const {
        productId,
        quantity,
      } = req.body;






      const product =
        await Product.findOne({

          _id:
            productId,

          user:
            req.user._id,

        });






      if (!product) {

        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });

      }






      if (
        product.stock <
        quantity
      ) {

        return res
          .status(400)
          .json({
            message:
              "Not enough stock",
          });

      }






      product.stock -=
        quantity;






      await product.save();






      const total =
        product.price *
        quantity;






      const sale =
        await Sale.create({

          user:
            req.user._id,

          productName:
            product.name,

          quantity,

          total,

        });






      res.json(sale);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);

export default router;