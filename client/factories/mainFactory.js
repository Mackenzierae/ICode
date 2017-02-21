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
        console.log("one page of raw data homie.......", res.data.length, res.data);
        //..Store/add data to data variable
        data = data.concat(res.data) || res.data;

        if (res.data.length == 100){
          //..Recurse to get another page of data
          pageNumber++;
          getPage();
        }
        else {
          //..We've called all pages of data
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
