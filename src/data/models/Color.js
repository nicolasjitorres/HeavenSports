export default (sequelize, DataTypes) =>{

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
        }
    }

    let config = {
        tableName: 'colores',
        timestamps: false
    }

    let Color = sequelize.define(alias, columns, config);


    Color.associate = function(models){

        Color.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'id_color',
            timestamps: false
        })
        
    }


    return Color;
}