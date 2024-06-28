const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchema = new Schema({
    customerName:{
        type:String,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    customerMobile:{
        type:Number,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    
    }
});

module.exports = mongoose.model('Customer',customerSchema);