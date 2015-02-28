(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuInput', function () {
            return {
                restrict: 'E',
                replace: true,
                require: ['^zenubuForm', '?^zenubuInputGroup'],
                scope: {
                    inputModel: '=?model',
                    change: '=',
                    field: '@',
                    required: '=',
                    sameAs: '@',
                    placeholder: '@',
                    label: '@',
                    validationObject: '=?',
                    type: '@',
                    max: '=',
                    min: '=',
                    large: '=',
                    maxLength: '=',
                    minLength: '=',
                    regex: '='
                },
                templateUrl: 'zenubu.input/zenubuInput.tpl.html',
                controller: function ($scope) {

                    $scope.validation = {
                        type: $scope.type,
                        max: $scope.max,
                        min: $scope.min,
                        maxLength: $scope.maxLength,
                        minLength: $scope.minLength,
                        required: $scope.required,
                        regex: $scope.regex
                    };

                    $scope.hasError = function () {
                        return $scope.innerForm.input !== undefined &&
                            (($scope.innerForm.input.$dirty && $scope.innerForm.input.$touched) || $scope.showValidation) && !$scope.innerForm.input.$valid;
                    };

                },
                transclude: true,
                link: {
                    post: function (scope, element, attrs, ctrl, transclude) {

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

                        transclude(scope, function (clone) {
                            _.forEach(clone, function (x) {
                                if (angular.element(x).hasClass('prepend')) {
                                    element.children().children().prepend(x);
                                    scope.inputGroup = true;
                                }
                            });
                        });

                    }
                }
            };
        });
})();