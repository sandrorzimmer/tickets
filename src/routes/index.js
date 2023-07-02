import ticketTypes from './ticketTypesRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({
            title: 'Tickets'
        });
    });

    app.use(
        ticketTypes
    );
};

export default routes;