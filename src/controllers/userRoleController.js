import NotFound from '../errors/NotFound.js';
import UserRole from '../models/UserRole.js';

class UserRoleController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = UserRole.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await UserRole.findById(id);

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
            const newOne = new UserRole(req.body);

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

            const result = await UserRole.findByIdAndUpdate(id, updatedOne, { new: true });

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

            const result = await UserRole.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };
}

export default UserRoleController;