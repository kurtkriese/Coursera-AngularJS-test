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
  var buyItemQuantity = null;
  var buyItemName = "";
  var buyThisItem = Boolean(0===1);
  SLCtrl.isTBCtrlLoaded = Boolean(0===1);
//  var blItems [];
  SLCtrl.bLItems = shoppingListService.getItems();

  SLCtrl.buyItem = function(thisItemName,thisItemQuantity) {
//      var thisItem = TBCtrl.items[itemIndex]();
     buyItemName = thisItemName;
     buyItemQuantity = thisItemQuantity;
     buyThisItem = Boolean(1===1);
     console.log("SLCtrl $scope: ", $scope);
//    var test2 = SLCtrl.BLCtrl.buyItem(thisItemName,thisItemQuantity);
     shoppingListService.addItem(thisItemName,thisItemQuantity);
//     TBCtrl.removeItem(itemIndex);
  }
};

// LIST #1 - controller
ToBuyController.$inject = ['$scope','ShoppingListServiceFactory'];
//ToBuyController.$inject = ['ShoppingListServiceFactory'];
function ToBuyController($scope,ShoppingListServiceFactory) {
  var TBCtrl = this;
  $scope.TBCtrl=this;

  var toBuyShoppingList = ShoppingListServiceFactory();

  TBCtrl.tbitems = toBuyShoppingList.getItems();

  var TBCtrlLoaded = function () {
    return Boolean(TBCtrl.tbitems.length > 0);
  };

  //$scope.SLCtrl.isTBCtrlLoaded = TBCtrlLoaded();

//  if (!isTBCtrlLoaded) {
if (!$scope.SLCtrl.isTBCtrlLoaded) {
    toBuyShoppingList.addItem("cookies", 12 );
    toBuyShoppingList.addItem("bag of potato chips", 1);
    toBuyShoppingList.addItem("celery stalk", 1);
    toBuyShoppingList.addItem("bunch of carrots", 1);
    toBuyShoppingList.addItem("hummus container", 1);
    toBuyShoppingList.addItem("glazed donuts",12);
    $scope.SLCtrl.isTBCtrlLoaded = TBCtrlLoaded();
 };

  TBCtrl.emptyListMessage = Boolean(TBCtrl.tbitems.length < 1);
  TBCtrl.itemName = "";
  TBCtrl.itemQuantity = "";

  TBCtrl.addItem = function () {
    toBuyShoppingList.addItem(TBCtrl.itemName, TBCtrl.itemQuantity);
  };

   TBCtrl.buyItem = function (itemIndex) {
    var thisItem = TBCtrl.tbitems[itemIndex];
    var thisItemName = (thisItem.name);
    var thisItemQuantity = thisItem.quantity;
    var thisIndexValue  = itemIndex;
    // console.log("thisItem = ",thisItem );
    // console.log("thisItemName = ",thisItemName );
    // console.log("thisItemQuantity = ",thisItemQuantity );
    // console.log("thisIndexValue = ",thisIndexValue );
  //  $scope.SLCtrl.buyItem(TBCtrl.tbitems.name[itemIndex], TBCtrl.tbitems.quantity[itemIndex]);
    $scope.SLCtrl.buyItem(thisItemName,thisItemQuantity);
    toBuyShoppingList.removeItem(itemIndex);
 };
};

// LIST #2 - controller
 BLCtrlController.$inject = ['$scope','ShoppingListServiceFactory'];
 function BLCtrlController($scope,ShoppingListServiceFactory) {
//BLCtrlController.$inject = ['ShoppingListServiceFactory'];
//function BLCtrlController(ShoppingListServiceFactory) {
  var BLCtrl = this;
   $scope.BLCtrl=this;
 var sLCtrl = $scope.SLCtrl;
  // Use factory to create new shopping list service
  var boughtShoppingList = ShoppingListServiceFactory();

  //BLCtrl.items = boughtShoppingList.getItems();
  BLCtrl.items = sLCtrl.bLItems;
  BLCtrl.emptyListMessage = function() {
     Boolean(sLCtrl.items.length < 1)
   };
  BLCtrl.itemName = "";
  BLCtrl.itemQuantity = "";

  // BLCtrl.buyItem = function (itemName, itemQuantity) {
  //   if (sLCtrl.buyThisItem) {
  //     boughtShoppingList.addItem(sLCtrl.buyItemName, sLCtrl.buyItemQuantity);
  //   }
  //}
};

// Service
function ShoppingListService() {
  var service = this;

  // List of shopping items
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
