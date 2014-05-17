var app = angular.module('shortly', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'linksController',
    // template: '<h1>HOME</h1>'
    templateUrl: 'client/templates/home.html'
  })
  .when('/create', {
    controller: 'createController',
    // template: '<h1>CREATE</h1>'
    templateUrl: 'client/templates/shorten.html'
  })
  .otherwise({redirectTo: '/trerereer'});
}]);

app.controller('linksController', function($scope, Links) {
  $scope.links = [];

  Links.getLinks().then(function(links) {
    $scope.links = links.data;
  });
});

app.controller('createController', function($scope, Links) {
  $scope.shorten = {};
  $scope.spinner = false;
  $scope.newLinks = false;
  $scope.shorten.submit = function() {
    $scope.failMessage = '';
    $scope.spinner = true;
    Links.postLinks($scope.shorten.url)
    .success(function(link) {
      console.log(link);
      $scope.spinner = false;
      $scope.newLinks = true;
      $scope.link = link;
    })
    .error(function() {
      console.log('gets to failure');
      $scope.failMessage = 'Not a valid URL, try again';
      $scope.spinner = false;
    });
  };
});

app.factory('Links', function($http) {
  return {
    getLinks: function() {
      return $http({
        method: 'GET',
        url: '/links'
      });
    },

    postLinks: function(link) {
      console.log('posting link');
      return $http.post('/links', {url: link});
    }
  };
});


