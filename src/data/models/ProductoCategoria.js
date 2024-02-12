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

    return ProductoCategoria;
}