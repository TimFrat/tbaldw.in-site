var TB = TB || {};
TB.timers = TB.timers || {};

(function(){

	var animate = TB.animate = {};

	var colors = {
		darkblue: "rgb(33, 133, 197)",
		gray: "rgb(62, 69, 76)",
		salmon: "rgb(255, 127, 102)",
		lightblue: "rgb(126, 206, 253)"
	};

	animate.logo = function() {

		$('.logo').transition({
			rotate3d: "0,0,0,0deg"
		});

		$('.logo .circle')
			.transition({
				rotate3d: "1,1,0,180deg",
				duration: 2000,
				easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
			});

		return this;
	};

	animate.title = function() {
		$("#title").transition({
			opacity:1,
			duration: 1500
		});

		return this;
	};

	animate.topBar = function() {
		$('.top_bar').transition({
			y : "9px",
			duration: 200
		}, function() {
			$('.top_bar').transition({
				y: "-=6px",
				duration: 400
			});
		});

		return this;
	};

	animate.intro = function() {
		var $lines = $('#intro div');
		var i = 0;

		step();

		function step() {
			if (i === $lines.length) return;
			$lines.eq(i).transition({
				opacity: 1,
				y: "-=10px",
				duration: 1500
			});
			i++;
			setTimeout(step, 200);
		}

		return this;
	};

	animate.showMenuButton = function() {
		$('.menu_button').transition({
			opacity: 1,
			x: "-10px",
			duration: 1000
		});

		return this;
	};

	animate.hideMenuButton = function() {
		if (TB.menuOpen) return;
		$('.menu_button').transition({
			opacity: 0,
			x: 0,
			duration: 1000
		});

		return this;
	};

	animate.toggleMenu = function() {
		if (TB.menuOpen) {
			animate.closeMenu();
		} else {
			animate.openMenu();
		}

		return this;
	};

	animate.openMenu = function() {
		TB.menuOpen = true;
		$('#menu').css({display:"block"});
		$('#menu, #intro, .menu_button').transition({
			x : 175,
			opacity: 1,
			duration: 1000,
			easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
		});

		return this;
	};

	animate.closeMenu = function() {
		TB.menuOpen = false;
		var params = {
			x : 0,
			duration: 1000,
			easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
		};

		$('#menu').transition(_.extend({ opacity: 0 }, params), function(){
			$('#menu').css({display:"none"});
		});
		$('#intro, .menu_button').transition(params);

		return this;
	};

	animate.changeTopBarColor = function(color) {

		if (color in colors) {
			color = colors[color];
		} else {
			color = colors.darkblue;
		}

		$('.top_bar').transition({
			y: -10,
			duration: 500
		}, function(){
			$('.top_bar').css({ backgroundColor : color });
			animate.topBar();
		});

		return this;
	};

	animate.openProject = function() {
		var height = parseInt(this.$body.find('.measure').height(), 10);
		this.$body.transition({
			height: height + 20,
			easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
			duration: 600
		});
		this.$el.addClass("active");
	};

	animate.closeProject = function() {
		this.$body.transition({
			height: 0,
			easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
			duration: 600
		});
		this.$el.removeClass('active');
	};

	animate.fadeOutEl = function(el) {
		var deferred = $.Deferred();
		$(el).css({opacity:1}).transition({
			opacity : 0,
			y : 50,
			duration: 800
		}, function(){
			deferred.resolve();
		});
		return deferred.promise();
	};

	animate.fadeInEl = function(el) {
		var deferred = $.Deferred();
		$(el).transition({
			opacity : 1,
			y : 0,
			duration: 800
		}, function(){
			deferred.resolve();
		});
		return deferred.promise();
	};

	animate.rotateABit = function(el) {

		el = el || "*";

		var $el = $(el);

		// Maybe needed for caching?
		var _transition = $el.css('transition');

		$el.each(function(i){

			var deg = _.random(90);
			var neg = _.random(1) ? -1 : 1;
			deg *= neg;
			deg += 'deg';

			$(this).css({
				transition: 'all 60s linear',
				transform: 'rotate(' + deg + ')'
			});

		});

		var deferred = $.Deferred();

		$el.on('transitionend', function(e) {
			$el.off('transitionend');
			deferred.resolve();
		});

		return deferred.promise();
	};

	animate.resetRotation = function(el) {

		el = el || '*';
		var $el = $(el);

		$el.css({
			transition: 'all .5s cubic-bezier(0.23, 1, 0.32, 1)',
			transform: 'rotate(0)'
		});

	};

	animate.flip = function(el) {

		el = el || 'section div';

		var $el = $(el);

		$el.css({
			transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
			transform: 'rotateX(180deg)'
		});


		var deferred = $.Deferred();

		$el.on('transitionend', function(e) {
			$el.off('transitionend');
			deferred.resolve();
		});

		return deferred.promise();

	};

	animate.becomeClock = function() {

		TB.clock = {};
		if (TB.timers.clock) { animate.stopClock(); }


		var DURATION = 2000;

		var hands = {
			sec: {
				$el: $(".line1"),
				top: "53px",
				scale: "0.3",
				rotate: 55,
				revolutions: 0
			},
			min: {
				$el: $(".line2"),
				top: "0",
				scale: "0.25",
				rotate: 55,
				revolutions: 0
			},
			hour: {
				$el: $(".line3"),
				top: "-87px",
				scale: "0.15",
				rotate: 55,
				revolutions: 0
			}
		};

		$('.line4').transition({
			opacity: 0,
			scale : ".01",
			duration: 2000,
			easing: "cubic-bezier(0.23, 1, 0.32, 1)"
		});

		$('hr').transition({
			marginTop: "+=100",
			duration: 2000,
			easing: "cubic-bezier(0.23, 1, 0.32, 1)"
		});

		for (var prop in hands) {
			if (hands.hasOwnProperty(prop)) {
				var hand = hands[prop];

				hand.$el.css({
					position: "relative",
					transformOrigin: "100% 100%",
					transform: "none"
				});

				hand.$el.transition({
					scale: hand.scale,
					rotate: hand.rotate + "deg",
					skewX: "25deg",
					skewY: "46deg",
					top: hand.top,
					left: "-121px",
					duration: DURATION,
					easing: "cubic-bezier(0.23, 1, 0.32, 1)"
				});
			}
		}
		TB.clock.hands = hands;
		TB.clock.active = true;

		setTimeout(animate.startClock, DURATION);

	};

	animate.setClock = function() {
		if (!TB.clock || !TB.clock.active) return;

		var hands = TB.clock.hands;

		var date = new Date();
		var time = {
			hour: date.getHours() % 12,
			min: date.getMinutes(),
			sec: date.getSeconds()
		};

		var degs = {
			hour: ((time.hour / 12) * 360) + hands.hour.rotate,
			min: ((time.min / 60) * 360) + hands.min.rotate,
			sec: ((time.sec / 60) * 360) + hands.sec.rotate
		};

		for (var prop in hands) {
			if (hands.hasOwnProperty(prop)) {
				var hand = hands[prop];

				///// Avoid jumpy animation from 360deg back to 0deg
				if (time[prop] === 0) {
					hand.revolutions += 1;
				}
				var deg = degs[prop] + (hand.revolutions * 360);

				hand.$el.transition({
					rotate: deg + "deg",
					duration: 1000,
					easing: "cubic-bezier(0.23, 1, 0.32, 1)"
				});

			}
		}
	};

	animate.startClock = function() {
		if (!TB.clock.active) { return; }
		animate.setClock();
		TB.timers.clock = setTimeout(animate.startClock, 1000);
	};

	animate.stopClock = function() {
		clearTimeout(TB.timers.clock);
		TB.timers.clock = null;
	};

}());