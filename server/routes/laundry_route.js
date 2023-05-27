const express =  require('express');

const AuthController = require('../controllers/AuthController');
const LaundryController  =  require('../controllers/laundryController');
const fileController =  require('../controllers/fileController')


const router  =   express.Router();

router.use(AuthController.protect);

router.post('/new_laundry', fileController.uploadImage , LaundryController.registerLaundry);
router.get('/all_laundry', LaundryController.getAllLaundry);
router.get('/laundry/:id', LaundryController.getLaundryById);
router.get('/category_laundry/:id', LaundryController.getCategoryLaundry)

router.patch('/laundry/:id', LaundryController.updateLaundry)
router.delete('/delete/:id', LaundryController.deleteLaundry)

module.exports =  router;
