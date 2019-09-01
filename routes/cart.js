const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/show', async (req, res) => {
  const products = await Cart.find({}).exec()
  let sum = 0;
  products.map(item => sum += item.price)
  res.render('showcart', { title: 'Shopping cart', products, sum });
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const newCart = new Cart({
    title: product.title,
    description: product.description,
    price: product.price
  });
  await newCart.save();
  return res.redirect('/');
});
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id)
  return  res.redirect('/cart/show');
});

module.exports = router;
