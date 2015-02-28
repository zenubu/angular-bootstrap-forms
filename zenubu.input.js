(function () {
    'use strict';

    angular.module('zenubu.input',
        [
            'ui.select',
            'zenubu.input.passwordVerify',
            'zenubu.input.validatorRegex'
        ]
    );
})();
angular.module("zenubu.input").run(["$templateCache", function($templateCache) {$templateCache.put("zenubu.input/zenubuForm.tpl.html","<form name=\"Form\" ng-submit=\"submit()\" novalidate>\n\n    <div ng-transclude></div>\n\n</form>");
$templateCache.put("zenubu.input/zenubuInput.tpl.html","<ng-form name=\"innerForm\">\n    <div ng-class=\"{\'has-error\' : hasError()}\" class=\"form-group has-feedback\">\n        <div ng-class=\"{\'input-group\' : inputGroup}\">\n            <input type=\"{{validation.type}}\" class=\"form-control\" name=\"input\" ng-class=\"{\'input-lg\': large}\"\n                   ng-if=\"!sameAs\"\n                   ng-trim=\"false\" ng-model=\"model[field]\"\n                   ng-maxlength=\"{{validation.maxLength}}\" ng-minlength=\"{{validation.minLength}}\"\n                   ng-change=\"change\"\n                   validator-regex=\"{{validation.regex.pattern}}\"\n                   max=\"{{validation.max}}\" min=\"{{validation.min}}\" ng-required=\"{{validation.required}}\"\n                   placeholder=\"{{ placeholder |translate }}\">\n            <input type=\"{{validation.type}}\" class=\"form-control\" name=\"input\"\n                   ng-if=\"!!sameAs\"\n                   ng-change=\"change\"\n                   ng-trim=\"false\" ng-model=\"model[field]\"\n                   password-verify=\"model[sameAs]\"\n                   ng-maxlength=\"{{validation.maxLength}}\" ng-minlength=\"{{validation.minLength}}\"\n                   max=\"{{validation.max}}\" min=\"{{validation.min}}\" ng-required=\"validation.required\"\n                   placeholder=\"{{ placeholder |translate }}\">\n            <span class=\"fa fa-fw fa-asterisk single-input-feedback\" ng-class=\"{\'text-danger\' : hasError()}\"\n                  ng-if=\"validation.required\" focus-input></span>\n        </div>\n        <p ng-if=\"hasError()\" class=\"help-block\">\n            <label class=\"control-label\">\n                <span ng-show=\"innerForm.input.$error.validatorRegex\">{{ validation.regex.error | translate }}</br></span>\n                <span ng-show=\"innerForm.input.$error.email\">{{ \'EMAIL_ERROR\' | translate }}</br></span>\n                <span ng-show=\"innerForm.input.$error.number\">{{ \'NUMBER_ERROR\' | translate }}</br></span>\n                <span ng-show=\"innerForm.input.$error.required\">{{ \'REQUIRED_ERROR\' | translate }}</br></span>\n                <span ng-show=\"innerForm.input.$error.maxlength\">{{ \'MAXLENGTH_ERROR\' | translate:{length:validation.maxLength} }}</br></span>\n                <span ng-show=\"innerForm.input.$error.minlength\">{{ \'MINLENGTH_ERROR\' | translate:{length:validation.minLength} }}</br></span>\n                <span ng-show=\"innerForm.input.$error.max\">{{ \'MAX_ERROR\' | translate:{length:validation.max} }}</br></span>\n                <span ng-show=\"innerForm.input.$error.min\">{{ \'MIN_ERROR\' | translate:{length:validation.min} }}</br></span>\n                <span ng-show=\"innerForm.input.$error.passwordVerify\">{{ \'PASSWORD_NO_MATCH\' | translate }}</br></span>\n            </label>\n        </p>\n    </div>\n</ng-form>");
$templateCache.put("zenubu.input/zenubuReset.tpl.html","<a class=\"btn btn-primary no-icon\" ng-click=\"reset()\"\n   ng-disabled=\"isSaving() || isPristine() || disabled\">\n    <span ng-transclude></span>\n</a>");
$templateCache.put("zenubu.input/zenubuSelect.tpl.html","<div>\n    <div ng-switch=\"validation.type\" ng-class=\"{\'has-error\' : hasError()}\" class=\"form-group has-feedback\">\n\n        <div ng-switch-when=\"array\">\n            <ui-select ng-model=\"model[field]\"\n                       theme=\"bootstrap\" ng-required=\"{{validation.required}}\">\n                <ui-select-match placeholder=\"{{ placeholder |translate }}\">\n                    {{ $select.selected}}\n                </ui-select-match>\n                <ui-select-choices repeat=\"item in valueObject | filter: $select.search\">\n                    <div ng-bind-html=\"item | highlight: $select.search\"></div>\n                </ui-select-choices>\n            </ui-select>\n        </div>\n\n        <div ng-switch-when=\"translatableArray\">\n            <ui-select ng-model=\"model[field]\"\n                       theme=\"bootstrap\" ng-required=\"{{validation.required}}\">\n                <ui-select-match placeholder=\"{{ placeholder |translate }}\">\n                    {{ translatablePrefix + $select.selected.code | translate}}\n                </ui-select-match>\n                <ui-select-choices repeat=\"item.code as item in valueObject | filter: $select.search\">\n                    <div ng-bind-html=\" item.name | highlight: $select.search\"></div>\n                </ui-select-choices>\n            </ui-select>\n        </div>\n\n        <span class=\"select-feedback\" ng-if=\"validation.required\" focus-select ng-class=\"{\'text-danger\' : hasError()}\">\n            <i class=\"fa fa-fw fa-sort\"></i>\n            <i class=\"fa fa-fw fa-asterisk single-input-feedback\"></i>\n        </span>\n\n        <span class=\"fa fa-fw fa-sort single-input-feedback\"\n              ng-class=\"{\'text-danger\' : hasError()}\"\n              ng-if=\"!validation.required\"\n              focus-select></span>\n\n        <div ng-if=\"hasError()\" class=\"help-block\">\n            <label class=\"control-label\">\n                <span>{{ \'REQUIRED_ERROR\' | translate }}</span>\n            </label>\n        </div>\n    </div>\n</div>");
$templateCache.put("zenubu.input/zenubuSubmit.tpl.html","<button type=\"submit\" class=\"btn btn-primary no-icon\"\n        ng-disabled=\"isSaving() || disabled\">\n    <span ng-transclude></span>\n</button>");}]);
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
                    validationObject: '=?',
                    type: '@',
                    translatablePrefix: '@',
                    valueObject: '=',
                    name: '@',
                    value: '@'
                },
                templateUrl: 'zenubu.input/zenubuSelect.tpl.html',
                controller: ["$scope", "$filter", "$rootScope", function ($scope, $filter, $rootScope) {

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

                    $scope.hasError = function () {
                        return $scope.validation.required && ($scope.showValidation) && _.isEmpty($scope.model[$scope.field]);
                    };

                }],
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
                controller: ["$scope", function ($scope) {

                    this.scope = $scope;

                }],
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
                controller: ["$scope", function ($scope) {

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

                }],
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
                controller: ["$scope", "$timeout", function ($scope, $timeout) {
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

                }],
                transclude: true,
                templateUrl: 'zenubu.input/zenubuForm.tpl.html'
            };
        });
})();
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
(function(){
'use strict';

angular.module('zenubu.input')
    .directive('focusInput', ["$timeout", function($timeout) {
        return {
            link: function(scope, element) {
                element.bind('click', function() {
                        if(element.parent().find('input').length > 0){
                            $timeout(function() {
                                element.parent().find('input')[0].focus();
                            });
                        } else if(element.parent().find('textarea').length > 0) {
                            $timeout(function () {
                                element.parent().find('textarea')[0].focus();
                            });
                        }
                });
            }
        };
    }]).directive('focusSelect', ["$timeout", function($timeout) {
        return {
            link: function(scope, element) {
                element.bind('click', function() {
                    $timeout(function(){
                        angular.element(element.parent().find('button')[0]).scope().$select.activate();
                    });

                });
            }
        };
    }]);
})();