(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuInputGroup', function () {
            return {
                restrict: 'E',
                scope: {
                    model: '=?',
                    validationObject: '=?',
                    field: '@?',
                    show: '='
                },
                require: '^zenubuForm',
                controller: function ($scope) {

                    this.scope = $scope;

                },
                transclude: true,
                template: '<div ng-transclude ng-hide="show"></div>',
                link: {
                    pre: function (scope, element, attrs, ctrl) {
                        var ctrlScope = ctrl.scope;

                        if (ctrlScope.model !== undefined && ctrlScope.model.hasOwnProperty(scope.field)) {
                            scope.model = scope.model || ctrlScope.model[scope.field];
                        }

                        if (ctrlScope.validationObject !== undefined && ctrlScope.validationObject.hasOwnProperty(scope.field)) {
                            scope.validationObject = scope.validationObject || ctrlScope.validationObject[scope.field];
                        }

                    }
                }
            };
        });
})();