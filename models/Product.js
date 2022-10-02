// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // id column is primary key, to be referenced in other models 
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    }, 

    product_name: {
      type: DataTypes.STRING, 
      // no empty string entries 
      allowNull: false, 
    }, 

    price: {
      type: DataTypes.DECIMAL, 
      allowNull: false, 
      // validation provided by sequelize to ensure correct data type
      validate: {
        isDecimal: true
      }
    }, 

    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 1, 
      validate: {
        isNumeric: true
      }
    }, 

    category_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'category', 
        key: 'id'
      }
    }
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
