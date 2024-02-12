module.exports = (sequelize, DataTypes) =>{

    let alias = 'Categorias';
    
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(50),
        },
        descripcion:{
            type: DataTypes.STRING(100),
        }
    }

    let config = {
        tableName: 'categorias',
        timestamps: false
    }

    let Categoria = sequelize.define(alias, columns, config);


    Categoria.associate = function(models){

        Categoria.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'producto_categoria',
            foreignKey: 'id_categoria',
            otherKey: 'id_producto',
            timestamps: false
        }),

        Categoria.hasMany(models.ProductosCategorias, {
            as: 'productosCategorias',
            foreignKey:'id_categoria'
        }),
    }


    return Categoria;
}