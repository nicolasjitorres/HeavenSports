import { Model } from "sequelize";
import { SIZES } from "../../constants/enums.js";

export default class Variant extends Model {
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
        additional_price: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        stock: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        size: {
          type: DataTypes.ENUM(...Object.values( SIZES )),
        },
        color: {
          type: DataTypes.STRING(50),
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        tableName: "variants",
        timestamps: false,
        modelName: "Variant",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    this.hasMany(models.CartItem, {
      foreignKey: "variant_id",
      as: "cart_items",
    });
    this.hasMany(models.OrderDetail, {
      foreignKey: "variant_id",
      as: "order_details",
    });
  }
}
