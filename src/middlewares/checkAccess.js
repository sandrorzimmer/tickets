import BaseError from '../errors/BaseError.js';
import ac from '../permissions/accessControl.js';

const checkAccess = (action, resource) => {
    return (req, res, next) => {
        const user = req.user.user;

        const permission = ac.can(user.userRole.name)[action](resource);

        if (!permission.granted) {
            return next(new BaseError('Unauthorized', 403));
        }

        next();
    };
};

export default checkAccess;