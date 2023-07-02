import express from 'express';
import PriorityController from '../controllers/priorityController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/priorities', PriorityController.showAll, paginate)
    .get('/priorities/:id', PriorityController.showOneById)
    .post('/priorities', PriorityController.addOne)
    .put('/priorities/:id', PriorityController.updateOne)
    .delete('/priorities/:id', PriorityController.deleteOne);

export default router;