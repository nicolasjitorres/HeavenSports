import { Model } from "sequelize";

export default class Cart extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        total_amount: {
          type: DataTypes.BIGINT,
        },
      },
      {
        sequelize,
        tableName: "carts",
        timestamps: false,
        modelName: "Cart",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    this.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "cart_items",
    });

    
  }
}
