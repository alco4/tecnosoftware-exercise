var app = angular.module('myApp.companies', ['ngRoute']);
var companiesUrl = import('../../dataJson/companies.json')


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/companies', {
    templateUrl: 'components/companies/companies.html',
    controller: 'CompaniesCtrl'
  });
}])

app.factory('companiesFactory', function ($http) {
  return {
    getCompanies: function () {
      return $http.get('../../dataJson/companies.json');
    }
  }
});

app.factory('productsFactory', function ($http) {
  const promiseArray = [$http.get('../../dataJson/products0001.json'), $http.get('../../dataJson/products0002.json'), $http.get('../../dataJson/products0003.json')]
  return {
    getProducts: function () {
      return Promise.all(promiseArray);
    }
  }
});

app.factory('clientsFactory', function ($http) {
  const promiseArray = [$http.get('../../dataJson/clients0001.json'), $http.get('../../dataJson/clients0002.json'), $http.get('../../dataJson/clients0003.json')]

  return {
    getClients: function () {
      return Promise.all(promiseArray);
    }
  }
});

app.controller('CompaniesCtrl', ['$scope', "companiesFactory", "productsFactory", "clientsFactory", function ($scope, companiesFactory, productsFactory, clientsFactory) {
  companiesFactory.getCompanies().then(function (response) {
    $scope.companies = response.data.result.companies;
  });
  productsFactory.getProducts().then(function (response) {
    $scope.products = response;

  });
  clientsFactory.getClients().then(function (response) {
    $scope.clients = response;
  });
  $scope.showDetail = false;
}]);