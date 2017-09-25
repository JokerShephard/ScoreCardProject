'use strict';
MainApp.filter('uniquemonth', function() {
   // we will return a function which will take in a collection
   // and a keyname
   Date.prototype.getMonthName = function() {
       var monthNames = [ "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December" ];
       return monthNames[this.getMonth()];
   }
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [];
co
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var keya = new Date(item[keyname]);
          var key = item[keya];



          console.log('date month is ' + key.getMonthName());
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
