import express from 'express';
import userRoleController from '../controllers/userRoleController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/userRoles', userRoleController.showAll, paginate)
    .get('/userRoles/:id', userRoleController.showOneById)
    .post('/userRoles', userRoleController.addOne)
    .put('/userRoles/:id', userRoleController.updateOne)
    .delete('/userRoles/:id', userRoleController.deleteOne);

export default router;