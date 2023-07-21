import express from 'express';
import userRoleController from '../controllers/userRoleController.js';
import paginate from '../middlewares/paginator.js';
import checkAccess from '../middlewares/checkAccess.js';

const router = express.Router();

router
    .get('/userRoles', checkAccess('readAny', 'userRole'), userRoleController.showAll, paginate)
    .get('/userRoles/:id', checkAccess('readAny', 'userRole'), userRoleController.showOneById)
    .post('/userRoles', checkAccess('createAny', 'userRole'), userRoleController.addOne)
    .put('/userRoles/:id', checkAccess('updateAny', 'userRole'), userRoleController.updateOne)
    .delete('/userRoles/:id', checkAccess('deleteAny', 'userRole'), userRoleController.deleteOne);

export default router;