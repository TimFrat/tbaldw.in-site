var _ = require('underscore');
var BaseView = require('./base');
var Pubsub = require('../lib/pubsub');
var AppState = require('../lib/app_state');
var router = require('../lib/router');

var MenuView = BaseView.extend({
    tagName: 'nav',
    template: require('./menu.hbs'),

    events: {
        'click .route': 'nav'
    },

    initialize: function() {
        this.listenTo(Pubsub, 'menu:bottom', this.move.bind(this, 'bottom'));
        this.listenTo(Pubsub, 'menu:top', this.move.bind(this, 'top'));
        this.listenTo(Pubsub, 'menu:animate-in', this.animateIn);
    },

    getRenderCtx: function() {
        return {
            'backstretch': AppState.get('backstretch')
        };
    },

    animateIn: function() {
        var list = this.el.classList;
        list.remove('show');
        setTimeout(list.add.bind(list, 'show'), 50);
    },

    move: function(position) {
        if (this.curPosition === position) {
            return;
        }
        var list = this.el.classList;
        list.remove('show');
        list.toggle('top', position === 'top');
        this.curPosition = position;
        if (position === 'top') {
            setTimeout(function() {
                list.add('show');
                this.showLogo();
            }.bind(this), 450);
        }
    },

    showLogo: function() {
        var list = this.el.querySelector('.logo').classList;
        _.delay(list.add.bind(list, 'show'), 50);
    },

    nav: function(e) {
        var url = e.currentTarget.getAttribute('data-route');
        router.navigate(url, {'trigger': true});
    }
});

module.exports = MenuView;
