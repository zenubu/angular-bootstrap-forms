(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuReset', function () {
            return {
                restrict: 'E',
                replace: 'true',
                require: '^zenubuForm',
                scope: {
                    disabled: '='
                },
                transclude: true,
                templateUrl: 'zenubu.input/zenubuReset.tpl.html',
                link: function (scope, element, attrs, ctrl) {

                    scope.isSaving = function () {
                        return ctrl.isSaving();
                    };

                    scope.isPristine = function () {
                        return ctrl.isPristine();
                    };

                    scope.reset = function () {
                        return ctrl.reset();
                    };

                }
            };
        });
})();