const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const WalletAddress = sequelize.define(
  "WalletAddress",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users", // Target table
        key: "id", // Target column
      },
    },
    public_address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [32, 44], // Solana addresses are base58 encoded, between 32 and 44 characters long
      },
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "WalletAddresses",
    underscored: true,
  }
);

module.exports = WalletAddress;
