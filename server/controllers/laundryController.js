const catchAsync =   require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const  multer  = require('multer');

const Laundry =  require('../models/laundryModel');
const Factory =   require('../controllers/factoryController');


const sendResponse = (statusCode, data,res,message) => {
    res.status(statusCode).json({
        status : 'success',
        message : message,
        data : data
    })
}

const  multerStorage =  multer.diskStorage({
    destination :  (req,file,cb) => {
        cb(null,'./uploads/posts')
    },
    filename : (req,file,cb) => {
        console.log(file)
        const ext =  file.mimetype.split('/')[1];
        const rand =  Math.floor(Math.random() * 1E9);
        cb(null, `product-${rand}-${Date.now()}.${ext}`)
    }
})

const multerFilter =  (req,file, cb) =>  {
    console.log(file)
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new AppError('The  file  you  uploaded is not supported', 400))
    }
}

const  upload =  multer({
    storage : multerStorage,
    fileFilter : multerFilter
})

exports.uploadPost  =  upload.single('photo');

exports.registerLaundry = catchAsync(async (req,res,next) => {
    if(!req.body.owner) req.body.owner = req.user.id
    const new_laundry  = await Laundry.create(req.body);

    if(!new_laundry){
        return next(new AppError('Failed to register new laundry', 400))
    }

    sendResponse(201, new_laundry, res, 'New laundry registered succesfully');
})

exports.getAllLaundry = Factory.getAll(Laundry);

exports.updateLaundry = Factory.updateOne(Laundry);

exports.getLaundryById =Factory.getOne(Laundry);

exports.deleteLaundry =  Factory.deleteModel(Laundry);

exports.getCategoryLaundry =  catchAsync(  async (req,res,next) => {
    const laundry  =   await Laundry.find({category : req.params.id});

    if(!laundry){
        return next(new  AppError('No dota found with that  ID', 404));
    }

    res.status(200).json({
        status  :  'success',
        results : laundry.legth,
        data :  {
            laundry
        }
    })
} )