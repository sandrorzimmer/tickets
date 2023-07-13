import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import Client from '../models/Client.js';

class ClientController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = Client.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await Client.findById(id);

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
            const { companyNumber } = req.body;

            const existingCompanyNumber = await Client.findOne({ companyNumber });

            if (existingCompanyNumber) {
                return next(new BadRequest('This company number is already used.'));
            }

            const newOne = new Client(req.body);

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
            const { companyNumber } = req.body;

            if (companyNumber) {
                const existingCompanyNumber = await Client.findOne({
                    companyNumber,
                    _id: { $ne: id }
                });
                if (existingCompanyNumber) {
                    return next(new BadRequest('This company number is already used.'));
                }
            }

            const result = await Client.findByIdAndUpdate(id, updatedOne, { new: true });

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

            const result = await Client.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };
}

export default ClientController;