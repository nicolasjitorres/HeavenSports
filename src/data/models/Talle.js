module.exports = (sequelize, DataTypes) =>{

    let alias = 'Talle';

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

        Talle.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'ProductoTalle',
            foreignKey: 'id_talle',
            otherKey: 'id_producto',
            timestamps: false
        })
        
    }


    return Talle;
}