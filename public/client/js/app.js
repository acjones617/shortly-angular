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

  $scope.search = '';

  Links.getLinks().then(function(links) {
    $scope.predicate = '-visits';
    $scope.links = links.data;
    console.log(links.data);
  });
});

app.controller('createController', function($scope, Links) {
  $scope.pattern = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i
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


