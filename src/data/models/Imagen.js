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
        nombre: {
            type: DataTypes.STRING(100),
        }
    }

    let config = {
        tableName: 'imagenes',
        timestamps: false
    }

    let Imagen = sequelize.define(alias, columns, config);


    Imagen.associate = function(models){

        Imagen.hasOne(models.Usuario, {
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