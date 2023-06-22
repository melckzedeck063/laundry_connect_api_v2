const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');
const { Expo } = require('expo-server-sdk');

const AuthController =  require('./AuthController');
const OrderItem = require('../models/orderModel');
const Product =  require('../models/productModel');
const Factory = require('../controllers/factoryController');

const expo = new Expo();


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
  
    // Retrieve the driver's Expo Push Token from your database
    const driverPushToken = driverPushToken(order_item.driver); // Replace with your own logic
  
    // Check if the driver has a valid Expo Push Token
    if (Expo.isExpoPushToken(driverPushToken)) {
      // Create the push notification message
      const message = {
        to: driverPushToken,
        sound: 'default',
        title: 'New Order',
        body: 'You have a new order to deal with.',
        data: { orderId: order_item._id }, // Include any necessary data
      };
  
      // Send the push notification
      expo.sendPushNotificationsAsync([message])
        .then((receipts) => {
          // Process the receipts and handle any errors
          const receipt = receipts[0];
          if (receipt.status === 'error') {
            // Handle the error
            console.error(receipt);
          } else {
            // Notification sent successfully
            console.log('Push notification sent successfully');
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during sending the push notification
          console.error(error);
        });
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