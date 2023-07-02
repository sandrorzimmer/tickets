import express from 'express';
import TicketStatusController from '../controllers/ticketStatusController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/ticketStatus', TicketStatusController.showAll, paginate)
    .get('/ticketStatus/:id', TicketStatusController.showOneById)
    .post('/ticketStatus', TicketStatusController.addOne)
    .put('/ticketStatus/:id', TicketStatusController.updateOne)
    .delete('/ticketStatus/:id', TicketStatusController.deleteOne);

export default router;