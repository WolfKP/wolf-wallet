const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define(
  "Transaction",
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
        model: "Users",
        key: "id",
      },
    },
    wallet_address_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "WalletAddresses",
        key: "id",
      },
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("send", "receive"),
      allowNull: false,
    },
    from_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 9),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "failed"),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Transaction;
