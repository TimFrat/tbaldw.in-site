var TB = TB || {};

(function(){

	TB.AppView = Backbone.View.extend({

		el: '#app',

		initialize: function() {
			this.resetVertigo();

			_.bindAll(this);

			$(document).on('keyup', _.bind(this.keyupHandler, this));

		},

		render: function() {
			return this;
		},

		keyupHandler: function(e) {

			if (e.which == '192') { // '`'
				TB.animate.flip();
				return;
			}			

			var keycode = this.vertigo.shift()
			if (e.which != keycode) {
				this.resetVertigo();
				return;
			}

			if (!this.vertigo.length) this.rotateStuff();

		},

		resetVertigo: function() {
			this.vertigo = '86 69 82 84 73 71 79'.split(' '); // "v e r t i g o"
		},

		rotateStuff: function() {
			TB.animate.rotateABit().then(this.rotateStuff);
		}

	});

}());