import express from 'express';
import { productController ,allProductsController, singleProductController,deleteProductController,UpdateProductController,updateProductStock,searchProductController,sortByPriceController,allProductsController2} from '../controllers/productController';

const router = express.Router();

router.post('/createproduct',productController)
router.get('/getallproducts',allProductsController)
router.get('/getallproducts2',allProductsController2)
router.get('/getoneproduct/:id',singleProductController)
router.delete('/deleteproduct/:id',deleteProductController)
router.put('/updateproduct/:id',UpdateProductController)
router.get('/getoneproduct',searchProductController)
router.put('/updateStock/:id',updateProductStock)
router.get('/sortByPrice',sortByPriceController)

export default router;