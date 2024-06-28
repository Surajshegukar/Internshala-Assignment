const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Product = require('../models/Product');


router.post("/addproduct",[
    body("name", "Enter the vaild Name").isLength({ min: 3 }),
    body("price", "Enter the valid Price").isNumeric(),
    body("category", "Enter the valid Category").isLength({ min: 3 }),
    body('code','Enter the valid HSN Code').isLength({min:3}),
    body('cgst','Enter the valid GST').isNumeric(),
    body('sgst','Enter the valid GST').isNumeric(),
    body('shippingCharges','Enter the valid Shipping Charges').isNumeric(),

  ], async (req, res) => {
    try {
      const {name,price,category,code,cgst,sgst,shippingCharges} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product({
        name,
        price,
        category,
        code,
        cgst,
        sgst,
        shippingCharges,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);

router.get('/getproducts',async(req,res)=>{
    try{
        
        const products = await Product.find();
        res.json(products);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/updateproduct/:id',async(req,res)=>{
    try{
        
        let product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        product = await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json(product);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

router.delete('/deleteproduct/:id',async(req,res)=>{
    try{
        
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({msg:"Product deleted"});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

module.exports = router;