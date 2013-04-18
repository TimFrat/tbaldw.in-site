var TB = TB || {};

(function(){

	var pages = {
		work: {
			view: "workView",
			constr: "WorkView",
			color: "lightblue"
		},
		about: {
			view: "aboutView",
			constr: "AboutView",
			color: "gray"
		}
	};


	// Delegate .transition() calls to .animate()
	// if the browser can't do CSS transitions.
	if (!$.support.transition) {
		$.fn.transition = $.fn.animate;
	}

	TB.Router = Backbone.Router.extend({
		routes: {
			"" : "index",
			"about" : "about",
			"work" : "work",
			"blog" : "blog",
			"clock" : "clock"
		},

		index: function() {
			var that = this;

			var deferred = $.Deferred();
			var promise = deferred.promise();
			if (TB.homeView) {
				deferred.resolve();
				return promise;
			}

			promise = TB.animate.fadeOutEl( TB.appView.el );

			promise.then(function(){

				if (TB.timers.changeThing) { clearTimeout(TB.timers.changeThing); }
				if (TB.timers.clock) { TB.animate.stopClock(); }

				that.removeView("pagesView");
				that.removeView("homeView");

				TB.homeView = new TB.HomeView();
				TB.appView.$el.html( TB.homeView.render().el );
				TB.animate.fadeInEl( TB.appView.el );
			});

			return promise;

		},

		about: function() {
			this.switchToPage('about');
		},

		work: function() {
			this.switchToPage('work');
		},

		clock: function() {
			var promise = this.index();
			promise.then(TB.animate.becomeClock);
		},

		///////// Helpers

		switchToPage: function(page) {
			var props = pages[page];
			var that = this;

			var el = TB.pagesView ? '.page' : TB.appView.el;
			var anim = TB.animate.fadeOutEl( el );

			anim.then(function(){
				that.startUpPagesView();
				TB.pagesView.changeActivePage(page);

				TB.animate.logo().changeTopBarColor(props.color);


				if (TB.homeView) { that.removeView('homeView'); }
				TB[props.view] = TB[props.view] || new TB[props.constr]();
				TB.pagesView.$('.page').html( TB[props.view].render().el );
				TB.animate.fadeInEl( el );
			});
		},

		startUpPagesView: function() {
			if (!TB.pagesView) {
				TB.pagesView = new TB.PagesView();
				TB.appView.$el.html( TB.pagesView.render().el );
			}
		},

		removeView: function(view) {
			if (TB[view]) {
				TB[view].remove();
				TB[view] = null;
			}
		}

	});


	/////// Preloader
	TB.preloadImages = function() {
		var images = TB.projects.pluck("image");
		_.each(images, function(image) {
			var img = document.createElement("img");
			img.src = image;
		});
	};


	/// WHEN IT'S ALL READY

	$(function() {

		TB.MDConverter = new Markdown.Converter();

		TB.projects = new TB.Projects();

		$.when(TB.projectsPromise).then(function() {
			TB.appView = new TB.AppView();

			TB.preloadImages();

			TB.router = new TB.Router();
			Backbone.history.start();
		});

	});

})();