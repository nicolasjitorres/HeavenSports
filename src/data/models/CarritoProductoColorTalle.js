module.exports = (sequelize, DataTypes) =>{

    let alias = 'CarritosProductosColoresTalles';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito:{
            type: DataTypes.INTEGER,
        },
        id_producto_color_taller:{
            type: DataTypes.INTEGER,
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'carrito_producto_color_talle',
        timestamps: false
    }

    let CarritoProductoColorTalle = sequelize.define(alias, columns, config);

    return CarritoProductoColorTalle;
}