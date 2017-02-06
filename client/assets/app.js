var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'partials/main.html',
  })
  .when('/pageTwo',{
    templateUrl: 'partials/pageTwo.html',
  })
  // .otherwise({
  //   redirectTo: '/'
  // })
})
