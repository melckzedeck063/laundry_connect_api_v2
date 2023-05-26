const express  =  require('express');

const router =  express.Router();

const AuthController =  require('../controllers/AuthController');
const CategoryController =  require('../controllers/categoryController');
const fileController =  require('../controllers/fileController')

router.use(AuthController.protect);

router.get('/categories', CategoryController.getAllCategories);
router.get('/category/:id', CategoryController.getCategoryById);

router.use(AuthController.restrictTo('admin'));

router.patch('/update_category/:id', CategoryController.updateCategory);
router.post('/new_category', fileController.uploadImage ,CategoryController.registeCategory);
router.delete('/delete_category/:id', CategoryController.deleteCategory);

module.exports = router;