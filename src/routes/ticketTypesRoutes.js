import express from 'express';
import TicketTypeController from '../controllers/ticketTypeController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/ticketTypes', TicketTypeController.showAll, paginate)
    .get('/ticketTypes/:id', TicketTypeController.showOneById)
    .post('/ticketTypes', TicketTypeController.addOne)
    .put('/ticketTypes/:id', TicketTypeController.updateOne)
    .delete('/ticketTypes/:id', TicketTypeController.deleteOne);

export default router;