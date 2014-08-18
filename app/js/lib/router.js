var Backbone = require('backbone');
var Pubsub = require('./pubsub');
var HomeView = require('../views/home');
var AboutView = require('../views/about');
var WorkView = require('../views/work');

var Router = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'about' : 'about',
        'work' : 'work'
    },

    index: function() {
        Pubsub.trigger('navigate', new HomeView());
        Pubsub.trigger('menu:bottom'); // just for now
    },

    about: function() {
        Pubsub.trigger('navigate', new AboutView());
        Pubsub.trigger('menu:top'); // just for now
    },

    work: function() {
        Pubsub.trigger('navigate', new WorkView());
        Pubsub.trigger('menu:top'); // just for now
    }
});

module.exports = Router;
