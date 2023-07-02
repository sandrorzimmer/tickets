import NotFound from '../errors/NotFound.js';
import Priority from '../models/Priority.js';

class PriorityController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = Priority.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await Priority.findById(id);

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
            const newOne = new Priority(req.body);

            const result = await newOne.save();

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    static updateOne = async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedOne = req.body;

            const result = await Priority.findByIdAndUpdate(id, updatedOne, { new: true });

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

            const result = await Priority.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };
}

export default PriorityController;