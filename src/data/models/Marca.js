export default (sequelize, DataTypes) =>{

    let alias = 'Marca';
    
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
        }
    }

    let config = {
        tableName: 'marcas',
        timestamps: false
    }

    let Marca = sequelize.define(alias, columns, config);


    Marca.associate = function(models){

        Marca.hasMany(models.Producto, {
            as: 'productos',
            foreignKey:'id_marca'
        })
        
    }


    return Marca;
}