import { Model } from "sequelize";
import { PAYMENT_METHODS, PAYMENT_STATUSES } from "../../constants/enums.js";

export default class Payment extends Model {
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
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "orders",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        method: {
          type: DataTypes.ENUM(...Object.values(PAYMENT_METHODS)),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(PAYMENT_STATUSES)),
          allowNull: false,
        },
        transaction_id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "payments",
        timestamps: false,
        modelName: "Payment",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }
}
