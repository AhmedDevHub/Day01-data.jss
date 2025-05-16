const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getUserCart);

router.post('/addToCart/:userId/items', cartController.addToCart);

router.patch('/updateCartItem/:userId/items/:productId', cartController.updateCartItem);

router.delete('/removeCartItem/:userId/items/:productId', cartController.removeCartItem);

router.delete('/clearCart/:userId', cartController.clearCart);

module.exports = router; 