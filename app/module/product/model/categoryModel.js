const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const CategoryModel=new mongoose.model('categories',CategorySchema);
module.exports=CategoryModel;