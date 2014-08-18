var _ = require('underscore');
var BaseView = require('./base');
var Pubsub = require('../lib/pubsub');
var AppState = require('../lib/app_state');

var MenuView = BaseView.extend({
	tagName: 'nav',
	template: require('./menu.hbs'),

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
        this.$el.removeClass('show');
        setTimeout(this.$el.addClass.bind(this.$el, 'show'), 50);
    },

    move: function(dir) {
        this.$el.removeClass('show');
        this.$el.toggleClass('top', dir === 'top');
        if (dir === 'top') {
            setTimeout(function() {
                this.$el.addClass('show');
                this.showLogo();
            }.bind(this), 450);
        }
    },

    showLogo: function() {
        var $logo = this.$('.logo');
        _.delay($logo.addClass.bind($logo, 'show'), 50);
    }
});

module.exports = MenuView;
