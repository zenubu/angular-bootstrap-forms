(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuSelect', function () {
            return {
                restrict: 'E',
                replace: true,
                require: ['^zenubuForm', '?^zenubuInputGroup'],
                scope: {
                    inputModel: '=?model',
                    field: '@',
                    required: '=',
                    placeholder: '@',
                    label: '@',
                    validationObject: '=?',
                    type: '@',
                    translatablePrefix: '@',
                    valueObject: '=',
                    name: '@',
                    value: '@'
                },
                templateUrl: 'zenubu.input/zenubuSelect.tpl.html',
                controller: function ($scope, $filter, $rootScope) {

                    $scope.values = {};

                    $scope.validation = {type: $scope.type, required: $scope.required};

                    if ($scope.type === 'translatableArray') {
                        var newValues = [];
                        $scope.valueObject.forEach(function (key) {
                            newValues.push({code: key, name: key});
                        });
                        $scope.valueObject = $filter('translateAndSortLocalizedObjectArrayByKey')(newValues, 'name', $scope.translatablePrefix);
                        $scope.name = 'name';
                        $scope.value = 'code';

                        $rootScope.$on('$translateChangeSuccess', function () {
                            $scope.valueObject = $filter('translateAndSortLocalizedObjectArrayByKey')(newValues, 'name', $scope.translatablePrefix);
                        });

                    }

                    $scope.hasLabel = !!$scope.label;

                    $scope.hasError = function () {
                        return $scope.validation.required && ($scope.showValidation) && _.isEmpty($scope.model[$scope.field]);
                    };

                },
                link: {
                    post: function (scope, element, attrs, ctrl) {

                        var validationObject = scope.validationObject;

                        ctrl[0].addToCallBacks(function () {
                            scope.showValidation = true;
                        });

                        if (ctrl[1] !== undefined && ctrl[1] !== null) {
                            scope.model = scope.inputModel || ctrl[1].scope.model;
                            validationObject = validationObject || ctrl[1].scope.validationObject;
                        }

                        scope.model = scope.model || scope.inputModel || ctrl[0].scope.model;

                        scope.originalValue = scope.model[scope.field];

                        scope.$on('reset', function () {
                            scope.model[scope.field] = scope.originalValue;
                        });


                        validationObject = validationObject || ctrl[0].scope.validationObject;

                        if (_.isObject(validationObject) && validationObject.hasOwnProperty(scope.field)) {
                            scope.validation = _.defaults(scope.validation, validationObject[scope.field]);
                        }

                    }
                }
            };
        });
})();