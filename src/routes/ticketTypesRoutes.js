import express from 'express';
import TicketTypeController from '../controllers/ticketTypeController.js';
import paginate from '../middlewares/paginator.js';

const router = express.Router();

router
    .get('/ticketTypes', checkAccess('readAny', 'ticketType'), TicketTypeController.showAll, paginate)
    .get('/ticketTypes/:id', checkAccess('readAny', 'ticketType'), TicketTypeController.showOneById)
    .post('/ticketTypes', checkAccess('createAny', 'ticketType'), TicketTypeController.addOne)
    .put('/ticketTypes/:id', checkAccess('updateAny', 'ticketType'), TicketTypeController.updateOne)
    .delete('/ticketTypes/:id', checkAccess('deleteAny', 'ticketType'), TicketTypeController.deleteOne);

export default router;