var TB = TB || {};

(function(){

	var things = (function(){
		var things = $('#i_like_things').text();
		return $.trim(things).split(',');
	}());

	var thingNum = 0;

	var timers = TB.timers = TB.timers || {};
	timers.mouseMove = null;

	TB.HomeView = Backbone.View.extend({

		template: $("#home_template").text(),

		events: {
			"click .menu_button" : "menuButtonHandler",
			"click #clocks" : "startClock"
		},

		initialize: function() {
			_.bindAll(this);
		},

		render: function() {
			this.$el.html( this.template );
			TB.menuOpen = false;
			setTimeout(this.start, 700);
			return this;
		},

		start : function() {
			var that = this;

			// the order and name of functions to be called
			var functions = "logo title changeTopBarColor intro".split(" ");
			var i = 0;

			step();

			function step() {
				// Once completed, attach events
				if (i === functions.length) {
					attachEvents();
					return;
				}

				var fname = functions[i];
				var func = TB.animate[fname];
				i++;
				func();

				setTimeout(step, 900);
			}

			///// Start up things cycler
			this.changeThing();

			//// Attach Events
			function attachEvents() {
				// Only if it's not mobile
				that.$el.mousemove(that.mouseMoveHandler);
				that.mouseMoveHandler();
			}

		},

		menuButtonHandler: function() {
			TB.animate.toggleMenu();
		},

		changeThing : function() {
			var index = thingNum % things.length;
			var thing = things[index];
			var $thingEl = $("#thing");
			var current = $thingEl.html();

			if (current == thing) {
				thingNum++;
				this.changeThing();
				return;
			}

			$thingEl.transition({
				opacity: 0,
				duration: 400,
				y: 15
			}, function(){
				$thingEl
					.html(thing)
					.css({y:-15})
					.transition({
						opacity: 1,
						duration: 400,
						y: 0
				});
			});
			thingNum++;
			timers.changeThing = setTimeout(this.changeThing, 8000);
		},

		mouseMoveHandler: function() {
			if (timers.mouseMove) clearTimeout(timers.mouseMove);
			if ($('.menu_button').css('opacity') === "0") TB.animate.showMenuButton();
			timers.mouseMove = setTimeout(TB.animate.hideMenuButton, 3000);
		},

		startClock: function() {
			TB.animate.becomeClock();
			TB.router.navigate('clock');
		}

	});

}());