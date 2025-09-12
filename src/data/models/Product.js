import { Model } from "sequelize";
import { BRANDS, CATEGORIES } from "../../constants/enums.js";

export default class Product extends Model {
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
        description: {
          type: DataTypes.STRING(200),
        },
        price: {
          type: DataTypes.INTEGER,
        },
        active: {
          type: DataTypes.BOOLEAN,
        },
        stock: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        category: {
          type: DataTypes.ENUM(...Object.values( CATEGORIES )),
        },
        brand: {
          type: DataTypes.ENUM(...Object.values( BRANDS )),
        },
      },
      {
        sequelize,
        tableName: "products",
        timestamps: false,
        modelName: "Product",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Variant, {
      foreignKey: "product_id",
      as: "variants",
    });
  }
}
