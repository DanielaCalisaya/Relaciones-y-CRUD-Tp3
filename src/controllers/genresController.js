const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll({ /* Usamos corchete porque es un objeto, y puedo incluir varias asociaciones */
            include: [{association: "movies"}] /* ahi me mostrarĂ¡ los generos y las peliculas tambien */
        })
            .then(genres => {
                res.send(genres)
               /*  res.render('genresList.ejs', {genres}) */
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;