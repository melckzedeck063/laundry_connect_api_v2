const mongoose  =  require('mongoose');


const CategorySchema  =  mongoose.Schema({
    categoryName : {
        type :  String,
        required : [true, 'Category name is required'],
        trim : true
    },
    photo : String,
    description : {
        type :  String,
        default :  ""
    },
    created_at :  {
        type :  Date,
        default :  Date.now()
    }
})


const Category = mongoose.model('Category', CategorySchema);

module.exports =  Category;