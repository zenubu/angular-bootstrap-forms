(function () {
    'use strict';

    angular.module('zenubu.input.validatorRegex', []).directive('validatorRegex', validatorRegex);

    function validatorRegex() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {

                var pattern = new RegExp(attr.validatorRegex);

                ngModel.$validators.validatorRegex = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;

                    if (_.isString(value) && _.isString(attr.validatorRegex)) {
                        return pattern.test(value);
                    }

                    return true;
                };

            }
        };
    }

})();