---
---

{% include detectmobilebrowser.js %}

// OO
// http://stackoverflow.com/questions/881515/how-do-i-declare-a-namespace-in-javascript
// Extra: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
var Slides = new function() {
	this.height = 85;

	// Initialize slides so they can be opened/closed.
	// Everything with the class "slide" will get this functionality.
	this.initializeSlides = function() {
		//add click function to all slide headings
		$('.slide').each(function() {
			var fullSlide = $(this);

			// toggle open
			fullSlide.find(".slide_header").click(function() {
				//if the slide is or open then close it
				if(fullSlide.hasClass('open')) {
					fullSlide.animate({"height": Slides.height}, {duration: "slow", queue: false, progress: animateTitle});
					fullSlide.removeClass('open');
				}
				else {
					//close all open open slides
					/*others = $('.open');
					others.animate({"height": Slides.height}, {duration: "slow", queue: false, progress: animateTitle});
					others.children(".slide_title").animate({"opacity": 0}, {queue: false});
					others.removeClass('open');*/

					//open the clicked slide
					var cur_height = fullSlide.height();
					var open_height = fullSlide.css("height", "auto").height();
					fullSlide.height(cur_height).animate({"height": open_height}, {duration: "slow", queue: false, progress: animateTitle});
					$(this).children("span").animate({"opacity": 1}, {queue: false});
					fullSlide.toggleClass('open');
				}
			});

			//close slide
			fullSlide.css("height", Slides.height);

			//reposition title
			Slides.repositionTitle(fullSlide);

			//show titles on mouse over, but not when on mobile browser
			if (!jQuery.browser.mobile) {
				fullSlide.find(".slide_header")
					.mouseleave(function () {
						if (!fullSlide.hasClass('open')) {
							$(this).children("span").animate({"opacity": 0}, {queue: false});
						}
					})
					.mouseenter(function () {
						$(this).children("span").animate({"opacity": 1}, {queue: false});
					})
					.children("span").css("opacity", 0);
			}
		});
	}

	// Private functions, used to animate title
	//callback for progress of open animation
	var animateTitle = function(animation, progress, remainingMs) {
		Slides.repositionTitle($(animation.elem));
	}
	this.repositionTitle = function(slide) {
		var image = slide.find(".slide_header img");
		var title = slide.find(".slide_header span");

		title.css( "top", Math.min( 0, slide.height() - image.height() ) );
	}
}
