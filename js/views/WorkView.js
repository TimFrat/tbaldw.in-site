var TB = TB || {};

TB.WorkView = Backbone.View.extend({

	template: $("#work_template").text(),

	initialize: function() {
		_.bindAll(this);
	},

	render: function() {
		this.$el.html( this.template );
		this.addAll(TB.projects.published());
		return this;
	},

	addOne: function(project) {
		var view = new TB.ProjectView({model : project});
		this.$('#work').append( view.render().el );
	},

	addAll: function(projects) {
		var that = this;
		_(projects).each(function(project, index){
			var style = 1 + (index % 2);
			style = "style" + style;
			project.set("style", style);
			that.addOne(project);
		});
	}

});