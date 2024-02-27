module.exports = (sequelize, DataTypes) =>{

    let alias = 'Categoria';
    
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

        Categoria.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'ProductoCategoria',
            foreignKey: 'id_categoria',
            otherKey: 'id_producto',
            timestamps: false
        })
        
    }


    return Categoria;
}