console.log("main controller");
app.controller('mainController', ["$scope", "mainFactory", "$location", function($scope, mainFactory, $location){

  $scope.test = "main controller testingggg";

  var closedData = {};
  var Open = {};

  //Easily change how many weeks we want to look at by changing the varible 'weeksBackWeWantToLookAt'
  //If we go past 52 we'd have to break down by year which the code doesn't currently support.
  //This can only apply to "closed" bug issues because Github API's 'since' param only looks at the "updated" time stamp.
    //We're assuming here that the closing of the issue would be the last it's updated...
    //but as you may notice we've got a random "week 41" straggler defying this system.
  var weeksBackWeWantToLookAt = 11
  var millisecondsInOneWeek = 604800000;
  var currentTimeStamp = new Date();
  var currentDateUnix = Date.parse(currentTimeStamp);
  var blankWeeksAgoUnix = new Date(currentDateUnix - (millisecondsInOneWeek * weeksBackWeWantToLookAt))
  var closedSinceBlankWeeksAgoParam = blankWeeksAgoUnix.toISOString();

//FUNCTION TO GET DATA ABOUT CLOSED BUGG ISSUES:
  var getClosedBugsData = function(){
    mainFactory.getClosedBugsData(closedSinceBlankWeeksAgoParam, function(data){
      console.log("ALL BUG ISSUES CLOSED WITHIN THE PAST " + weeksBackWeWantToLookAt + " WEEKS.....:", data);

      for (var i = 0; i < data.length; i++){
        var date = data[i].closed_at;
        var week = moment(date).week();
          if (closedData[week]) {
            closedData[week].push(data[i]);
          }
          else {
            closedData[week] = [data[i]];
          }
        }
        console.log("ALL CLOSED BUG ISSUES BROKEN DOWN WEEK BY WEEK......:", closedData);
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
