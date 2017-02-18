console.log("main factory");
app.factory('mainFactory', ['$http', '$location', function($http, $location){
  var factory = {}

  var data = [];
  var pageCount = 1;

  //Call for CLOSED BUGG ISSUES
  factory.getBugData = function(callback){
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=all&per_page=100&page=1",
//       url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=open&per_page=100&page="+ openNumber,
    })
    .then(function(res){
      console.log("got it");
      callback(res.data);
      ////////////////////////////////////////
      ////dealing with Pagination:
      ////////////////////////////////////////

      // if (res.data.length == 0) {
      //   closedNumber = 1;
      //   callback(closedData);
      // }
      // else if(res.data.length > 0 && res.data.length < 100){
      //   closedData = closedData.concat(res.data);
      //   closedNumber = 1;
      //   callback(closedData)
      // }
      // else {
      //   closedData = closedData.concat(res.data);
      //   closedNumber++;
      //   factory.getClosedBugsData(callback);
      // }

    }).catch(function(err){
      console.log(err);
    })
  };

  return factory;
}])
