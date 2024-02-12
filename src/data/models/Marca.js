module.exports = (sequelize, DataTypes) =>{

    let alias = 'Marcas';
    
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
        },
    }

    let config = {
        tableName: 'marcas',
        timestamps: false
    }

    let Marca = sequelize.define(alias, columns, config);

    return Marca;
}