import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class SaleModel extends Model {}

SaleModel.init(
  {
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM(['efectivo', 'debito', 'credito', 'tranferencia']),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Sale',
    timestamps: true,
  }
)

export default SaleModel;