console.log("main factory");
app.factory('mainFactory', ['$http', '$location', function($http, $location){
  var factory = {}

  var closedData = [];
  var openData = [];
  var closedNumber = 1;
  var openNumber = 1;

  factory.getClosedBugsData = function(callback){
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=closed&page="+ closedNumber,
        // url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=open&per_page=100",
    })
    .then(function(res){
      console.log("in the response of the getData factory function");
      console.log(res.data.length);

      if (res.data.length == 0) {
        closedNumber = 1;
        callback(closedData);
      }
      else if(res.data.length > 0 && res.data.length < 30){
        for (var i = 0; i < res.data.length; i++){
          closedData.push(res.data[i]);
        }
        closedNumber = 1;
        callback(closedData)
      }
      else {
        for (var i = 0; i < res.data.length; i++){
          closedData.push(res.data[i]);
        }
        closedNumber++;
        factory.getClosedBugsData(callback);
      }
    }).catch(function(err){
      console.log(err);
    })
  };


  factory.getOpenBugsData = function(callback){
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=open&page="+ openNumber,
        // url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=open&per_page=100",
    })
    .then(function(res){
      console.log("in the response of the getData factory function");
      console.log(res.data.length);

      if (res.data.length == 0) {
        openNumber = 1;
        callback(openData);
      }
      else if(res.data.length > 0 && res.data.length < 30){
        for (var i = 0; i < res.data.length; i++){
          openData.push(res.data[i]);
        }
        openNumber = 1;
        callback(openData)
      }
      else {
        for (var i = 0; i < res.data.length; i++){
          openData.push(res.data[i]);
        }
        openNumber++;
        factory.getOpenBugsData(callback);
      }

    }).catch(function(err){
      console.log(err);
    })
  }




  return factory;
}])
