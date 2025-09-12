import { Model } from "sequelize";

export default class CartItem extends Model {
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
        cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "carts",
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
        tableName: "cart_items",
        timestamps: false,
        modelName: "CartItem",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      as: "cart",
    });

    this.belongsTo(models.Variant, {
      foreignKey: "variant_id",
      as: "variant",
    });
  }
}
