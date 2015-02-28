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