(function () {
    "use strict";

    // To use the mocking inject : "movieResourceMock"

    // To use Web API
    var app = angular.module("movieHunter",
                            ["ngRoute",
                            "ngMessages",
                            "common.services",
                            "common.directives"]);

    app.config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl : "app/welcomeView.html"
                })
                .when("/searchByTitle", {
                    templateUrl : "app/movies/movieListView.html",
                    controller : "MovieListCtrl as vm"
                })
                .when("/showDetail/:movieId", {
                    templateUrl : "app/movies/movieDetailView.html",
                    controller : "MovieDetailCtrl as vm"
                })
                .when("/editMovie/:movieId", {
                    templateUrl: "app/movies/movieEditView.html",
                    controller: "MovieEditCtrl as vm"
                })
                .otherwise("/");
        }]);
}());