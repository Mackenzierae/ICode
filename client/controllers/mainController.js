console.log("main controller");
app.controller('mainController', ["$scope", "mainFactory", function($scope, mainFactory){

  var closedData = {};
  var openData = {};

//FUNCTION TO GET DATA ABOUT ALL BUGG ISSUES:
  var getBugData = function(){
    var openCount = 0;
    var closedCount = 0;
    mainFactory.getBugData(function(data){
      console.log(data.length, data);

      for (var i = 0; i < data.length; i++){
        //...Grouping closed bug data weekly by closed_at date
        if (data[i].state == 'closed'){
          closedCount++;
          var date = data[i].closed_at;
          var week = moment(date).week();
          var year = moment(date).year();
          closedData[year] = closedData[year] || {};
          closedData[year][week] = closedData[year][week] || [];
          closedData[year][week].push(data[i]);
        }
        //...Grouping open bug data weekly by created_at date
        else if (data[i].state == 'open'){
          openCount++;
          var date = data[i].created_at;
          var week = moment(date).week();
          var year = moment(date).year();
          openData[year] = openData[year] || {};
          openData[year][week] = openData[year][week] || [];
          openData[year][week].push(data[i]);
        }
      }

      console.log("CLOSED DATA grouped weekly by closed date......", closedCount, closedData);
      console.log("OPEN DATA grouped weekly by created date.....",openCount, openData);
    })
  }


  getBugData();
}])


// var weeksBackWeWantToLookAt = 11
// var millisecondsInOneWeek = 604800000;
// var currentTimeStamp = new Date();
// var currentDateUnix = Date.parse(currentTimeStamp);
// var blankWeeksAgoUnix = new Date(currentDateUnix - (millisecondsInOneWeek * weeksBackWeWantToLookAt))
// var closedSinceBlankWeeksAgoParam = blankWeeksAgoUnix.toISOString();


///////...Average time to close bugs...//////////////
      // var createdAt = Date.parse(data[i].created_at);
      // var closedAt = Date.parse(data[i].closed_at);
      // var difference = closedAt - createdAt;
      // var oneDay = 86400;
      // var oneHour = 3600;
      // var days = (difference / 1000) / oneDay;
      // // closedData[week].push(data[i], "number of days from create to close..." + days);
//////////////////////////////////////////////////
