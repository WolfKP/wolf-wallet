const User = require("./User");
const Wallet = require("./Wallet");
const Transaction = require("./Transaction");

// Define relationships
User.hasMany(Wallet, {
  foreignKey: "user_id",
  as: "wallets",
});
Wallet.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Transaction, {
  foreignKey: "user_id",
  as: "transactions",
});
Transaction.belongsTo(User, { foreignKey: "user_id" });

Wallet.hasMany(Transaction, {
  foreignKey: "wallet_address_id",
  as: "transactions",
});
Transaction.belongsTo(Wallet, { foreignKey: "wallet_address_id" });

module.exports = {
  User,
  Wallet,
  Transaction,
};
