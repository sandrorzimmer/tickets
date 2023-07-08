import express from 'express';
import userGroupController from '../controllers/userGroupController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/userGroups', userGroupController.showAll, paginate)
    .get('/userGroups/:id', userGroupController.showOneById)
    .post('/userGroups', userGroupController.addOne)
    .put('/userGroups/:id', userGroupController.updateOne)
    .delete('/userGroups/:id', userGroupController.deleteOne);

export default router;