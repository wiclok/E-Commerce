import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db.js";

class UserModel extends Model {}

UserModel.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["client", "seller", "admin"],),
      defaultValue: "client",
    }
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

export default UserModel;