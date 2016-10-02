(function () {
'use strict';

angular.module('ShoppingApp', [])
.controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
.controller('ToBuyShoppingController', ToBuyShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService)
{
  var SLCtrl = this;

  SLCtrl.isTBCtrlLoaded = Boolean(0===1);
  SLCtrl.everthingBought = Boolean(0===1);
  SLCtrl.nothingBought = Boolean(1===1);
  SLCtrl.bLItems = ShoppingListCheckOffService.getItems('SLCtrl');

  SLCtrl.buyItem = function(thisItemName,thisItemQuantity)
  {
     ShoppingListCheckOffService.addItem(SLCtrl.bLItems,thisItemName,thisItemQuantity);
     SLCtrl.nothingBought = Boolean(0===1);
  }
};

// LIST To Buy - controller
ToBuyShoppingController.$inject = ['$scope','ShoppingListCheckOffService'];
function ToBuyShoppingController($scope,ShoppingListCheckOffService) {
  var TBCtrl = this;
  var tBItems = [];
  var TBCtrlLoaded = function () {
    return Boolean(TBCtrl.tbitems.length > 0);
  };

  TBCtrl.emptyListMessage = $scope.SLCtrl.everthingBought;
  TBCtrl.itemName = "";
  TBCtrl.itemQuantity = "";
  ShoppingListCheckOffService.LoadToBuyItems();
  TBCtrl.tbitems = ShoppingListCheckOffService.getItems('TBCtrl');

  TBCtrl.buyItem = function (itemIndex)
  {
    var thisItem = TBCtrl.tbitems[itemIndex];
    var thisItemName = thisItem.name;
    var thisItemQuantity = thisItem.quantity;
    var thisIndexValue  = itemIndex;
    $scope.SLCtrl.buyItem(thisItemName,thisItemQuantity);
    ShoppingListCheckOffService.removeItem(itemIndex);
    $scope.SLCtrl.everthingBought = Boolean(TBCtrl.tbitems.length < 1);
  };
};

// Service
function ShoppingListCheckOffService () {
  var service = this;
  var toBuyItems = [];
  var boughtItems = [];

  service.LoadToBuyItems = function ()
         {
          service.addItem(toBuyItems,"cookies", 12 );
          service.addItem(toBuyItems,"bag of potato chips", 1);
          service.addItem(toBuyItems,"celery stalk", 1);
          service.addItem(toBuyItems,"bunch of carrots", 1);
          service.addItem(toBuyItems,"hummus container", 1);
          service.addItem(toBuyItems,"glazed donuts",12);
   };

  service.addItem = function (itemArray,itemName, quantity)
  {
    var item = {
        name: itemName,
        quantity: quantity };
      itemArray.push(item);
  };

  service.removeItem = function (itemIndex)
  {
    toBuyItems.splice(itemIndex, 1);
  };

  service.getItems = function (CallingCtrl)
  {
    var items = [];
    if (CallingCtrl === 'SLCtrl')
      {items = boughtItems
      }
    else
      {items = toBuyItems
      };
    return items;
  };
};

})();
