'use strict';

var MainApp = angular.module('MainApp', ['ngRoute', 'ngAnimate']);


MainApp.filter('uniquemonth', function() {
    // we will return a function which will take in a collection
    // and a keyname
    Date.prototype.getMonthName = function() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[this.getMonth()];
    }

    return function(collection, month) {
        // we define our output and keys array;
        var output = [];


        // we utilize angular's foreach function
        // this takes in our original collection and an iterator function
        angular.forEach(collection, function(item) {
            // we check to see whether our object exists
            var keya = new Date(item.AuditDate);



            console.log('date month is ' + keya.getMonthName());
            if (keya.getMonthName() == month) { //well assuming your items are like this but you can test this and apply your logic
                output.push(item);
            }
        });
        return output;
    };
});

MainApp.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [];

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key);
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});


MainApp.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/Reports', {
            templateUrl: 'views/reports.html',
            controller: 'ReportsController'

        }).when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'

        }).when('/MyDraftQuestionnaires', {
            templateUrl: 'views/MyDraftQuestionnaires.html',
            controller: 'ManagementController'
        })
        .when('/MyPublishedQuestionnaires', {
            templateUrl: 'views/MyPublishedQuestionnaires.html',
            controller: 'ManagementController'
        })


        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })

        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'ManagementController'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/1on1', {
            templateUrl: 'views/1on1.html',
            controller: '1on1Controller'
        }).otherwise({

            redirectTo: '/login'
        });

}).run(['$rootScope', function() {}]);
