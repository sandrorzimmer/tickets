import NotFound from '../errors/NotFound.js';
import UserGroup from '../models/UserGroup.js';

class UserGroupController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = UserGroup.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await UserGroup.findById(id);

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
            const newOne = new UserGroup(req.body);

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

            const result = await UserGroup.findByIdAndUpdate(id, updatedOne, { new: true });

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

            const result = await UserGroup.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };
}

export default UserGroupController;