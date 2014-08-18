var $ = require('jquery');
var BaseView = require('./base');
var Pubsub = require('../lib/pubsub');
var AppState = require('../lib/app_state');
var LoaderView = require('./loader');
var MenuView = require('./menu');

var AppView = BaseView.extend({
	el: '#app',

	initialize: function() {
		this.resetVertigo();

		$(document).on('keyup', Pubsub.trigger.bind(Pubsub, 'document:keyup'));
		$(window).on('resize', Pubsub.trigger.bind(Pubsub, 'window:resize'));
		this.listenTo(Pubsub, 'document:keyup', this.keyupHandler);
		this.listenTo(Pubsub, 'navigate', this.onNavigate);
		this.listenTo(Pubsub, 'app:ready', this.onAppReady);
	},

	render: function() {
		var loader = new LoaderView({
			'resources': [AppState.get('backstretch'), 'img/logo-knockout.png']
		});
		this.$el.html(loader.render().el);
		return this;
	},

	onAppReady: function() {
		var menu = new MenuView();
		this.$el.html(menu.render().el);
	},

	onNavigate: function(view) {
		if (this.currentView) {
			this.currentView.remove();
		}
		this.$el.append(view.render().el);
		this.currentView = view;
		if (view.animateIn) {
			setTimeout(view.animateIn.bind(view), 500);
		}
	},

	keyupHandler: function(e) {
		if (e.which !== this.vertigo.shift()) {
			this.resetVertigo();
			return;
		}

		if (!this.vertigo.length) {
			this.rotateStuff();
		}
	},

	resetVertigo: function() {
		this.vertigo = '86 69 82 84 73 71 79'.split(' '); // "v e r t i g o"
	},

	rotateStuff: function() {
		alert('vertigo!');
		// TB.animate.rotateABit().then(this.rotateStuff);
	}
});

module.exports = AppView;
