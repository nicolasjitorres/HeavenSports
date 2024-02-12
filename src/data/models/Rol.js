module.exports = (sequelize, DataTypes) =>{

    let alias = 'Roles';

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
            type: DataTypes.STRING(200),
        },
    }

    let config = {
        tableName: 'roles',
        timestamps: false
    }

    let Rol = sequelize.define(alias, columns, config);

    return Rol;
}