// server.js v4 – Futuristic Shop System
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ===== CONNECT MONGODB =====
mongoose.connect("mongodb+srv://shopAdmin:shop1234@cluster0.mutuaki.mongodb.net/shopsystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ===== MODELS =====
const Shop = mongoose.model("Shop", new mongoose.Schema({
  username:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  name:String
}));

const Product = mongoose.model("Product", new mongoose.Schema({
  shopId:String,
  name:String,
  price:Number,
  stock:Number,
  createdAt:{type:Date, default:Date.now}
}));

const Sale = mongoose.model("Sale", new mongoose.Schema({
  shopId:String,
  productId:String,
  name:String,
  quantity:Number,
  totalPrice:Number,
  dayn:Number,
  createdAt:{type:Date, default:Date.now}
}));

// ===== CREATE DEFAULT SHOP =====
const createDefaultShop = async ()=>{
  const existing = await Shop.findOne({username:"admin"});
  if(!existing){
    const hash = await bcrypt.hash("1234",10);
    const shop = new Shop({username:"admin", password:hash, name:"Default Shop"});
    await shop.save();
    console.log("Default shop created: username=admin, password=1234");
  }
};
createDefaultShop();

// ===== AUTH ROUTES =====
app.post("/register", async (req,res)=>{
  const {username,password,name} = req.body;
  try{
    const hash = await bcrypt.hash(password,10);
    const shop = new Shop({username,password:hash,name});
    await shop.save();
    res.json({success:true});
  }catch(err){
    res.json({success:false, message:err.message});
  }
});

app.post("/login", async (req,res)=>{
  const {username,password} = req.body;
  const shop = await Shop.findOne({username});
  if(!shop) return res.json({success:false,message:"User not found"});
  const isMatch = await bcrypt.compare(password,shop.password);
  if(isMatch) res.json({success:true, shopId:shop._id, name:shop.name});
  else res.json({success:false,message:"Wrong password"});
});

// ===== PRODUCTS ROUTES =====
app.get("/products/:shopId", async (req,res)=>{
  const products = await Product.find({shopId:req.params.shopId});
  res.json(products);
});

app.post("/products/:shopId", async (req,res)=>{
  const {name,price,stock} = req.body;
  if(!name || !price || !stock) return res.json({success:false,message:"Incomplete data"});
  const p = new Product({shopId:req.params.shopId,name,price,stock});
  await p.save();
  res.json({success:true,p});
});

app.delete("/products/:shopId/:id", async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({success:true,message:"Product deleted"});
});

// ===== SALES ROUTES =====
app.get("/sales/:shopId", async (req,res)=>{
  const sales = await Sale.find({shopId:req.params.shopId});
  res.json(sales);
});

app.post("/sales/:shopId", async (req,res)=>{
  const {productId,name,quantity,totalPrice,dayn} = req.body;
  if(!productId || !quantity || !totalPrice) return res.json({success:false,message:"Incomplete sale data"});
  const sale = new Sale({shopId:req.params.shopId,productId,name,quantity,totalPrice,dayn});
  await sale.save();

  // Update product stock
  const product = await Product.findById(productId);
  if(product){
    product.stock -= quantity;
    await product.save();
  }

  res.json({success:true,sale});
});

// ===== TOTALS & ALERTS =====
app.get("/totals/:shopId", async (req,res)=>{
  const sales = await Sale.find({shopId:req.params.shopId});
  let totalSales=0,totalDayn=0;
  sales.forEach(s=>{
    totalSales+=s.totalPrice;
    totalDayn+=s.dayn;
  });
  // Low stock alerts
  const products = await Product.find({shopId:req.params.shopId});
  const lowStock = products.filter(p=>p.stock<=5);
  res.json({totalSales,totalDayn,lowStock});
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));