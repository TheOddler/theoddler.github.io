---
---

{% include detectmobilebrowser.js %}

(function ( $ ) { //jquery wrapper

	$.fn.makeSlide = function(options) {
		var defaults = {
			height: 85,
			fadeTitleOnMobile: false,
			autoCloseOthers: false,
			heightAnimOptions: {duration: 600, queue: false},
			oppAnimOptions: {duration: 400, queue: false}
		};
		options = $.extend(defaults, options);

		options.heightAnimOptions.progress = heightAnimCB;

		// toggle open
		this.each(function() {
			var slide = $(this);
			slide.find(".header").click(function() {
				//if the slide is or open then close it
				if(slide.hasClass('open')) {
					slide.velocity({"height": options.height}, options.heightAnimOptions);
					slide.removeClass('open');
				}
				else {
					//close all open open slides
					if (options.autoCloseOthers) {
						others = $('.open');
						others.velocity({"height": options.height}, options.heightAnimOptions);
						if (!jQuery.browser.mobile || options.fadeTitleOnMobile) {
							others.find(".header").children("span").velocity({"opacity": 0}, options.oppAnimOptions);
						}
						others.removeClass('open');
					}

					//open the clicked slide
					var cur_height = slide.height();
					var open_height = slide.css("height", "auto").height();
					slide.height(cur_height).velocity({"height": open_height}, options.heightAnimOptions);
					$(this).children("span").velocity({"opacity": 1}, {queue: false});
					slide.toggleClass('open');
				}
			});

			//show titles on mouse over, but not when on mobile browser
			if (!jQuery.browser.mobile || options.fadeTitleOnMobile) {
				slide.find(".header")
					.mouseleave(function () {
						if (!slide.hasClass('open')) {
							$(this).children("span").velocity({"opacity": 0}, options.oppAnimOptions);
						}
					})
					.mouseenter(function () {
						$(this).children("span").velocity({"opacity": 1}, options.oppAnimOptions);
					})
					.children("span").css("opacity", 0);
			}
			else {
				slide.find(".header").children("span")
					.css("opacity", 0)
					.velocity({"opacity": 1}, options.oppAnimOptions);
			}

			//when image loads slowly
			reposSlideTitle(slide);
			slide.find(".header").children("img").load( function() {
				reposSlideTitle(slide);
			});
		});

		//close slide
		this.css("height", options.height);

		return this;
	}

	// for Velocity.js
	var heightAnimCB = function(elements, percentComplete, timeRemaining, timeStart) {
		reposSlideTitle($(elements[0]));
	}

	// for use without Velocity.js
	/*var heightAnimCB = function(animation, progress, remainingMs) {
		reposSlideTitle($(animation.elem));
	}*/

	var reposSlideTitle = function(slide) {
		var image = slide.find(".header img");
		var title = slide.find(".header span");

		title.css( "top", Math.min( 0, slide.height() - image.height() ) );
	}

}( jQuery )); //jquery wrapper
