console.log("main controller");
app.controller('mainController', ["$scope", "mainFactory", "$location", function($scope, mainFactory, $location){

  $scope.test = "main controller testingggg";

  var Closed = {};
  var Open = {};

  var getClosedBugsData = function(){
    console.log(" get some data function in controller");
    mainFactory.getClosedBugsData(function(data){
      console.log("CLOSED data:", data);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
      for (var i = 0; i < data.length; i++){
        // console.log(data[i].closed_at);
        var dateObject = new Date(data[i].closed_at)

        var year = 1900 + dateObject.getYear();
        var month = dateObject.getMonth();

        if (Closed[year]) {
            if (Closed[year][month]) {
              Closed[year][month].push(data[i]);
            }
            else {
              Closed[year][month] = [data[i]];
              }
            }
        else {
          Closed[year] = {};
          Closed[year][month] = [data[i]];
        }
      }
      console.log("$$$$$$$$$$$$$$$$$$$$$")
      console.log(Closed);
    })
  }

  var getOpenBugsData = function(){
    console.log(" get some data function in controller");
    mainFactory.getOpenBugsData(function(data){
      // console.log("OPEN data:", data);
      // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
    })
  }

  getClosedBugsData();
  getOpenBugsData();
}])
