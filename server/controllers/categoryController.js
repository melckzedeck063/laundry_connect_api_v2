const  catchAsync  =   require('../utils/catchAsync');
const AppError =   require('../utils/AppError');

const Factory  =  require('../controllers/factoryController');
const Category =  require('../models/categoryModel');

exports.registeCategory = Factory.createOne(Category);

exports.getAllCategories = Factory.getAll(Category);

exports.getCategoryById =   Factory.getOne(Category);

exports.updateCategory = Factory.updateOne(Category);

exports.deleteCategory = Factory.deleteModel(Category);