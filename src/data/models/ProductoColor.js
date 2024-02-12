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
        },
        id_color:{
            type: DataTypes.INTEGER,
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

    return ProductoColor;
}