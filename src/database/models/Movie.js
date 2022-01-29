module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Movie.associate = function(models) {

        Movie.belongsTo(models.Genre, {
            as: "genre", /* genre porque le pertenece a un genero */
            foreignKey: "genre_id"
        })

        Movie.belongsToMany(models.Actor, { /* belongsToMany le pertenece a muchos */
            as: "actors",
            through: "actor_movie", /* tabla pivot */
            foreignKey: "movie_id",
            otherKey: "actor_id", /* es la otra llave */
            timestamps: false /* si queremos que se guarde el timestamps tenemos que configurar el createdAt y el updatedAt */
        })
        
    }

    return Movie
};