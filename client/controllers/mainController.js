console.log("main controller");
app.controller('mainController', ["$scope", "mainFactory", function($scope, mainFactory){

  $scope.test = "main controller testingggg";

  var closedData = {};
  var openData = {};

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
      console.log("ALL BUG ISSUES CLOSED WITHIN THE PAST " + weeksBackWeWantToLookAt + " WEEKS.....:", data.length, data);

      for (var i = 0; i < data.length; i++){
        ///////...Average time to close bugs...//////////////
              // var createdAt = Date.parse(data[i].created_at);
              // var closedAt = Date.parse(data[i].closed_at);
              // var difference = closedAt - createdAt;
              // var oneDay = 86400;
              // var oneHour = 3600;
              // var days = (difference / 1000) / oneDay;
              // // closedData[week].push(data[i], "number of days from create to close..." + days);
        //////////////////////////////////////////////////
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




//FUNCTION TO GET ALL DATA ABOUT OPEN BUGG ISSUES:
  var getOpenBugsData = function(){
    mainFactory.getOpenBugsData(function(data){
      console.log("DATA FOR ALL BUGS THAT ARE OPEN.......", data.length, data);
      for (var i = 0; i < data.length; i++){
        var date = data[i].created_at;
        var week = moment(date).week();
        var year = moment(date).year();
        if (openData[year]) {
            if (openData[year][week]) {
              openData[year][week].push(data[i]);
            }
            else {
              openData[year][week] = [data[i]];
              }
            }
        else {
          openData[year] = {};
          openData[year][week] = [data[i]];
        }
      }
    })
    console.log("ALL OPEN BUG ISSUES BROKEN DOWN WEEK BY WEEK......:", openData);
  }

  getClosedBugsData();
  getOpenBugsData();
}])
