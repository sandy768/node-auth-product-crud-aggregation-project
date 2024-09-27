const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    product_name:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const ProductModel=new mongoose.model('products',ProductSchema);
module.exports=ProductModel;