var BaseView = require('./base');
var AppState = require('../lib/app_state');
var Pubsub = require('../lib/pubsub');

var HomeView = BaseView.extend({
	tagName: 'section',
	className: 'home',
	template: require('./home.hbs'),

	events: {
		'click #clocks' : 'startClock'
	},

	getRenderCtx: function() {
		return {
			'backstretch': AppState.get('backstretch')
		};
	},

	animateIn: function() {
		window.scroll(0, 0);
		setTimeout(this.$el.addClass.bind(this.$el, 'show'), 50);
		Pubsub.trigger('menu:animate-in');
	},

	animateOut: function() {
		this.$el.addClass('animate-out');
	},

	remove: function() {
		this.animateOut();
		setTimeout(BaseView.prototype.remove.bind(this), 450);
	},

	startClock: function() {
		// TB.animate.becomeClock();
		// TB.router.navigate('clock');
	}
});

module.exports = HomeView;
