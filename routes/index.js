const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
    const products = await Product.find({}).exec(); 
    const carts = await Cart.find({}).exec()
    return res.render('index.ejs', { title : "Shop", products, carts });
});


module.exports = router;