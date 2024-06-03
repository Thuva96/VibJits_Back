var express = require('express');

const router = express.Router();

// Admin route

var adminController = require('../src/admin/adminController');

router.route('/admin/getAll').get(adminController.getDataControllerfn);

router.route('/admin/create').post(adminController.createAdminControllerFn);

router.route('/admin/update/:id').patch(adminController.updateAdminController);

router.route('/admin/delete/:id').delete(adminController.deleteAdminController);

router.route('/admin/get/:id').get(adminController.findAdminController);

router.route('/admin/login').post(adminController.loginControllerFn);


// Product route

var productController = require('../src/products/productController');

router.route('/product/getAll').get(productController.getDataControllerfn);

router.route('/product/create').post(productController.createProductControllerFn);

router.route('/product/update/:id').patch(productController.updateProductController);

router.route('/product/delete/:id').delete(productController.deleteProductController);

router.route('/product/get/:id').get(productController.findProductController);


module.exports = router;