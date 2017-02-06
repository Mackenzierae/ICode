var mongoose = require('mongoose');
var PRs = require('./../controllers/pullReq.js')

module.exports = function(app){
  console.log("in server routes");

  app.post('/storePR', PRs.storePullRequests);

}
