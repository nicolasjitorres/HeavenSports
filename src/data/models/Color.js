module.exports = (sequelize, DataTypes) =>{

    let alias = 'Color';
    
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

        Color.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'ProductoColor',
            foreignKey: 'id_color',
            otherKey: 'id_producto',
            timestamps: false
        })
        
    }


    return Color;
}