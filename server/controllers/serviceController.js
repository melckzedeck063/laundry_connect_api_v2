const catchAsync =   require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Factory =  require('../controllers/factoryController');
const Service =  require('../models/serviceModel');

exports.createService = Factory.createOne(Service);

exports.getAllServices = Factory.getAll(Service);

exports.getService =  Factory.getOne(Service);

exports.updateService = Factory.updateOne(Service);

exports.deleteService = Factory.deleteModel(Service);

exports.deactivateService = Factory.deactivateOne(Service);

exports.getLaundryServices = catchAsync (async  (req,res,next)  => {
    const services =  await Service.find({laundry  : req.params.id});

    if(!services){
        return next( new AppError('No data found with that ID', 404))
    }

    res.status(200).json({
        status : 'success',
        results : services.length,
        message : 'Laundry  services found',
        data : {
            services
        }
    })
})
