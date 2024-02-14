module.exports = (sequelize, DataTypes) =>{

    let alias = 'Imagen';
    
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING(100),
        },
        extension:{
            type: DataTypes.STRING(10),
        }
    }

    let config = {
        tableName: 'imagenes',
        timestamps: false
    }

    let Imagen = sequelize.define(alias, columns, config);


    Imagen.associate = function(models){

        Imagen.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey:'id_imagen_perfil'
        }),

        Imagen.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'ProductoImagen',
            foreignKey: 'id_imagen',
            otherKey: 'id_producto',
            timestamps: false
        })

    }

    
    return Imagen;
}