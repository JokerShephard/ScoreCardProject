'use strict';
MainApp.controller('RegisterController', ['$scope','$rootScope', '$http' , function($scope,$rootScope, $http){

  var refresh = function() {
      $http.get('/user').success(function(response) {
          console.log("I got the data I requested");

          $scope.userlist = response;
          $scope.user =   $scope.userlist[0];
      });
  };

  refresh();


  $scope.register = function() {
    console.log($scope.FormUser);
     $http.post('/user', $scope.FormUser).success(function(response) {
      console.log(response);
      $scope.FormUser = "";
  refresh();
     });
  };




  //============================== Remove ===================================

  $scope.remove = function(id) {
      console.log(id);
      $http.delete('/user/' + id).success(function(response) {
          refresh();
      });
  };

  //============================== Edit ===================================

  $scope.edit = function(id) {


      $http.get('/user/' + id).success(function(response) {
          $scope.user = response;


      });

  };

  //============================== Update ===================================

  $scope.update = function(id, data) {

console.log(id);
      console.log(data);

      $http.put('/user/' + id, data).success(function(response) {
          refresh();
      })
  };

  $scope.deselect = function() {
      $scope.user = "";
  }

}]);
