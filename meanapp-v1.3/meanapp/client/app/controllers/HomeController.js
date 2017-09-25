'use strict';
MainApp.controller('HomeController', ['$scope', '$http' , function($scope, $http){





}]);

// 'use strict';
// MainApp.controller('HomeController', ['$scope', '$rootScope','$http' , function($scope,$rootScope,$http){
//
//
//   // Define the string
//       var string = $rootScope.activeUser.user.Name + ":" + $rootScope.activeUser.user.Password;
//
//       // Encode the String
//       var encodedString = btoa(string);
//
//       $http({method: 'GET', url: '/audit',
//     headers: { 'Authorization': 'Basic ' + encodedString }
// })
// .success(function(data, status){
//   console.log(data);
// $scope.audits = data;
// });
//
//
//      $scope.Appeal = function (audit){
//
// audit.IsAppealed = "Yes";
// console.log('appealed audit is ' + JSON.stringify(audit));
//
// $http.put('/audit/' + audit._id, audit).success(function(response) {
//
// })
//      }
//
//
//      function round(num){
//          return Math.floor(num*10)/10;
//      }
//
//
//      $scope.getAverage = function (audit,role){
//
// var sumscore = 0;
// var i=0;
//
// if(role == 'engineer'){
//
// $http.get('/audit?UserId='+ audit.UserId + '&Month=' + audit.Month+'&Year='+audit.Year).success(function(response) {
// //  console.log('response is ' + JSON.stringify(response));
// for(i=0 ; i < response.length; i++){
//
//  sumscore = parseInt(response[i].Score) + sumscore;
//
//
// }
// $scope.currentEngineerAverage = round(sumscore/i);
// $scope.numberOfTickets = i;
//
// });
// }
// else{
//   $scope.currentEngineerAverage = "";
// }
//      }
//
// }]);
