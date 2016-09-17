(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  // allows string methods to be used
  if (!String.prototype.trim) {
     String.prototype.trim = function () {
     return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
  };
  $scope.countLunchItems = function() {
  var msgResponse = lunchDishMessage($scope.lunchDishes);
  $scope.responseMessage = msgResponse;
};

  function lunchDishMessage(lunchItems) {
    var numberOfDishes = 0;
    if (typeof lunchItems === "undefined"){
      lunchItems=" ";
    };
    var trimmedLunchDishes = new String;
    trimmedLunchDishes = String(lunchItems);
    trimmedLunchDishes = trimmedLunchDishes.trim();
    var msgString="";
    if (trimmedLunchDishes.length == 0 ) {
      msgString= "Please enter data first";}
    else {
          numberOfDishes = calcNumberOfDishes(trimmedLunchDishes);
          if(numberOfDishes > 0 && numberOfDishes < 4) {
            msgString="Enjoy!";}
          else {
            msgString="Too much!";}
        };
    return msgString;
  };

 function calcNumberOfDishes(stringToSplit) {
     var separator = ',';
     var arrayOfDishes = stringToSplit.split(separator);
    return arrayOfDishes.length
  };
};
})();
