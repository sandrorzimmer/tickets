import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import User from '../models/User.js';
import UserGroup from '../models/UserGroup.js';
import UserRole from '../models/UserRole.js';
import bcrypt from 'bcryptjs';
import validatePassword from '../utils/validatePassword.js';

class UserController {
    static showAll = async (req, res, next) => {
        try {
            const searchAll = User.find();

            req.result = searchAll;

            next();
        } catch (error) {
            next(error);
        }
    };

    static showOneById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await User.findById(id);

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
            const { userName, userRole, userGroup } = req.body;

            const existingUser = await User.findOne({ userName });
            const existingRole = await UserRole.findById(userRole);
            const existingGroup = await UserGroup.findById(userGroup);

            if (existingUser) {
                return next(new BadRequest('This username is already used.'));
            }

            if (!existingRole) {
                return next(new BadRequest('Invalid role.'));
            }

            if (!existingGroup) {
                return next(new BadRequest('Invalid group.'));
            }

            const newUser = new User(req.body);
            const result = await newUser.save();

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    static updateOne = async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedOne = req.body;
            const { userName, userRole, userGroup } = updatedOne;

            // Ensure that the username is unique, except for the current user being updated

            if (userName) {
                const existingUser = await User.findOne({
                    userName,
                    _id: { $ne: id }
                });
                if (existingUser) {
                    return next(new BadRequest('This username is already used.'));
                }
            }

            if (userRole) {
                const existingRole = await UserRole.findById(userRole);
                if (!existingRole) {
                    return next(new BadRequest('Invalid role.'));
                }
            }

            if (userGroup) {
                const existingGroup = await UserGroup.findById(userGroup);
                if (!existingGroup) {
                    return next(new BadRequest('Invalid group.'));
                }
            }

            // Hash the new password before updating
            if (updatedOne.password || updatedOne.password === '') {
                if (!validatePassword(updatedOne.password)) {
                    return next(new BadRequest('Password is not valid.'));
                }
                const salt = await bcrypt.genSalt(10);
                updatedOne.password = await bcrypt.hash(updatedOne.password, salt);
            }

            const result = await User.findByIdAndUpdate(id, updatedOne, { new: true });

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

            const result = await User.findByIdAndDelete(id);

            if (!result) {
                return next(new NotFound('ID not found.'));
            }

            res.status(200).json({ message: `ID ${id} deleted successfully.` });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;