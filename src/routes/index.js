


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({
            title: 'Tickets'
        });
    });
};

export default routes;