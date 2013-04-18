var TB = TB || {};

(function() {
	'use strict';

	// Projects Collection
	// -------------------

	TB.Projects = Backbone.Collection.extend({

		url: "api/projects",

		// Reference to this collection's model.
		model: TB.Project,

		// ALSO UPDATE PROPERTIES RE: FETCH
		initialize: function() {
			TB.projectsPromise = this.fetch();
		},

		// CREATE METHODS TO RETURN # OF PROJECTS, ETC
		count: function() {
			if ( !this.length ) {
				return 0;
			}
			return this.length;
		},

		ids: function() {
			return _.pluck(this.models, 'id');
		},

		published: function() {
			return this.where({ published : true });
		},

		comparator: function(project) {
			return parseInt(project.get('order'), 10);
		}

	});

}());
