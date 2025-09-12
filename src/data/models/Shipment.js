import {Model} from "sequelize";
import { SHIPMENT_STATUSES } from "../../constants/enums.js";

export default class Shipment extends Model {
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
        address: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        postal_code: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        shipped_at: {
          type: DataTypes.DATE,
        },
        delivery_estimate: {
          type: DataTypes.DATE,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(SHIPMENT_STATUSES)),
          allowNull: false,
        },
        amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "shipments",
        timestamps: false,
        modelName: "Shipment",
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