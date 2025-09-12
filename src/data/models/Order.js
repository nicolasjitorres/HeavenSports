import {Model} from "sequelize";
import { ORDER_STATUSES } from "../../constants/enums.js";

export default class Order extends Model {
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
        order_number: {
          type: DataTypes.STRING(100),
          unique: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
        total_amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(ORDER_STATUSES)),
          defaultValue: ORDER_STATUSES.PENDING,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "orders",
        timestamps: false,
        modelName: "Order",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.hasMany(models.OrderDetail, {
      foreignKey: "order_id",
      as: "order_details",
    });
    this.hasOne(models.Payment, {
      foreignKey: "order_id",
      as: "payment",
    });
  }
}