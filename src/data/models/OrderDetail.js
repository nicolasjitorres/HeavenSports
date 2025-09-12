import { Model } from "sequelize";

export default class OrderDetail extends Model {
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
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        unit_price: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        total_price: {
          type: DataTypes.BIGINT,
          allowNull: false,
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
        variant_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "variants",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
      },
      {
        sequelize,
        tableName: "order_details",
        timestamps: false,
        modelName: "OrderDetail",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
    this.belongsTo(models.Variant, {
      foreignKey: "variant_id",
      as: "variant",
    });
  }
}
