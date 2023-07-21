import NotFound from '../errors/NotFound.js';
import Ticket from '../models/Ticket.js';
import TicketType from '../models/TicketType.js';
import Priority from '../models/Priority.js';
import Client from '../models/Client.js';
import User from '../models/User.js';
import BadRequest from '../errors/BadRequest.js';

class TicketController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = Ticket.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await Ticket.findById(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    };

    static addOne = async (req, res, next) => {
        try {
            const { ticketType, priority, client, author, responsible } = req.body;

            const existingTicketType = await TicketType.findById(ticketType);
            const existingPriority = await Priority.findById(priority);
            const existingClient = await Client.findById(client);
            const existingAuthor = await User.findById(author);
            const existingResponsible = await User.findById(responsible);

            if (!existingTicketType) {
                return next(new BadRequest('Invalid ticket type.'));
            }

            if (!existingPriority) {
                return next(new BadRequest('Invalid priority.'));
            }

            if (!existingClient) {
                return next(new BadRequest('Invalid client.'));
            }

            if (!existingAuthor) {
                return next(new BadRequest('Invalid author.'));
            }

            if (!existingResponsible) {
                return next(new BadRequest('Invalid responsible.'));
            }

            const newOne = new Ticket(req.body);
            const result = await newOne.save();
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    static updateOne = async (req, res, next) => {
        try {
            const { ticketType, priority, client, author, responsible } = req.body;

            if (ticketType) {
                const existingTicketType = await TicketType.findById(ticketType);
                if (!existingTicketType) {
                    return next(new BadRequest('Invalid ticket type.'));
                }
            }

            if (priority) {
                const existingPriority = await Priority.findById(priority);
                if (!existingPriority) {
                    return next(new BadRequest('Invalid priority.'));
                }
            }

            if (client) {
                const existingClient = await Client.findById(client);
                if (!existingClient) {
                    return next(new BadRequest('Invalid client.'));
                }
            }

            if (author) {
                const existingAuthor = await User.findById(author);
                if (!existingAuthor) {
                    return next(new BadRequest('Invalid author.'));
                }
            }

            if (responsible) {
                const existingResponsible = await User.findById(responsible);
                if (!existingResponsible) {
                    return next(new BadRequest('Invalid responsible.'));
                }
            }

            const id = req.params.id;
            const updatedOne = req.body;

            const result = await Ticket.findByIdAndUpdate(id, updatedOne, { new: true });

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static deleteOne = async (req, res, next) => {
        try {
            const id = req.params.id;

            const result = await Ticket.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };

    static showByFilter = async (req, res, next) => {
        try {
            const search = await ticketSearchHandling(req.query);

            if (search !== null) {
                const result = Ticket.find(search);

                req.result = result;

                next();
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            next(error);
        }
    };
}

async function ticketSearchHandling(params) {
    const {
        title,
        description,
        solution
    } = params;

    let search = {};

    if (title) search.title = { $regex: title, $options: 'i' };
    if (description) search.description = { $regex: description, $options: 'i' };
    if (solution) search.solution = { $regex: solution, $options: 'i' };

    return search;

}

export default TicketController;