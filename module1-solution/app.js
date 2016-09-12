(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  if (!String.prototype.trim) {
     String.prototype.trim = function () {
     return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
  };
  $scope.countLunchItems = function() {
  var msgResponse = lunchDishMessage($scope.lunchDishes);
  $scope.responseMessage = msgResponse;
  $scope.msgBorderColor = determineBorderColor(msgResponse);
  if (msgResponse === "undefined") {
    $scope.msgBorderStyle = ""
  }
  else {
    $scope.msgBorderStyle = 'solid';
  };
};

  function lunchDishMessage(lunchItems) {
    var numberOfDishes = 0;
    if (typeof lunchItems === "undefined"){
      lunchItems=" ";
    };
    var trimmedLunchDishes = new String;
    // if (!String.prototype.trim) {
    //    String.prototype.trim = function () {
    //    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    //     };
    // };
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
    //
  function calcNumberOfDishes(stringToSplit) {
      var separator = ',';
      var arrayOfDishes = stringToSplit.split(separator);
      return arrayOfDishes.length
    };
  function determineBorderColor(strMessage){
    var colorString='green';
    if (strMessage=="Please enter data first"){
      colorString = 'red';
    };
    return colorString;
  };
};
})();
