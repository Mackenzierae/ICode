console.log("main factory");
app.factory('mainFactory', ['$http', '$location', function($http, $location){
  var factory = {}

  factory.getBugData = function(callback){
    var data = [];
    var pageNumber = 1

    function getPage() {
      $http({
        method: "get",
        url: "https://api.github.com/repos/babel/babel/issues?labels=bug&state=all&per_page=100&page="+ pageNumber,
      })
      .then(function(res){
        console.log("raw data homie.......", res.data.length, res.data);
        //Dealing with Pagination
        if (res.data.length == 100){
          data = data.concat(res.data) || res.data;
          pageNumber++;
          getPage();
        }
        else {
          data = data.concat(res.data) || res.data;
          pageNumber = 1;
          callback(data);
        }
      }).catch(function(err){
        console.log(err);
      })
    };
    getPage();
  };

  return factory;
}])
