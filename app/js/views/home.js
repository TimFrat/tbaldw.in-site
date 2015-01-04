var BaseView = require('./base');
var AppState = require('../lib/app_state');
var Pubsub = require('../lib/pubsub');

var HomeView = BaseView.extend({
    tagName: 'section',
    className: 'home',
    template: require('./home.hbs'),

    getRenderCtx: function() {
        return {
            'backstretch': AppState.get('backstretch')
        };
    },

    animateIn: function() {
        window.scroll(0, 0);
        var list = this.el.classList;
        setTimeout(list.add.bind(list, 'show'), 50);
        Pubsub.trigger('menu:animate-in');
    },

    animateOut: function() {
        this.el.classList.add('animate-out');
    },

    remove: function() {
        this.animateOut();
        setTimeout(BaseView.prototype.remove.bind(this), 450);
    }
});

module.exports = HomeView;
