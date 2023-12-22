import Express from "express";
import { bookProduct, buyProducts, createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/ProductControllers.js";
const router = Express.Router()


router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/book/:id', bookProduct);
router.post('/',createProduct);
router.put('/:id' , updateProduct);
router.delete('/:id' , deleteProduct);
router.post('/buy' , buyProducts);


export default router