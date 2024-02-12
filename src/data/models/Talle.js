module.exports = (sequelize, DataTypes) =>{

    let alias = 'Talles';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        numero:{
            type: DataTypes.INTEGER,
        },
        descripcion:{
            type: DataTypes.STRING(100),
        },
    }

    let config = {
        tableName: 'talles',
        timestamps: false
    }

    let Talle = sequelize.define(alias, columns, config);

    return Talle;
}