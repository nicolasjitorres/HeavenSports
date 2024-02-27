module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductoTalle';

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
                    tableName: 'producto',
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
        tableName: 'producto_talle',
        timestamps: false
    }

    let ProductoTalle = sequelize.define(alias, columns, config);


    ProductoTalle.associate = function(models){

        ProductoTalle.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey:'id_producto'
        }),

        ProductoTalle.belongsTo(models.Talle, {
            as: 'talle',
            foreignKey:'id_talle'
        }),

        ProductoTalle.belongsToMany(models.Carrito, {
            as: 'carritos',
            through: 'CarritoProductoTalle',
            foreignKey: 'id_producto_talle',
            otherKey: 'id_carrito',
            timestamps: false
        })

    }


    return ProductoTalle;
}