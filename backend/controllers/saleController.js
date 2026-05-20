import Sale from "../models/Sale.js";
import Product from "../models/Product.js";


// CREATE SALE
export const createSale = async (req, res) => {
  try {

    const { products } = req.body;

    let totalPrice = 0;

    for (const item of products) {

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} out of stock`,
        });
      }

      totalPrice += product.price * item.quantity;

      product.stock -= item.quantity;

      await product.save();
    }

    const saleProducts = [];

    for (const item of products) {

      const product = await Product.findById(item.productId);

      saleProducts.push({
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const sale = await Sale.create({
      products: saleProducts,
      totalPrice,
    });

    res.status(201).json(sale);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SALES
export const getSales = async (req, res) => {
  try {

    const sales = await Sale.find().sort({ createdAt: -1 });

    res.json(sales);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};