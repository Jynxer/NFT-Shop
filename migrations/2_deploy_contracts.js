const Airport = artifacts.require("Airport");

module.exports = function(deployer) {
  deployer.deploy(Airport);
};
