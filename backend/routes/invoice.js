const express = require('express')
const router = express.Router();
const Invoice = require('../models/Invoice');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the invoices using: GET "/api/invoice/getallinvoices". Login required
router.get('/getallinvoices',  async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new invoice using: POST "/api/invoice/addinvoice". Login required
router.post('/addinvoice',  [
    body('invoiceNo', 'Enter a valid invoice number').isNumeric(),
    body('customerName', 'Enter a valid date').isLength({ min: 3 }),
    body('customerAddress', 'Enter a valid address').isLength({ min: 3 }),
    body('customerMobile', 'Enter a valid mobile number').isLength({ min: 10 }),
    body('customerEmail', 'Enter a valid email').isEmail(),
    body('sellerName', 'Enter a valid seller name').isLength({ min: 3 }),
    body('sellerAddress', 'Enter a valid address').isLength({ min: 3 }),
    body('sellerMobile', 'Enter a valid mobile number').isLength({ min: 10 }),
    body('sellerEmail', 'Enter a valid email').isEmail(),
    body('sellerPanNo', 'Enter a valid PAN number').isLength({ min: 10 }),
    // body('sellerGstNo', 'Enter a valid GST number').isLength({ min: 15 }),
    // body('orderNo', 'Enter a valid order number').isEmpty(),
    body('items', 'Enter a valid items').isArray(),
    body('orderDate', 'Enter a valid order date').isDate(),
    body('invoiceDate', 'Enter a valid date').isDate(),
    body('status', 'Enter a valid status').isIn(['Pending', 'Paid', 'Cancelled'])
], async (req, res) => {
    try {
        const { invoiceNo,customerEmail,invoiceDate, customerName, customerAddress, customerMobile, items, orderDate,orderNo, status,
        sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo, sellerGstNo,shipping,shippingName,shippingAddress
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const invoice = new Invoice({
            invoiceNo, customerEmail,invoiceDate, customerName, customerAddress, customerMobile, items, orderDate,orderNo,status,sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo, sellerGstNo ,shipping,shippingName,shippingAddress
        });
        const savedInvoice = await invoice.save();
        res.json(savedInvoice);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update an existing invoice using: PUT "/api/invoice/updateinvoice". Login required
router.put('/updateinvoice/:id', async (req, res) => {
    try {
        const { invoiceNo, invoiceDate, customerName, customerAddress, customerMobile, items, orderDate,orderNo, status } = req.body;
        const newInvoice = {};
        if (invoiceNo) { newInvoice.invoiceNo = invoiceNo; }
        if (invoiceDate) { newInvoice.invoiceDate = invoiceDate; }
        if (customerName) { newInvoice.customerName = customerName; }
        if (customerAddress) { newInvoice.customerAddress = customerAddress; }
        if (customerMobile) { newInvoice.customerMobile = customerMobile; }
        if (sellerName) { newInvoice.sellerName = sellerName; }
        if (sellerAddress) { newInvoice.sellerAddress = sellerAddress; }
        if (sellerMobile) { newInvoice.sellerMobile = sellerMobile; }
        if (sellerEmail) { newInvoice.sellerEmail = sellerEmail; }
        if (sellerPanNo) { newInvoice.sellerPanNo = sellerPanNo; }
        if (sellerGstNo) { newInvoice.sellerGstNo = sellerGstNo; }
        if (shippingName) { newInvoice.shippingName = shippingName; }
        if (shippingAddress) { newInvoice.shippingAddress = shippingAddress; }  
        if (items) { newInvoice.items = items; }
        if (shipping) { newInvoice.shipping = shipping; }
        if (orderDate) { newInvoice.orderDate = orderDate; }
        if (orderNo) { newInvoice.orderNo = orderNo; }
        if (status) { newInvoice.status = status; }
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) { return res.status(404).send("Not Found"); }
        if (invoice.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        invoice = await Invoice.findByIdAndUpdate(req.params.id, { $set: newInvoice }, { new: true });
        res.json({ invoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete an existing invoice using: DELETE "/api/invoice/deleteinvoice". Login required
router.delete('/deleteinvoice/:id',  async (req, res) => {
    try {
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) { return res.status(404).send("Not Found"); }
        
        invoice = await Invoice.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Invoice has been deleted", invoice: invoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;