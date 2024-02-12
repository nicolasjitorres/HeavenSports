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
        }
    }

    let config = {
        tableName: 'productos',
        timestamps: false
    }

    let Producto = sequelize.define(alias, columns, config);

    return Producto;
}