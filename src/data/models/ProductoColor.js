module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductoColor';

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
        id_color:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'colores',
                    key: 'id'
                }
            }
        },
        precio:{
            type: DataTypes.BIGINT,
        },
        descuento:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_color',
        timestamps: false
    }

    let ProductoColor = sequelize.define(alias, columns, config);


    ProductoColor.associate = function(models){

        ProductoColor.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey:'id_producto'
        }),

        ProductoColor.belongsTo(models.Color, {
            as: 'color',
            foreignKey:'id_color'
        }),

        ProductoColor.belongsToMany(models.Talle, {
            as: 'talles',
            through: 'ProductoColorTalle',
            foreignKey: 'id_producto_color',
            otherKey: 'id_talle',
            timestamps: false
        })
        
    }

    
    return ProductoColor;
}