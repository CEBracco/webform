const sequelize = global.dbConnection;
const Variation = sequelize.import('../db/models/variation');

global.server.app.get(['/typography'], function (req, res) {
    Variation.findAll({ where: {type: 'typography'}})
    .then(typographies => {
        res.render("typography", { typographies: typographies });
        res.end();
    })
});