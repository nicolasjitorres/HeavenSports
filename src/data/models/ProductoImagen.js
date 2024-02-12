module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosImagenes';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'productos',
                    key: 'id'
                }
            }
        },
        id_imagen:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'imagenes',
                    key: 'id'
                }
            }
        }
    }

    let config = {
        tableName: 'producto_imagen',
        timestamps: false
    }

    let ProductoImagen = sequelize.define(alias, columns, config);


    ProductoImagen.associate = function(models){

        ProductoImagen.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey:'id_producto'
        }),

        ProductoImagen.belongsTo(models.Imagenes, {
            as: 'imagenes',
            foreignKey:'id_imagen'
        }),
    }


    return ProductoImagen;
}