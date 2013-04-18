var TB = TB || {};

TB.AboutView = Backbone.View.extend({

	template: $("#about_template").text(),

	initialize: function() {

	},

	render: function() {
		this.$el.html( this.template );
		return this;
	}

});