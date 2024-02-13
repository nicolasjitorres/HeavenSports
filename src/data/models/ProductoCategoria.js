module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosCategorias';

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
        id_categoria:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'categorias',
                    key: 'id'
                }
            }
        }
    }

    let config = {
        tableName: 'producto_categoria',
        timestamps: false
    }

    let ProductoCategoria = sequelize.define(alias, columns, config);


    ProductoCategoria.associate = function(models){

        ProductoCategoria.belongsTo(models.Productos, {
            as: 'producto',
            foreignKey:'id_producto'
        }),

        ProductoCategoria.belongsTo(models.Categorias, {
            as: 'categoria',
            foreignKey:'id_categoria'
        })
        
    }


    return ProductoCategoria;
}