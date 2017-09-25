var http = require('http');
module.exports = function(app, route) {

app.get('/home',function(req, res){
  console.log("im on home page");

});

app.get('/pulp', function(req, res) {
  http.request('http://15.215.1.163/pulp/report.php?month=May&pin=4ab56ed962', function(response) {
    response.pipe(res);
  }).on('error', function(e) {
    res.sendStatus(500);
  }).end();
});

  return function(req, res, next) {
    next();
  };
};
