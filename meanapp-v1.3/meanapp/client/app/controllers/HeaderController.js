'use strict';
MainApp.controller('HeaderController', ['$scope','$rootScope', '$http' ,'$location', function($scope,$rootScope,$http,$location){

$scope.open = false;




$scope.isAllowed = function(role){

console.log('role is ' + role);
if(role != 'engineer'){
  return true;
}
else{
  return false;
}
refreshAppeals();
}



$scope.logout = function(){
refreshAppeals();
console.log('im logging out');
$rootScope.activeUser.success = false;
  $location.path('/login');
}




}]);
