import express from 'express';
import userGroupController from '../controllers/userGroupController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/userGroups', checkAccess('readAny', 'userGroup'), userGroupController.showAll, paginate)
    .get('/userGroups/:id', checkAccess('readAny', 'userGroup'), userGroupController.showOneById)
    .post('/userGroups', checkAccess('createAny', 'userGroup'), userGroupController.addOne)
    .put('/userGroups/:id', checkAccess('updateAny', 'userGroup'), userGroupController.updateOne)
    .delete('/userGroups/:id', checkAccess('deleteAny', 'userGroup'), userGroupController.deleteOne);

export default router;