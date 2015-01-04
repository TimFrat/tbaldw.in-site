var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var projects = require('./collections/projects');
var AppView = require('./views/app');
var Pubsub = require('./lib/pubsub');
var AppState = require('./lib/app_state');
var projectsData = require('../projects.json');

var BACKSTRETCH_IMG_COUNT = 11; // in img/backstretch

// with browserify, we gotta tell Backbone to use this jquery
Backbone.$ = $;

// make a few things global
window.Pubsub = Pubsub;
window._ = _;
window.$ = $;

// for side-effects
require('./lib/router');

Pubsub.on('all', console.log.bind(console));
Pubsub.on('app:ready', function() {
    var history = Backbone.history;
    _.defer(history.start.bind(history, {'pushState': true}));
});

document.addEventListener('DOMContentLoaded', function() {
    var isMobile = window.outerWidth < 650 ? '-mobile' : '';
    var img = _.random(1, BACKSTRETCH_IMG_COUNT) + isMobile + '.jpg';
    var imgPath = 'img/backstretch/' + img;
    AppState.set('backstretch', imgPath);

    projects.set(projectsData);
    new AppView().render();
});
