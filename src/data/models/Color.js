module.exports = (sequelize, DataTypes) =>{

    let alias = 'Colores';
    
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
        hexadecimal:{
            type: DataTypes.STRING(50),
        }
    }

    let config = {
        tableName: 'colores',
        timestamps: false
    }

    let Color = sequelize.define(alias, columns, config);


    Color.associate = function(models){

        Color.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'producto_color',
            foreignKey: 'id_color',
            otherKey: 'id_producto',
            timestamps: false
        }),

        Color.hasMany(models.ProductosColores, {
            as: 'productosColores',
            foreignKey:'id_color'
        }),
    }


    return Color;
}