var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');
var bg3 = document.getElementById('background-stats-3');

app.controller('statsCtrl', function($scope){
  $scope.aPercent = 0;
  $scope.bPercent = 0;
  $scope.cPercent = 0;

  var updateScores = function(){
    socket.on('scores', function (json) {
       data = JSON.parse(json);
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);
       var c = parseInt(data.c || 0);

       var percentages = getPercentages(a, b, c);

       bg1.style.width = percentages.a.toPrecision(1) + "%";
       bg2.style.width = percentages.b.toPrecision(1) + "%";
       bg3.style.width = percentages.c.toPrecision(1) + "%";

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
         $scope.cPercent = percentages.c;
         $scope.total = a + b + c;
       });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function getPercentages(a, b, c) {
  var result = {};

  if (a + b + c > 0) {
    result.a = a / (a + b + c) * 100;
    result.b = b / (a + b + c) * 100;
    result.c = c / (a + b + c) * 100;
  } else {
    result.a = result.b = result.c = 0;
  }

  return result;
}