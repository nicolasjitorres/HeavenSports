module.exports = (sequelize, DataTypes) =>{

    let alias = 'Producto';

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

        Producto.belongsTo(models.Marca, {
            as: 'marca',
            foreignKey:'id_marca'
        }),

        Producto.belongsToMany(models.Categoria, {
            as: 'categorias',
            through: 'ProductoCategoria',
            foreignKey: 'id_producto',
            otherKey: 'id_categoria',
            timestamps: false
        }),

        Producto.belongsToMany(models.Imagen, {
            as: 'imagenes',
            through: 'ProductoImagen',
            foreignKey: 'id_producto',
            otherKey: 'id_imagen',
            timestamps: false
        }),

        Producto.belongsToMany(models.Color, {
            as: 'colores',
            through: 'ProductoColor',
            foreignKey: 'id_producto',
            otherKey: 'id_color',
            timestamps: false
        })
        
    }


    return Producto;
}