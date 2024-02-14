module.exports = (sequelize, DataTypes) =>{

    let alias = 'CarritoProductoColorTalle';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'carritos',
                    key: 'id'
                }
            }
        },
        id_producto_color_taller:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'producto_color_talle',
                    key: 'id'
                }
            }
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'carrito_producto_color_talle',
        timestamps: false
    }

    let CarritoProductoColorTalle = sequelize.define(alias, columns, config);


    CarritoProductoColorTalle.associate = function(models){

        CarritoProductoColorTalle.belongsTo(models.ProductoColorTalle, {
            as: 'productoColorTalle',
            foreignKey:'id_producto_color_talle'
        }),

        CarritoProductoColorTalle.belongsTo(models.Carrito, {
            as: 'carrito',
            foreignKey:'id_carrito'
        })
        
    }


    return CarritoProductoColorTalle;
}