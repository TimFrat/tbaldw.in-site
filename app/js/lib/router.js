var Backbone = require('backbone');
var Pubsub = require('./pubsub');
var HomeView = require('../views/home');
var AboutView = require('../views/about');
var WorkView = require('../views/work');

function _navigate(view, menuPosition) {
    Pubsub.trigger('navigate', view);
    Pubsub.trigger('menu:' + menuPosition);
}

var Router = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'info' : 'info',
        'work' : 'work',
        'about': 'info'
    },

    index: function() {
        _navigate(new HomeView(), 'bottom');
    },

    info: function() {
        _navigate(new AboutView(), 'top');
    },

    work: function() {
        _navigate(new WorkView(), 'top');
    }
});

module.exports = new Router();
