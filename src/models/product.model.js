import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.js";

class ProductModel extends Model {}

ProductModel.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Product",
    timestamps: true,
  }
);

export default ProductModel;