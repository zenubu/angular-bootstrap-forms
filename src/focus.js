(function(){
'use strict';

angular.module('zenubu.input')
    .directive('focusInput', function($timeout) {
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
    }).directive('focusSelect', function($timeout) {
        return {
            link: function(scope, element) {
                element.bind('click', function() {
                    $timeout(function(){
                        angular.element(element.parent().find('button')[0]).scope().$select.activate();
                    });

                });
            }
        };
    });
})();