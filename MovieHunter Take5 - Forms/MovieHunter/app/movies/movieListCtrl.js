(function () {
    "use strict";

    angular
    .module("movieHunter")
    .controller("MovieListCtrl",
                ["movieResource",
                    MovieListCtrl]);

    function MovieListCtrl(movieResource) {
        var vm = this;

        vm.movies = [];
        vm.title = "Search by Movie Title";
        vm.showImage = false;
        vm.message = "";

        vm.toggleImage = function () {
            vm.showImage = !vm.showImage;
        };

        movieResource.query(
            function (data) {
                vm.movies = data;
            },
            function (response) {
                vm.message = response.message + "\r\n";
                if (response.data && response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            }
       );
    }

}());

