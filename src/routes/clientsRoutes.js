import express from 'express';
import ClientController from '../controllers/clientController.js';
import paginate from '../middlewares/paginator.js';
import checkAccess from '../middlewares/checkAccess.js';

const router = express.Router();

router
    .get('/clients', checkAccess('readAny', 'client'), ClientController.showAll, paginate)
    .get('/clients/:id', checkAccess('readAny', 'client'), ClientController.showOneById)
    .post('/clients', checkAccess('createAny', 'client'), ClientController.addOne)
    .put('/clients/:id', checkAccess('updateAny', 'client'), ClientController.updateOne)
    .delete('/clients/:id', checkAccess('deleteAny', 'client'), ClientController.deleteOne);

export default router;