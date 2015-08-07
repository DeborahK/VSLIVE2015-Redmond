(function () {
    "use strict";

    angular
        .module("common.directives")
        .directive("duplicateTitleValidator",
                    ["$q",
                     "movieResource",
                     duplicateTitleValidator]);

    function duplicateTitleValidator($q, movieResource) {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                movieId: "=duplicateTitleValidator"
            },
            link: function (scope, element, attrs, ngModel) {

                ngModel.$asyncValidators.duplicateTitle = function (modelValue) {
                    var defer = $q.defer();

                    movieResource.get({ title: modelValue },
                        function (response) {
                            if (response.movieId != scope.movieId) {
                                // Found a row
                                defer.reject("Exists");
                            } else {
                                // Did not find a row
                                defer.resolve();
                            }
                        },
                        function (response) {
                            // Did not find a row
                            defer.resolve();
                        }
                    );
                    return defer.promise;
                }
            }
        }
    }

}());