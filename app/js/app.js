var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var projects = require('./collections/projects');
var AppView = require('./views/app');
var Router = require('./lib/router');
var Pubsub = require('./lib/pubsub');
var AppState = require('./lib/app_state');

var BACKSTRETCH_IMG_COUNT = 11; // in img/backstretch

// with browserify, we gotta tell Backbone to use this jquery
Backbone.$ = $;

// make a few things global
window.Pubsub = Pubsub;
window._ = _;
window.$ = $;

// use Mustache-style templating
_.templateSettings = {
    'interpolate': /\{\{(.+?)\}\}/g
};

Pubsub.on('all', console.log.bind(console));
Pubsub.on('app:ready', function() {
    new Router();
    var history = Backbone.history;
    _.defer(history.start.bind(history));
});


var isMobile = window.outerWidth < 800 ? '-mobile' : '';
var img = _.random(1, BACKSTRETCH_IMG_COUNT) + isMobile + '.jpg';
AppState.set('backstretch', 'img/backstretch/' + img);

$(function() {
    projects.fetch().then(function() {
        new AppView().render();
    });
});
