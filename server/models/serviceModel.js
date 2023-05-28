const mongoose =  require('mongoose');

const ServiceSchema =  mongoose.Schema({
    serviceName : {
        type : String,
        required : [true, 'Service name is required'],
        trim : true
    },
    price : {
        type  : String,
        required :  true,
        trim  : true
    },
    laundry : {
        type : mongoose.Schema.ObjectId,
        ref : 'Laundry',
        required : true,
        trim : true
    },
    date_created : {
        type : Date,
        default : Date.now()
    },
 photo : String,
    deleted : {
        type : String,
        default : false
    }
})

ServiceSchema.pre(/^find/, function(next){
    this.populate({
        path : 'laundry',
        select : '-__v -date_created'
    }),

    next();
})


const Service =  mongoose.model('Service', ServiceSchema);

module.exports =  Service;