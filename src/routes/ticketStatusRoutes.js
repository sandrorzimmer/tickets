import express from 'express';
import TicketStatusController from '../controllers/ticketStatusController.js';
import paginate from '../middlewares/paginator.js';
import checkAccess from '../middlewares/checkAccess.js';

const router = express.Router();

router
    .get('/ticketStatus', checkAccess('readAny', 'ticketStatus'), TicketStatusController.showAll, paginate)
    .get('/ticketStatus/:id', checkAccess('readAny', 'ticketStatus'), TicketStatusController.showOneById)
    .post('/ticketStatus', checkAccess('createAny', 'ticketStatus'), TicketStatusController.addOne)
    .put('/ticketStatus/:id', checkAccess('updateAny', 'ticketStatus'), TicketStatusController.updateOne)
    .delete('/ticketStatus/:id', checkAccess('deleteAny', 'ticketStatus'), TicketStatusController.deleteOne);

export default router;