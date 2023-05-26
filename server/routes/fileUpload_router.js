const express  =  require('express');

const router =  express.Router();

const FileController  =  require('../controllers/fileController');
const SignalController  = require('../controllers/SignalController');

router.post('/upload_photo', FileController.uploadImage);
router.post('/new_signal', SignalController.createSignal);
router.get('/read_signal', SignalController.readSignal);

module.exports =  router;