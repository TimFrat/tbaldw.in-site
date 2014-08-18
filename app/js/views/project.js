var BaseView = require('./base');
var converter = require('../lib/converter');
var projectTemplate = require('./project.hbs');

var ProjectView = BaseView.extend({
	className: 'project',

	template: projectTemplate,

	events: {
		'click .project_row': 'toggleActive'
	},

	initialize: function() {
		this.listenTo(this, 'animate-in', this.animateIn);
		this.listenTo(this, 'animate-out', this.animateOut);
	},

	getRenderCtx: function() {
		var ctx = this.model.toJSON();
		ctx['bodyBlurb'] = converter.makeHtml(this.model.bodyBlurb());
		ctx['body'] = converter.makeHtml(ctx['body']);
		return ctx;
	},

	toggleActive: function() {
		// toggle active
	},

	animateIn: function(i) {
		setTimeout(this.$el.addClass.bind(this.$el, 'show'), i * 100);
	},

	animateOut: function(i) {
		setTimeout(this.$el.addClass.bind(this.$el, 'animate-out'), i * 60);
	}
});

module.exports = ProjectView;
