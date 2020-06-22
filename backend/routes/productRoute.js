import express from 'express';
import Product from '../models/productModel';
import {getToken, isAuth, isAdmin} from '../util'; 

const router = express.Router();

router.get("/", async (req,res) => {
  const products = await Product.find({});
  res.send(products);
})

router.get("/:id", async (req,res) => {
  const product = await Product.findOne({_id: req.params.id});
  if(product)
    res.send(product);
  else
    res.status(404).send({msg: "Product Not Found"});
})

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    countInStock: req.body.countInStock,
  });
  const newProduct = await product.save();
  if(newProduct){
    return res.status(201).send({msg: 'New Product created', data: newProduct});
  }
  return res.status(500).send({msg: 'Error in Creating Product'});
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product){
    product.name = req.body.name;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.description = req.body.description;
    product.countInStock = req.body.countInStock;
      
    const updateProduct = await product.save();
    if(updateProduct){
      return res.status(200).send({msg: 'Product Updated', data: updateProduct});
    }
    return res.status(500).send({msg: 'Error in Updating Product'});
  }
  return res.status(404).send({msg: 'Product not found'}); 
});


router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product){
    await product.remove();
    return res.status(200).send({msg: 'Product successfully delete'});
  }
  return res.status(404).send({msg: 'Product not found: Delete failed'}); 
});

export default router;