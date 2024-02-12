module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosImagenes';

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
        id_imagen:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_imagen',
        timestamps: false
    }

    let ProductoImagen = sequelize.define(alias, columns, config);

    return ProductoImagen;
}