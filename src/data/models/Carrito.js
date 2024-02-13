module.exports = (sequelize, DataTypes) =>{

    let alias = 'Carritos';
    
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'usuarios',
                    key: 'id'
                }
            }
        },
        precio_total:{
            type: DataTypes.BIGINT,
        }
    }

    let config = {
        tableName: 'carritos',
        timestamps: false
    }

    let Carrito = sequelize.define(alias, columns, config);


    Carrito.associate = function(models){

        Carrito.belongsTo(models.Usuarios, {
            as: 'usuarios',
            foreignKey:'id_usuario'
        }),

        Carrito.belongsToMany(models.ProductosColoresTalles, {
            as: 'productosColoresTalles',
            through: 'carrito_producto_color_talle',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto_color_talle',
            timestamps: false
        }),

        Carrito.hasMany(models.CarritosProductosColoresTalles, {
            as: 'carritosProductosColoresTalles',
            foreignKey:'id_carrito'
        })

    }

    return Carrito;
}   