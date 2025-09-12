import { Model } from "sequelize";
import { ROLES } from "../../constants/enums.js";

export default class User extends Model {
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
        name: {
          type: DataTypes.STRING(100),
        },
        username: {
          type: DataTypes.STRING(100),
        },
        email: {
          type: DataTypes.STRING(150),
          unique: true,
        },
        password: {
          type: DataTypes.STRING(150),
        },
        active: {
          type: DataTypes.BOOLEAN,
        },
        role: {
          type: DataTypes.ENUM(...Object.values( ROLES )),
          defaultValue: ROLES.USER,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        address: {
          type: DataTypes.STRING(200),
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: false,
        modelName: "User",
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Cart, {
      foreignKey: "user_id",
      as: "cart",
    });
    this.hasMany(models.Order, {
      foreignKey: "user_id",
      as: "orders",
    });
  }
}
