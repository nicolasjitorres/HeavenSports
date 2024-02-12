module.exports = (sequelize, DataTypes) =>{

    let alias = 'Productos';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(100),
        },
        descripcion:{
            type: DataTypes.STRING(200),
        },
        id_marca: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'marcas',
                    key: 'id'
                }
            }
        }
    }

    let config = {
        tableName: 'productos',
        timestamps: false
    }

    let Producto = sequelize.define(alias, columns, config);


    Producto.associate = function(models){

        Producto.belongsTo(models.Marcas, {
            as: 'marcas',
            foreignKey:'id_marca'
        }),

        Producto.belongsToMany(models.Categorias, {
            as: 'categorias',
            through: 'producto_categoria',
            foreignKey: 'id_producto',
            otherKey: 'id_categoria',
            timestamps: false
        }),

        Producto.hasMany(models.ProductosCategorias, {
            as: 'productosCategorias',
            foreignKey:'id_producto'
        }),
    }


    return Producto;
}