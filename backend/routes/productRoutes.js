import express from "express";

import Product from "../models/Product.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();






router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const products =
        await Product.find({

          user:
            req.user._id,

        });






      res.json(products);

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
        name,
        price,
        stock,
      } = req.body;






      const product =
        await Product.create({

          user:
            req.user._id,

          name,

          price,

          stock,

        });






      res.json(product);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);






router.put(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const product =
        await Product.findOne({

          _id:
            req.params.id,

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






      product.name =
        req.body.name;

      product.price =
        req.body.price;

      product.stock =
        req.body.stock;






      const updated =
        await product.save();






      res.json(updated);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);






router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const product =
        await Product.findOne({

          _id:
            req.params.id,

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






      await product.deleteOne();






      res.json({
        message:
          "Product deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);

export default router;