module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosColoresTalles';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto_color: {
            type: DataTypes.INTEGER,
        },
        id_talle:{
            type: DataTypes.INTEGER,
        },
        stock:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_color_talle',
        timestamps: false
    }

    let ProductoColorTalle = sequelize.define(alias, columns, config);

    return ProductoColorTalle;
}