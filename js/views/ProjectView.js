var TB = TB || {};

TB.ProjectView = Backbone.View.extend({

	className: "project",

	template: _.template( $("#project_template").html() ),

	events: {
		"click .project_row": "toggleActive"
	},

	initialize: function() {

	},

	render: function() {

		var data = this.model.toJSON();
		data.bodyBlurb = TB.MDConverter.makeHtml( this.model.bodyBlurb() );
		data.body = TB.MDConverter.makeHtml( data.body );

		this.$el.html( this.template(data) );
		this.$el.addClass(this.model.get('style'));

		this.$body = this.$el.find('.body');

		return this;
	},

	toggleActive: function() {
		if (this.$el.hasClass("active")) {
			this.removeActive();
		} else {
			this.addActive();
		}
	},

	addActive: function() {
		TB.animate.openProject.call(this);
	},

	removeActive: function() {
		TB.animate.closeProject.call(this);
	}

});