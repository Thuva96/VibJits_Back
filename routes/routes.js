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



module.exports = router;