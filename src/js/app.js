/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <lbromo@protonmail.ch> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * 
 * License originally authored by Poul-Henning Kamp (phk).
 * ----------------------------------------------------------------------------
 */

App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('FixedToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var FixedTokenArtifact = data;
      App.contracts.FixedToken = TruffleContract(FixedTokenArtifact);
    
      // Set the provider for our contract
      App.contracts.FixedToken.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.annotate();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
    $(document).on('click', '.btn-sell', App.handleSell);
  },

  annotate: function(){
    var contractInstance;
    App.contracts.FixedToken.deployed().then(function(instance) {
      contractInstance = instance;

      contractInstance.name().then(name => {
        $("title").text(`${name} Token Exchange`);
        $("h1").text(`${name} Token Exchange`);
      });

      contractInstance.symbol().then(symbol => {
        $("h3").text(`${symbol} - ETH exhange`);
      });
    });
  },

  handleBuy: function(event) {
    event.preventDefault();

    var contractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
      App.contracts.FixedToken.deployed().then(instance => {
        contractInstance = instance;

        return contractInstance.tokens_per_eth();
      }).then(val => {
        tokens_per_eth = val.toNumber()

        contractInstance.name().then(name => {
          contractInstance.symbol().then(symbol => {
            var tokens = prompt(`${name} tokens to buy\n ${tokens_per_eth} ${symbol} : 1 ETH`, "0");
            var eth_price = tokens / tokens_per_eth;
    
            contractInstance.buy({from: account, value: web3.toWei(eth_price, 'ether')})
          });
        });
      });
    });
  },

  handleSell: function(event) {
    event.preventDefault();

    var contractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
      App.contracts.FixedToken.deployed().then(instance => {
        contractInstance = instance;

        return contractInstance.tokens_per_eth();
      }).then(val => {
        tokens_per_eth = val.toNumber()

        contractInstance.name().then(name => {
          contractInstance.symbol().then(symbol => {
            var tokens = prompt(`${name} tokens to sell\n ${tokens_per_eth} ${symbol} : 1 ETH`, "0");
    
            contractInstance.sell(tokens, {from: account})
          });
        });
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
