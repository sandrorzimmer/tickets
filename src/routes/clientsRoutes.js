import express from 'express';
import ClientController from '../controllers/clientController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/clients', ClientController.showAll, paginate)
    .get('/clients/:id', ClientController.showOneById)
    .post('/clients', ClientController.addOne)
    .put('/clients/:id', ClientController.updateOne)
    .delete('/clients/:id', ClientController.deleteOne);

export default router;