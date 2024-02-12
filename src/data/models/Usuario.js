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
            references: {
                model: {
                    tableName: 'imagenes',
                    key: 'id'
                }
            }
        },
        id_rol:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'roles',
                    key: 'id'
                }
            }
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    let Usuario = sequelize.define(alias, columns, config);


    Usuario.associate = function(models){

        Usuario.belongsTo(models.Imagenes, {
            as: 'imagenes',
            foreignKey: 'id_imagen_perfil'
        }),

        Usuario.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'id_rol'
        }),

        Usuario.hasMany(models.Carritos, {
            as: 'carritos',
            foreignKey:'id_usuario'
        })

    }

    return Usuario;
}