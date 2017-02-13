console.log("main factory");
app.factory('mainFactory', ['$http', '$location', function($http, $location){
  var factory = {}

  var closedData = [];
  var openData = [];
  var closedNumber = 1;
  var openNumber = 1;

  //Call for CLOSED BUGG ISSUES
  factory.getClosedBugsData = function(callback){
      //function(pagenumber, callback);
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=closed&per_page=100&page="+ closedNumber,
    })
    .then(function(res){
      console.log("res of closed bugggggzzzzzzzzz: length = ", res.data.length);
      // console.log("res.headers???:", res.headers('link'));
      ////////////////////////////////////////
      ////dealing with Pagination:
      ////////////////////////////////////////
      if (res.data.length == 0) {
        closedNumber = 1;
        callback(closedData);
      }
      else if(res.data.length > 0 && res.data.length < 100){
        closedData = closedData.concat(res.data);
        closedNumber = 1;
        callback(closedData)
      }
      else {
        closedData = closedData.concat(res.data);
        closedNumber++;
        factory.getClosedBugsData(callback);
      }
    }).catch(function(err){
      console.log(err);
    })
  };


  //Call for OPEN BUGG ISSUES
  factory.getOpenBugsData = function(callback){
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=open&per_page=100&page="+ openNumber,
    })
    .then(function(res){
      console.log("in the response of the getData factory function OPNENNNNNNNNNN:", res.data.length);
      ////////////////////////////////////////
      ////dealing with Pagination:
      ////////////////////////////////////////
      if (res.data.length == 0) {
        openNumber = 1;
        callback(openData);
      }
      else if(res.data.length > 0 && res.data.length < 100){
        openData = openData.concat(res.data);
        openNumber = 1;
        callback(openData)
      }
      else {
        openData = openData.concat(res.data);
        openNumber++;
        factory.getOpenBugsData(callback);
      }
    }).catch(function(err){
      console.log(err);
    })
  }




  return factory;
}])
