'use strict';
MainApp.filter('FilterByMonth', function () {
  return function (items, month) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if ( item.MirageDate.getMonth() == month) { //well assuming your items are like this but you can test this and apply your logic
        filtered.push(item);
      }
    }
    return filtered;
  };
});
