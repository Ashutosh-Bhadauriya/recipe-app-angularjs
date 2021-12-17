var myApp = angular.module("myApp", [
  "ngRoute",
  "angularUtils.directives.dirPagination",
]);

myApp.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/home.html",
        controller: "AppController",
      })
      .when("/recipeDetails/:id", {
        templateUrl: "views/recipeDetail.html",
        controller: "RecipeDetailController",
      });
  },
]);

myApp.controller("AppController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.$watch("search", function () {
      fetch();
    });
    $scope.search = "Chicken";

    $scope.diplayDetails = function (uri) {
      console.log(uri);
      var id = uri.substr(uri.length - 32);
      console.log(id);
      $location.path("/recipeDetails/" + id);
    };

    function fetch() {
      $http
        .get(
          "https://api.edamam.com/search?q=" +
            $scope.search +
            "&app_id=4d537151&app_key=d9d78d79041c87d45d61f24146cf7da5&from=0&to=100"
        )
        .then(function (response) {
          $scope.recipesResponse = response.data;
          $scope.recipes = $scope.recipesResponse.hits;
          console.log($scope.recipesResponse);
          console.log($scope.recipes);
        });
    }
  },
]);

myApp.controller("RecipeDetailController", [
  "$scope",
  "$http",
  "$routeParams",
  function ($scope, $http, $routeParams) {
    console.log($routeParams.id);
    $http
      .get(
        "https://api.edamam.com/api/recipes/v2/" +
          $routeParams.id +
          "?type=public&app_id=4d537151&app_key=d9d78d79041c87d45d61f24146cf7da5"
      )
      .then(function (response) {
        $scope.recipesResponse = response.data;
        $scope.recipe = $scope.recipesResponse.recipe;
        console.log($scope.recipesResponse);
        console.log($scope.recipe);
      });
  },
]);
