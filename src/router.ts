import {Router} from 'express';
import {body, validationResult} from 'express-validator'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdates } from './handlers/update';

const router = Router();

// Products
router.get('/product', getProducts);
router.get('/product/:id', getProduct);

const productValidator = [body('name').isString()];
const genericValidation = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400);
    res.json({errors: errors.array()});
    return null;
  }
  next();
};


router.put('/product/:id', productValidator, genericValidation, updateProduct);
router.post('/product', productValidator, genericValidation, createProduct);
router.delete('/product/:id', deleteProduct);

// Update
const postUpdateValidator = [body('title').isString(), body('body').isString(), body('productId').isString()];
const putUpdateValidator = [
  body('title').isString().optional(),
  body('body').isString().optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
];
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put('/update/:productId/:id', putUpdateValidator, genericValidation, updateUpdates);
router.post('/update', postUpdateValidator, genericValidation, createUpdate);
router.delete('/update/:productId/:id', deleteUpdate);


// Update Point
router.get('/update-point', () => {});
router.get('/update-point/:id', () => {});
router.put('/update-point/:id', () => {});
router.post('/update-point', () => {});
router.delete('/update-point/:id', () => {});

export default router;