const express=require('express');
const productRouter=express.Router();
const ProductController=require('../module/webservice/productController');

productRouter.post('/category/postdetails',ProductController.postCategory);
productRouter.post('/product/postproductdata',ProductController.postProduct);
productRouter.get('/agg/productcategorydata',ProductController.getProductCategory);
productRouter.get('/agg/productcategorygroup',ProductController.groupProductCategory);
productRouter.put('/product/editproduct/:id',ProductController.updateProduct);
productRouter.delete('/product/deleteproduct/:id',ProductController.deleteProduct);

module.exports=productRouter;