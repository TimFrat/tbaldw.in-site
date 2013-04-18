var TB = TB || {};

(function() {
	'use strict';

	// Project Model
	// -------------

	// Our basic **Project** model
	TB.Project = Backbone.Model.extend({

		//url: "../api/projects",

		// Default attributes for the article
		defaults: {
			title: '',
			body: '',
			image: '',
			published: false,
			order: null
		},

		parse: function(res) {
			res.published = (res.published == "0") ? false : true;
			res.image = res.image ? res.image.split("../")[1] : null;
			return res;
		},

		initialize: function() {
		},

		bodyPreview: function() {
			var body;
			if (!(body = this.get('body'))) { return; }
			var words = body.split(' ');
			var end = words.length > 4 ? 4 : words.length;
			var preview = words.slice(0, end).join(' ');
			return preview + "...";
		},

		bodyBlurb: function() {
			var body;
			if (!(body = this.get('body'))) { return; }
			var words = body.split(' ');
			var end = words.length > 40 ? 40 : words.length;
			var preview = words.slice(0, end).join(' ');
			return preview + "...";
		}

	});

}());