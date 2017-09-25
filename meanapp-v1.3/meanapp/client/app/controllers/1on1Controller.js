'use strict';

MainApp.controller('1on1Controller', ['$scope','$rootScope', '$location', '$http', function($scope,$rootScope, $location, $http) {


var Imsranks = [{name:"Support Request/APM/Major Functionality Issue", rank:8.5 }, {name:"Support Request/PC-ALM/Minor Functionality Issue", rank:6.5}, {name:"Support Request/MyAccount/Major Functionality Issue", rank:4},{name:"Support Request/QC-ALM/Major Functionality Issue", rank:8.5},{name:"Support Request/PC-ALM/Major Functionality Issue", rank:9.25},{name:"Support Request/StormRunner/Test Run Failure",
 rank:5.25},{name:"Support Request/SAW/System Down", rank:8.25},{name:"Support Request/QC-ALM/Minor Functionality Issue", rank:6.5}, {name:"Support Request/QC-ALM/System Down", rank:8.25}, {name:"Support Request/StormRunner/On Prem LG", rank:6.75}];

var SrRanks = [{name:"ast",rank:2},{name:"infra",rank:4},{name:"resetpass",rank:1},{name:"a",rank:5},{name:"b",rank:10},{name:"c",rank:3}];

var MohamadIms = ["Support Request/APM/Major Functionality Issue", "Support Request/PC-ALM/Minor Functionality Issue", "Support Request/MyAccount/Major Functionality Issue", "Support Request/QC-ALM/Major Functionality Issue", "Support Request/PC-ALM/Major Functionality Issue", "Support Request/PC-ALM/Minor Functionality Issue", "Support Request/QC-ALM/Major Functionality Issue", "Support Request/QC-ALM/Major Functionality Issue","Support Request/StormRunner/Test Run Failure", "Support Request/MyAccount/Major Functionality Issue" , "Support Request/SAW/System Down", "Support Request/SAW/System Down", "Support Request/QC-ALM/Minor Functionality Issue","Support Request/QC-ALM/System Down", "Support Request/SAW/System Down", "Support Request/QC-ALM/Major Functionality Issue", "xyz", "xyz"];

var PreetiIms = ["Support Request/QC-ALM/System Down","Support Request/QC-ALM/Major Functionality Issue","Support Request/PC-ALM/Major Functionality Issue", "xyz", "Support Request/QC-ALM/Major Functionality Issue", "xyz", "Support Request/QC-ALM/Minor Functionality Issue", "Support Request/StormRunner/On Prem LG","Support Request/SAW/System Down"];

var KassamSr = ["a","b","c","d"];
var kassamSec = ["ast","infra"];

  $http.get('/user').success(function(data) {
      console.log("I got the data I requested");

      $scope.engineerslist = data;
      //$scope.question = "";

  });

            function round(num){
     return Math.floor(num*10)/10;
 }
    //============================== Refresh ===================================
            var refresh = function(){
                $http.get('/1on1').success(function(response) {
                    console.log("I got the data I requested");
                    $scope.oneonone = response;
                });
            };

    //============================== Calculate Ranks Per Catalog ===============

var CalculateRanks = function (ResolvedItems, ranks){
var sum = 0;
var j;
var entry;
for (var i=0; i< ResolvedItems.length; i++){

for ( j = 0 ; j < ranks.length ; j++)
{
entry = ranks[j];

if( entry.name == ResolvedItems[i]){
  sum += entry.rank;
  break;
}
       }
       if(j == ranks.length){
        sum+=2;
       }
    }
    console.log(ResolvedItems);
    console.log(sum);
    return sum;

  };

  //============================== Calculate Ims Per Day =====================


  var ImsPerDayfunc = function (days, ResolvedItems, ranks){
    $scope.IMSPerDay = CalculateRanks(ResolvedItems,ranks)/days;
        $scope.totalIms = CalculateRanks(ResolvedItems,ranks);
  };

    //============================== Calculate SRs Per Day =====================

    var SrsPerDayfunc = function (days, resolvedItems,securityItems,ranks){
  $scope.SrSPerDay = (CalculateRanks(resolvedItems,ranks)+CalculateRanks(securityItems,ranks))/days;
      // $scope.totalIms = CalculateRanks(ResolvedItems,ranks);
};
    //============================== When you change engineers name ============
             $scope.onChangeEngineer = function(engineer){
               var user = JSON.parse(engineer);
               var config = {
                   params: {
                       Month: 'May',
                       UserId: user.Name
                   }
               }

              $http.get('http://15.224.229.39:3001/audit', config).success(function(response) {
                  $scope.engineerresponse = response;

var sumscore = 0;
var i=0;

 //  console.log('response is ' + JSON.stringify(response));
  for(i=0 ; i < response.length; i++){

   sumscore = parseInt(response[i].Score) + sumscore;


  }
 $scope.currentEngineerAverage = round(sumscore/i);
 $scope.numberOfTickets = i;

});

var Pulpconfig = {
    params: {
        pin: '4ab56ed962',
        month: 'May'
    }
}
$http.get('/pulp').success(function(response) {

    var mystring = user.Name;
var arr = mystring.split(" ", 2);

var firstWord = arr[0];   //the
var EngineerName = firstWord;
var regex = new RegExp( EngineerName, 'g' );
    var count = (response.match(regex) || []).length;
      $scope.PulpCounter = count;




//  console.log('response is ' + JSON.stringify(response));
// for(i=0 ; i < response.length; i++){
//
// sumscore = parseInt(response[i].Score) + sumscore;
//
//
// }
// $scope.currentEngineerAverage = round(sumscore/i);
// $scope.numberOfTickets = i;

});

ImsPerDayfunc(19.13,PreetiIms, Imsranks);
SrsPerDayfunc(10,KassamSr,kassamSec,SrRanks);
       }


        }]);
