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
        },
        id_categoria:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_categoria',
        timestamps: false
    }

    let ProductoCategoria = sequelize.define(alias, columns, config);


    ProductoCategoria.associate = function(models){

        ProductoCategoria.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey:'id_producto'
        }),

        ProductoCategoria.belongsTo(models.Categorias, {
            as: 'categorias',
            foreignKey:'id_categoria'
        }),
    }


    return ProductoCategoria;
}