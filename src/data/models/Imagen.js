module.exports = (sequelize, DataTypes) =>{

    let alias = 'Imagenes';
    
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

        Imagen.belongsTo(models.Usuarios, {
            as: 'usuarios',
            foreignKey:'id_imagen_perfil'
        }),

        Imagen.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'producto_imagen',
            foreignKey: 'id_imagen',
            otherKey: 'id_producto',
            timestamps: false
        }),

        Imagen.hasMany(models.ProductosImagenes, {
            as: 'productosImagenes',
            foreignKey:'id_imagen'
        })

    }

    
    return Imagen;
}