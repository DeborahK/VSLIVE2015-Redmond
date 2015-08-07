(function () {
    "use strict";

    angular
        .module("common.directives")
        .directive("directorMinRatingValidator",
                    [directorMinRatingValidator]);

    // If director contains "Jackson" don't allow a rating less than 4 stars
    function directorMinRatingValidator() {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                // Prefix "=" => two-way binding
                director: "=directorMinRatingValidator"
            },
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.directorMinRating = function (modelValue) {
                    if (scope.director.indexOf("Jackson") > -1) {
                        if (modelValue >= 4) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                };

                // Automatically watches the star rating.
                // Add a watch for the director as well.
                scope.$watch("director", function () {
                    ngModel.$validate();
                });
            }
        }
    }

}());