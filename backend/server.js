import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import mongoose from "mongoose";

import productRoutes
from "./routes/productRoutes.js";

import saleRoutes
from "./routes/saleRoutes.js";

import authRoutes
from "./routes/authRoutes.js";

import dashboardRoutes
from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();






app.use(cors());

app.use(express.json());






mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((error) => {

  console.log(error);

});






app.get("/", (req, res) => {

  res.send(
    "API Running..."
  );

});






app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/sales",
  saleRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);






const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});