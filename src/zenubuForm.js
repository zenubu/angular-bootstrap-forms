(function () {
    'use strict';

    angular.module('zenubu.input')
        .directive('zenubuForm', function () {
            return {
                restrict: 'E',
                replace: 'true',
                scope: {
                    submitFunction: '=',
                    model: '=',
                    validationObject: '=?'
                },
                controller: function ($scope, $timeout) {
                    var callbacks = [];

                    this.scope = $scope;

                    var saving = false;

                    $scope.submit = function () {
                        if ($scope.Form.$valid) {
                            saving = true;
                            var promise = $scope.submitFunction($scope.model);
                            if (_.isObject(promise) && promise.hasOwnProperty('then')) {
                                promise
                                    .then(function () {
                                        $scope.Form.$setPristine();
                                    })
                                    .finally(function () {
                                        saving = false;
                                    });
                            }
                            return;
                        }
                        saving = false;
                        callbacks.forEach(function (cbFunction) {
                            cbFunction();
                        });
                    };

                    this.reset = function () {
                        $scope.$parent.$broadcast('reset');
                        $timeout(function () {
                            $scope.Form.$setPristine(true);
                        });

                    };

                    this.addToCallBacks = function (cb) {
                        return callbacks.push(cb);
                    };

                    this.isSaving = function () {
                        return saving;
                    };

                    this.isPristine = function () {
                        return $scope.Form.$pristine;
                    };

                },
                transclude: true,
                templateUrl: 'zenubu.input/zenubuForm.tpl.html'
            };
        });
})();