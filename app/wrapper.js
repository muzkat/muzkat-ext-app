var muzkatApp = require('.');

var externalFile = {
    url: 'https://rawgit.com/muzkat/muzkatMap/master/public/js/muzkatmap.debug.js',
    cmp: 'muzkatMap'
};

var pt = new muzkatApp('MuzkatExtDemoApp', false, false, externalFile);
pt.launchApp();