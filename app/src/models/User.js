const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/database");

const User = sequelize.define(
  // Model definition
  "User", // Model name
  {
    // Attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Model-level configs
    underscored: true, // Use snake_case for database columns
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10); // Generate salt with cost factor of 10
          user.password_hash = await bcrypt.hash(user.password_hash, salt); // Replace plaintext with ciphertext
        }
      },
    },
  }
);

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password_hash;
  return values;
};

module.exports = User;
