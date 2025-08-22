export default (sequelize, DataTypes) =>{

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
            type: DataTypes.STRING(100)
        },
        apellido:{
            type: DataTypes.STRING(100)
        },
        telefono:{
            type: DataTypes.STRING(10)
        },
        email:{
            type: DataTypes.STRING(150)
        },
        contrasena:{
            type: DataTypes.STRING(150)
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        sesion:{
            type: DataTypes.STRING(150)
        },
        id_imagen: {
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
            foreignKey: 'id_imagen'
        });

        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'id_rol'
        });

        Usuario.hasOne(models.Carrito, {
            as: 'carrito',
            foreignKey: 'id_usuario'
        });
    }

    return Usuario;
}