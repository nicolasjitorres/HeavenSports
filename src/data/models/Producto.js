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

        Producto.belongsToMany(models.Imagenes, {
            as: 'imagenes',
            through: 'producto_imagen',
            foreignKey: 'id_producto',
            otherKey: 'id_imagen',
            timestamps: false
        }),

        Producto.hasMany(models.ProductosImagenes, {
            as: 'productosImagenes',
            foreignKey:'id_producto'
        }),

        Producto.belongsToMany(models.Colores, {
            as: 'colores',
            through: 'producto_color',
            foreignKey: 'id_producto',
            otherKey: 'id_color',
            timestamps: false
        }),

        Producto.hasMany(models.ProductosColores, {
            as: 'productosColores',
            foreignKey:'id_producto'
        })
        
    }


    return Producto;
}