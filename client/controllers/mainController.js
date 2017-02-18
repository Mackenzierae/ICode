console.log("main controller");
app.controller('mainController', ["$scope", "mainFactory", function($scope, mainFactory){

  $scope.test = "main controller testingggg";

  var closedData = {};
  var openData = {};
  var checkForRandom = {};

  var weeksBackWeWantToLookAt = 11
  var millisecondsInOneWeek = 604800000;
  var currentTimeStamp = new Date();
  var currentDateUnix = Date.parse(currentTimeStamp);
  var blankWeeksAgoUnix = new Date(currentDateUnix - (millisecondsInOneWeek * weeksBackWeWantToLookAt))
  var closedSinceBlankWeeksAgoParam = blankWeeksAgoUnix.toISOString();

//FUNCTION TO GET DATA ABOUT ALL BUGG ISSUES:
  var getBugData = function(){
    mainFactory.getBugData(function(data){
      console.log(data.length, data);

      for (var i = 0; i < data.length; i++){

        var date = data[i].created_at;
        var week = moment(date).week();
        var year = moment(date).year();

        if (data[i].state == 'closed'){
          closedData[year] = closedData[year] || [];
          closedData[year][week] = closedData[year][week] || [];
          closedData[year][week].push(data[i]);
        }
        else if (data[i].state == 'open'){
          openData[year] = openData[year] || [];
          openData[year][week] = openData[year][week] || [];
          openData[year][week].push(data[i]);
        }
  }

      console.log("CLOSED DATA.....", closedData);
      console.log("OPEN DATA.....", openData);
      // console.log("RANDOM.....", checkForRandom);
    })
  }


  getBugData();
}])


///////...Average time to close bugs...//////////////
      // var createdAt = Date.parse(data[i].created_at);
      // var closedAt = Date.parse(data[i].closed_at);
      // var difference = closedAt - createdAt;
      // var oneDay = 86400;
      // var oneHour = 3600;
      // var days = (difference / 1000) / oneDay;
      // // closedData[week].push(data[i], "number of days from create to close..." + days);
//////////////////////////////////////////////////
