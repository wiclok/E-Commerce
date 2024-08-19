import sequelize from './db.js';
import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';
import SaleModel from '../models/sale.model.js';
import User_ProductModel from '../models/user_product.model.js';

UserModel.belongsToMany(ProductModel, { through: User_ProductModel });
ProductModel.belongsToMany(UserModel, { through: User_ProductModel });

SaleModel.belongsToMany(UserModel, { through: 'User_Sales' });
UserModel.belongsToMany(SaleModel, { through: 'User_Sales' });

export default sequelize