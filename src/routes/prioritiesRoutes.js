import express from 'express';
import PriorityController from '../controllers/priorityController.js';
import paginate from '../middlewares/paginator.js';
import checkAccess from '../middlewares/checkAccess.js';

const router = express.Router();

router
    .get('/priorities', checkAccess('readAny', 'priority'), PriorityController.showAll, paginate)
    .get('/priorities/:id', checkAccess('readAny', 'priority'), PriorityController.showOneById)
    .post('/priorities', checkAccess('createAny', 'priority'), PriorityController.addOne)
    .put('/priorities/:id', checkAccess('updateAny', 'priority'), PriorityController.updateOne)
    .delete('/priorities/:id', checkAccess('deleteAny', 'priority'), PriorityController.deleteOne);

export default router;