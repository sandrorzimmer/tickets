import express from 'express';
import userController from '../controllers/userController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/users', checkAccess('readAny', 'user'), userController.showAll, paginate)
    .get('/users/:id', checkAccess('readAny', 'user'), userController.showOneById)
    .post('/users', checkAccess('createAny', 'user'), userController.addOne)
    .put('/users/:id', checkAccess('updateAny', 'user'), userController.updateOne)
    .delete('/users/:id', checkAccess('deleteAny', 'user'), userController.deleteOne);

export default router;