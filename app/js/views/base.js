var Backbone = require('backbone');

var BaseView = Backbone.View.extend({
	template: function(){},

	getRenderCtx: function() {
		return this.model ? this.model.toJSON() : {};
	},

	render: function() {
		var ctx = this.getRenderCtx();
		this.$el.html(this.template(ctx));
		this.postRender();
		return this;
	},

	postRender: function() {},

	remove: function() {
		if (this.subviews) {
			while (this.subviews.length) {
				this.subviews.pop().remove();
			}
		}
		Backbone.View.prototype.remove.apply(this, arguments);
	}
});

module.exports = BaseView;
