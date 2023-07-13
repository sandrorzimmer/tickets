import express from 'express';
import TicketController from '../controllers/ticketController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/tickets', TicketController.showAll, paginate)
    .get('/tickets/:id', TicketController.showOneById)
    .post('/tickets', TicketController.addOne)
    .put('/tickets/:id', TicketController.updateOne)
    .delete('/tickets/:id', TicketController.deleteOne);

export default router;