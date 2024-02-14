module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductoColorTalle';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto_color: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'producto_color',
                    key: 'id'
                }
            }
        },
        id_talle:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'talles',
                    key: 'id'
                }
            }
        },
        stock:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_color_talle',
        timestamps: false
    }

    let ProductoColorTalle = sequelize.define(alias, columns, config);


    ProductoColorTalle.associate = function(models){

        ProductoColorTalle.belongsTo(models.ProductoColor, {
            as: 'productoColor',
            foreignKey:'id_producto_color'
        }),

        ProductoColorTalle.belongsTo(models.Talle, {
            as: 'talle',
            foreignKey:'id_talle'
        }),

        ProductoColorTalle.belongsToMany(models.Carrito, {
            as: 'carritos',
            through: 'CarritoProductoColorTalle',
            foreignKey: 'id_producto_color_talle',
            otherKey: 'id_carrito',
            timestamps: false
        })

    }


    return ProductoColorTalle;
}