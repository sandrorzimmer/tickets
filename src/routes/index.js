import ticketTypes from './ticketTypesRoutes.js';
import priorities from './prioritiesRoutes.js';
import ticketStatus from './ticketStatusRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({
            title: 'Tickets'
        });
    });

    app.use(
        ticketTypes,
        priorities,
        ticketStatus
    );
};

export default routes;