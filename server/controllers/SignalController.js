const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Signal =  require('../models/signalModel');


exports.createSignal = catchAsync ( async (req,res,next) => {
    const  new_signal = await Signal.create(req.body);

    if(!new_signal){
        return next( new AppError("Failed to save new signal please try again",400))
    }

    res.status(201).json({
        status : "Success",
        message : "Signal saved succesfully",
        data : new_signal
    })
})

exports.readSignal = catchAsync (async (req,res, next) => {
    const signal = await Signal.find();

    if(!signal) {
        return next(new AppError("No signal found in this document", 404))
    }

    res.status(200).json({
        status : "success",
        message : "signal found succesfull",
        data : signal
    })
})

