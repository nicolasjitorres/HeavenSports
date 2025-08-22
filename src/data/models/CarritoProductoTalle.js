export default (sequelize, DataTypes) =>{

    let alias = 'CarritoProductoTalle';

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
        id_producto_talle:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'producto_talle',
                    key: 'id'
                }
            }
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'carrito_producto_talle',
        timestamps: false
    }

    let CarritoProductoTalle = sequelize.define(alias, columns, config);


    CarritoProductoTalle.associate = function(models){

        CarritoProductoTalle.belongsTo(models.ProductoTalle, {
            as: 'productoTalle',
            foreignKey:'id_producto_talle'
        }),

        CarritoProductoTalle.belongsTo(models.Carrito, {
            as: 'carrito',
            foreignKey:'id_carrito'
        })
        
    }


    return CarritoProductoTalle;
}