'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    product_description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity_in_stock: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    image_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};