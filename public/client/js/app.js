var app = angular.module('shortly', []);

app.controller('linksController', function($scope, getLinks) {
  $scope.links = [];

  getLinks.getLinks().then(function(links) {
    console.log(links, 'in controller');
    $scope.links = links.data;
  });
});

// app.controller('createController', function($scope) {
//   $scope.create;
// });

app.factory('getLinks', function($http) {

  return {
    getLinks: function() {
      return $http({
        method: 'GET',
        url: '/links'
      });
    }
  };
});


