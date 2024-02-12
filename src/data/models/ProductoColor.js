module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosColores';

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
        }
    }

    let config = {
        tableName: 'producto_color',
        timestamps: false
    }

    let ProductoColor = sequelize.define(alias, columns, config);


    ProductoColor.associate = function(models){

        ProductoColor.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey:'id_producto'
        }),

        ProductoColor.belongsTo(models.Colores, {
            as: 'colores',
            foreignKey:'id_color'
        }),
    }

    
    return ProductoColor;
}