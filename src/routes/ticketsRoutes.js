import express from 'express';
import TicketController from '../controllers/ticketController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/tickets', checkAccess('readAny', 'ticket'), TicketController.showAll, paginate)
    .get('/tickets/:id', checkAccess('readAny', 'ticket'), TicketController.showOneById)
    .post('/tickets', checkAccess('createAny', 'ticket'), TicketController.addOne)
    .put('/tickets/:id', checkAccess('updateAny', 'ticket'), TicketController.updateOne)
    .delete('/tickets/:id', checkAccess('deleteAny', 'ticket'), TicketController.deleteOne);

export default router;