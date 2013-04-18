var TB = TB || {};

TB.PagesView = Backbone.View.extend({

	template: $("#pages_template").text(),

	initialize: function() {
		_.bindAll(this);
	},

	render: function() {
		this.$el.html( this.template );
		return this;
	},

	changeActivePage: function(page) {
		this.$('.nav div').removeClass('active');
		this.$('.nav').find("." + page).addClass('active');
	}

});