import ticketTypes from './ticketTypesRoutes.js';
import priorities from './prioritiesRoutes.js';
import ticketStatus from './ticketStatusRoutes.js';
import userRoles from './userRolesRoutes.js';
import userGroups from './userGroupsRoutes.js';
import users from './userRoutes.js';
import clients from './clientsRoutes.js';
import tickets from './ticketsRoutes.js';
import login from './loginRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({
            title: 'Tickets'
        });
    });

    app.use(
        ticketTypes,
        priorities,
        ticketStatus,
        userRoles,
        userGroups,
        users,
        clients,
        tickets,
        login
    );
};

export default routes;