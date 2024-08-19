import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class User_ProductModel extends Model{}

User_ProductModel.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User_Product',
    timestamps: true,
  }
)

export default User_ProductModel;