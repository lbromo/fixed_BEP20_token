const FixedToken = artifacts.require("FixedToken");

module.exports = function(deployer) {
  deployer.deploy(FixedToken, "Bromos€", "B€", 1);
};
