const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');
const {body,validationResult} = require('express-validator');



router.post('/addseller',
    [body('name','Name is required').notEmpty(),
    body('mobile','Mobile is required').notEmpty(),
    body('mobile','Mobile should be a number').isNumeric(),
    body('mobile','Mobile should be of 10 digits').isLength({min:10,max:10}),
    body('email','Email is required').notEmpty(),
    body('email','Email is not valid').isEmail(),
    body('address','Address is required').notEmpty(),
    body('panNo','Pan No is required').notEmpty(),
    body('gstNo','GST No is required').notEmpty()],
    
    async(req,res)=>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        try{
            const {name,mobile,email,address,panNo,gstNo} = req.body;
            
            const seller = new Seller({name,mobile,email,address,panNo,gstNo});
            await seller.save();
            res.json(seller);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

router.get('/getsellers',async(req,res)=>{
    
    try{
        
        const sellers = await Seller.find();
        res.json(sellers);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
)

router.get('/getseller/:id',async(req,res)=>{
    try{
        const seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        res.json(seller);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/updateseller/:id',async(req,res)=>{
    try{
        const {name,mobile,email,address,panNo,gstNo} = req.body;
        const sellerFields = {};
        if(name) sellerFields.name = name;
        if(mobile) sellerFields.mobile = mobile;
        if(email) sellerFields.email = email;
        if(address) sellerFields.address = address;
        if(panNo) sellerFields.panNo = panNo;
        if(gstNo) sellerFields.gstNo = gstNo;
        let seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        seller = await Seller.findByIdAndUpdate(req.params.id,{$set:sellerFields},{new:true});
        res.json(seller);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/deleteseller/:id',async(req,res)=>{
    try{
        let seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        
        await Seller.findByIdAndDelete(req.params.id);
        res.json({msg:'Seller removed'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;


