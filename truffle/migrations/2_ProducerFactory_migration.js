const ProducerFactory = artifacts.require("ProducerFactory");

module.exports = function (deployer) {
  deployer.deploy(ProducerFactory);
};
