const CategoryModel=require('../model/categoryModel');
const ProductModel=require('../model/productModel');

class ProductRepository{
    async categorySave(data){
        try{
            let save_category=await CategoryModel.create(data);
            return save_category;
        } 
        catch(err){
            console.log("Error to save category details",err);
        }
    }
    async productSave(data){
        try{
            let save_product=await ProductModel.create(data);
            return save_product;
        } 
        catch(err){
            console.log("Error to save product details",err);
        }
    }
    async productfind(product_id){
        try{
            let search_product=await ProductModel.findById(product_id);
            return search_product;
        }
        catch(err){
            console.log("Error to find existing product",err);
        }
    }
    async productDelete(product_id){
        try{
            let delete_product=await ProductModel.findByIdAndDelete(product_id);
            return delete_product;
        }
        catch(err){
            console.log("Error to delete product details",err);
        }
    }
}
module.exports=new ProductRepository();