const ProductRepository=require('../product/repository/productRepository');
const ProductModel=require('../product/model/productModel');

class ProductController{
    async postCategory(req,res){
        try{
            if(!req.body.categoryName){
                return res.status(401).json({
                    success:false,
                    message:"Category Name is required"
                })
            }
            else{
                let category_details={
                    categoryName:req.body.categoryName.toLowerCase(),
                };
                let saved_category=await ProductRepository.categorySave(category_details);
                return res.status(200).json({
                    success:true,
                    message:"Category details saved successfully",
                    status:200,
                    category_details:saved_category,
                });
            }
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to collect category details" +err
            })
        }
    }
    async postProduct(req,res){
        try{
            if(!req.body.category_id){
                return res.status(401).json({
                    success:false,
                    message:"Category Id is required"
                })
            }
            else if(!req.body.product_name){
                return res.status(401).json({
                    success:false,
                    message:"Product Name is required"
                })
            }
            else if(!req.body.product_price){
                return res.status(401).json({
                    success:false,
                    message:"Product price is required"
                })
            }
            else if(!req.body.stock){
                return res.status(401).json({
                    success:false,
                    message:"Stock is required"
                })
            }
            else{
                let product_details={
                    category_id:req.body.category_id,
                    product_name:req.body.product_name.toLowerCase(),
                    product_price:req.body.product_price,
                    stock:req.body.stock,
                };
                let saved_product=await ProductRepository.productSave(product_details);
                return res.status(200).json({
                    success:true,
                    message:"Product details saved successfully",
                    status:200,
                    product_details:saved_product
                })
            }
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to collect product details" +err
            })
        }   
    }
    async getProductCategory(req,res){
        try{
            let productCategory=await ProductModel.aggregate([
                {
                    $lookup:{
                        from:'categories',
                        localField:'category_id',
                        foreignField:'_id',
                        as:'ProductCategory'
                    }
                },
                {
                    $unwind:{
                        path:'$ProductCategory'
                    }
                },
                // {
                //     $project:{
                //         category_id:0,
                //         createdAt:0,
                //         updatedAt:0,
                //         "ProductCategory._id":0,
                //         "ProductCategory.createdAt":0,
                //         "ProductCategory.updatedAt":0
                //     }
                // },
            ]);
            return res.status(200).json({
                success:true,
                message:"Category and Product details aggregated successfully",
                status:200,
                result:productCategory,
            });
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to aggregate data" +err
            })
        }
    }
    async groupProductCategory(req,res){
        try{
            let groupedProductCategory=await ProductModel.aggregate([
                {
                    $lookup:{
                        from:'categories',
                        localField:'category_id',
                        foreignField:'_id',
                        as:'ProductCategory'
                    }
                },
                {
                    $group:{
                        _id:"$ProductCategory.categoryName",
                        product:{$push:"$product_name"},
                        total_stock:{$sum:"$stock"}
                    }
                },
            ]);
            return res.status(200).json({
                success:true,
                message:"Product category grouped successfully",
                status:200,
                result:groupedProductCategory,
            });
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to group product category" +err
            })
        }
    }
    async updateProduct(req,res){
        try{
            if(!req.body.category_id){
                return res.status(401).json({
                    success:false,
                    message:"Category Id is required"
                })
            }
            else if(!req.body.product_name){
                return res.status(401).json({
                    success:false,
                    message:"Product Name is required"
                })
            }
            else if(!req.body.product_price){
                return res.status(401).json({
                    success:false,
                    message:"Product price is required"
                })
            }
            else if(!req.body.stock){
                return res.status(401).json({
                    success:false,
                    message:"Stock is required"
                })
            }
            else{
                let existing_product=await ProductRepository.productfind(req.params.id);
                existing_product.category_id=req.body.category_id||existing_product.category_id;
                existing_product.product_name=req.body.product_name.toLowerCase()||existing_product.product_name;
                existing_product.product_price=req.body.product_price||existing_product.product_price;
                existing_product.stock=req.body.stock||existing_product.stock;
                let save_details=await ProductRepository.productSave(existing_product);
                return res.status(200).json({
                    success:true,
                    message:"Product details successfully updated",
                    status:200,
                    updated_product:save_details,
                });
            }
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to update product details" +err
            })
        }
    }
    async deleteProduct(req,res){
        try{
            let deletedProduct=await ProductRepository.productDelete(req.params.id);
            return res.status(200).json({
                success:true,
                message:"Product details deleted successfully",
                status:200,
                result:deletedProduct,
            });
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error to delete product details" +err,
            });
        }
    }
}

module.exports=new ProductController();