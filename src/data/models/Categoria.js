module.exports = (sequelize, DataTypes) =>{

    let alias = 'Categorias';
    
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
        descripcion:{
            type: DataTypes.STRING(100),
        },
    }

    let config = {
        tableName: 'categorias',
        timestamps: false
    }

    let Categoria = sequelize.define(alias, columns, config);

    return Categoria;
}