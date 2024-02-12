module.exports = (sequelize, DataTypes) =>{

    let alias = 'Usuarios';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(100),
        },
        apellido:{
            type: DataTypes.STRING(100),
        },
        email:{
            type: DataTypes.STRING(150),
        },
        contrasena:{
            type: DataTypes.STRING(20),
        },
        id_imagen_perfil: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'imagenes',
                    key: 'id'
                }
            }
        },
        id_rol:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    let Usuario = sequelize.define(alias, columns, config);


    Usuario.associate = function(models){

        Usuario.belongsTo(models.Imagenes, {
            as: 'imagenes',
            foreignKey: 'id_imagen_perfil'
        })

        ////////////////
        Actor.belongsToMany(models.Peliculas, {
            as: 'peliculas',
            through: models.Peliculas_Actores,
            foreignKey: 'actor_id',
            otherKey: 'movie_id'
        })

        Actor.hasMany(models.Peliculas_Actores, {
            as: 'peliculaActores',
            foreignKey:'actor_id'
        })
    }

    return Usuario;
}