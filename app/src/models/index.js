const User = require("./User");
const WalletAddress = require("./WalletAddress");
const Transaction = require("./Transaction");

// Define relationships
User.hasMany(WalletAddress, {
  foreignKey: "user_id",
  as: "wallets",
});
WalletAddress.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Transaction, {
  foreignKey: "user_id",
  as: "transactions",
});
Transaction.belongsTo(User, { foreignKey: "user_id" });

WalletAddress.hasMany(Transaction, {
  foreignKey: "wallet_address_id",
  as: "transactions",
});
Transaction.belongsTo(WalletAddress, { foreignKey: "wallet_address_id" });

module.exports = {
  User,
  WalletAddress,
  Transaction,
};
