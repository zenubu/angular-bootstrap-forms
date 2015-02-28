(function () {
    'use strict';

    angular.module('zenubu.input.passwordVerify', []).directive('passwordVerify', passwordVerify);

    function passwordVerify() {
        return {
            require: 'ngModel',
            scope: {
                passwordVerify: '='
            },
            link: function (scope, elem, attr, ngModel) {

                ngModel.$validators.passwordVerify = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return value === scope.passwordVerify;
                };
            }
        };
    }

})();