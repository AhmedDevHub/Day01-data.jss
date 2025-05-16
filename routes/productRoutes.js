const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.get('/search', productController.searchProducts);


router.post('/addProduct', productController.addProduct);

router.put('/replaceProduct/:id', productController.replaceProduct);

router.patch('/updateProduct/:id', productController.updateProduct);

router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router; 