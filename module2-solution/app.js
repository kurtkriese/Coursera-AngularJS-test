(function () {
'use strict';

angular.module('ShoppingApp', [])
.controller('ToBuyController', ToBuyController)
.controller('BLCtrlController', BLCtrlController)
.controller('ShoppingListController',ShoppingListController)
.factory('ShoppingListServiceFactory', ShoppingListServiceFactory);

ShoppingListController.$inject = ['$scope','ShoppingListServiceFactory'];
function ShoppingListController($scope,ShoppingListServiceFactory) {
  $scope.SLCtrl = this;
  var SLCtrl = this;
  var shoppingListService = ShoppingListServiceFactory();

  SLCtrl.isTBCtrlLoaded = Boolean(0===1);
  SLCtrl.everthingBought = Boolean(0===1);
  SLCtrl.nothingBought = Boolean(1===1);
  SLCtrl.bLItems = shoppingListService.getItems();

  SLCtrl.buyItem = function(thisItemName,thisItemQuantity) {
//     buyThisItem = Boolean(1===1);
     console.log("SLCtrl $scope: ", $scope);
     shoppingListService.addItem(thisItemName,thisItemQuantity);
     SLCtrl.nothingBought = Boolean(0===1);
  }
};

// LIST To Sell - controller
ToBuyController.$inject = ['$scope','ShoppingListServiceFactory'];
function ToBuyController($scope,ShoppingListServiceFactory) {
  var TBCtrl = this;
  $scope.TBCtrl=this;

  var toBuyShoppingList = ShoppingListServiceFactory();

  TBCtrl.tbitems = toBuyShoppingList.getItems();

  var TBCtrlLoaded = function () {
    return Boolean(TBCtrl.tbitems.length > 0);
  };

if (!$scope.SLCtrl.isTBCtrlLoaded) {
    toBuyShoppingList.addItem("cookies", 12 );
    toBuyShoppingList.addItem("bag of potato chips", 1);
    toBuyShoppingList.addItem("celery stalk", 1);
    toBuyShoppingList.addItem("bunch of carrots", 1);
    toBuyShoppingList.addItem("hummus container", 1);
    toBuyShoppingList.addItem("glazed donuts",12);
    $scope.SLCtrl.isTBCtrlLoaded = TBCtrlLoaded();
 };

  TBCtrl.emptyListMessage = $scope.SLCtrl.everthingBought;
  TBCtrl.itemName = "";
  TBCtrl.itemQuantity = "";

  TBCtrl.addItem = function () {
    toBuyShoppingList.addItem(TBCtrl.itemName, TBCtrl.itemQuantity);
  };

   TBCtrl.buyItem = function (itemIndex) {
    var thisItem = TBCtrl.tbitems[itemIndex];
    var thisItemName = thisItem.name;
    var thisItemQuantity = thisItem.quantity;
    var thisIndexValue  = itemIndex;
    $scope.SLCtrl.buyItem(thisItemName,thisItemQuantity);
    toBuyShoppingList.removeItem(itemIndex);
    $scope.SLCtrl.everthingBought = Boolean(TBCtrl.tbitems.length < 1);
 };
};

// Bought Items - controller
 BLCtrlController.$inject = ['$scope'];
 function BLCtrlController($scope) {
   var BLCtrl = this;
   $scope.BLCtrl=this;
   var sLCtrl = $scope.SLCtrl;

  BLCtrl.items = sLCtrl.bLItems;
  BLCtrl.itemQuantity = "";
};

// Service
function ShoppingListService() {
  var service = this;
   var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

function ShoppingListServiceFactory() {
  var factory = function () {
    return new ShoppingListService();
  };

  return factory;
}

})();
