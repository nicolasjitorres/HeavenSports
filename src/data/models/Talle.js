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
        }
    }

    let config = {
        tableName: 'talles',
        timestamps: false
    }

    let Talle = sequelize.define(alias, columns, config);


    Talle.associate = function(models){

        Talle.belongsToMany(models.ProductosColores, {
            as: 'productosColores',
            through: 'producto_color_talle',
            foreignKey: 'id_talle',
            otherKey: 'id_producto_color',
            timestamps: false
        }),

        Talle.hasMany(models.ProductosColoresTalles, {
            as: 'productosColoresTalles',
            foreignKey:'id_talle'
        })
        
    }


    return Talle;
}