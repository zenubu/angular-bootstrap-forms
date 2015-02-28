(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuSubmit', function () {
            return {
                restrict: 'E',
                replace: 'true',
                require: '^zenubuForm',
                scope: {
                    disabled: '='
                },
                transclude: true,
                templateUrl: 'zenubu.input/zenubuSubmit.tpl.html',
                link: function (scope, element, attrs, ctrl) {

                    scope.isSaving = function () {
                        return ctrl.isSaving();
                    };

                }
            };
        });
})();