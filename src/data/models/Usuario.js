module.exports = (sequelize, DataTypes) =>{

    let alias = 'Usuarios';

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
        apellido:{
            type: DataTypes.STRING(100),
        },
        email:{
            type: DataTypes.STRING(150),
        },
        contrasena:{
            type: DataTypes.STRING(20),
        },
        id_imagen_perfil: {
            type: DataTypes.INTEGER,
        },
        id_rol:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    let Usuario = sequelize.define(alias, columns, config);

    return Usuario;
}