const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const AuthController =  require('./AuthController');
const OrderItem =  require('../models/orderModel')
const Factory = require('../controllers/factoryController');



const sendResponse = (data, statusCode,res, msg) =>{
    res.status(statusCode).json({
        status : "success",
        message : msg,
        data : {
            data
        }
    })
}

exports.createOrderItem = catchAsync(async (req, res, next) => {
    if (!req.body.ordered_by) req.body.ordered_by = req.user.id;
    const order_item = await OrderItem.create(req.body);
  
    if (!order_item) {
      return next(new AppError("Failed to create order item", 400));
    }
  
  
    sendResponse(order_item, 201, res, "order item created successfully");
  });
  

exports.getAllOrders = Factory.getAll(OrderItem)

exports.getMyOrders = Factory.getMyOrders(OrderItem) ;

exports.getSentOrders = Factory.getSentOrders(OrderItem);


exports.deleteOrderItem = catchAsync(async  (req,res, next) => {
    const order_item = await OrderItem.findByIdAndDelete(req.params.id);
    
    if(!order_item){
        return next(new AppError('No document found with that ID', 404))
    }

    sendResponse(order_item, 204, res, "order item deleted succesfully")
})

exports.deleteOrderItems =   catchAsync ( async  (req,res, next) =>  {
    const order_items =  await   OrderItem.deleteMany({});

    if(!order_items) {
        return next(new AppError("No document found with that ID", 404))
    }

    sendResponse(order_items, 203, res, "order items deleted succesfully")
})



exports.updateOrderStatus = catchAsync( async (req,res,next) => {
        const current_order =  await OrderItem.findByIdAndUpdate(req.params.id, {
            order_status : req.body.order_status
        },
        {
            new : true,
            runValidators : true
        }
        )

        if(!current_order){
            return next(new AppError("No data found with that ID", 404))
        }
    
        sendResponse(current_order, 201, res, "Order status updated succesfully")
})