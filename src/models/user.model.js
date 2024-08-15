import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["cliente", "vendedor", "admin"],),
      defaultValue: "cliente",
    }
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

export default UserModel;