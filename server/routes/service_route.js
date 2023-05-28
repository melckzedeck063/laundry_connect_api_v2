const express =  require('express');

const router =   express.Router();

const AuthController =  require('../controllers/AuthController');
const ServiceController =  require('../controllers/serviceController');


router.use(AuthController.protect);

router.post('/new_service', ServiceController.createService);

router.get('/services', ServiceController.getAllServices);

router.get('/laundry_services/:id', ServiceController.getLaundryServices);

router.get('/service/:id', ServiceController.getService);

router.patch('/update_service/:id', ServiceController.updateService);

router.patch('/deactivate_service/:id', ServiceController.deactivateService);

router.delete('/delete_service/:id', ServiceController.deleteService);


module.exports =   router;