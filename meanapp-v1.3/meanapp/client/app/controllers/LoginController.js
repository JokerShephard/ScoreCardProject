'use strict';

MainApp.controller('LoginController', ['$scope','$rootScope', '$http' , '$location' ,function($scope,$rootScope, $http, $location){

 $scope.login = function(){

  $http.post('/login', $scope.loginForm).success(function(response) {

      console.log(response);

      if(!!response.success){
        $rootScope.activeUser = response;
console.log('yaaa bilal' + JSON.stringify($rootScope.activeUser));
        console.log($rootScope);
        $location.path('/home');
      }
      else{

$scope.couldnotlogin = response;

      }




  });
}
}]);
