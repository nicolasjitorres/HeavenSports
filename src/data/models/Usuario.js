module.exports = (sequelize, DataTypes) =>{

    let alias = 'Usuario';

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
        telefono:{
            type: DataTypes.STRING(10),
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

        Usuario.belongsTo(models.Imagen, {
            as: 'imagen',
            foreignKey: 'id_imagen_perfil'
        }),

        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'id_rol'
        }),

        Usuario.hasOne(models.Carrito, {
            as: 'carritos',
            foreignKey:'id_usuario'
        })

    }

    return Usuario;
}