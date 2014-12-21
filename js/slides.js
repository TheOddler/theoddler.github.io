// OO
// http://stackoverflow.com/questions/881515/how-do-i-declare-a-namespace-in-javascript
// Extra: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
var Slides = new function() {
	this.height = 85;
	this.titleOffset = 19;

	// Initialize slides so they can be opened/closed.
	// Everything with the class "slide" will get this functionality.
	this.initializeSlides = function() {
		var thisObject = this;
		$('.slide .slide_heading').click(function() {
			var fullSlide = $(this).parent();
			if(fullSlide.hasClass('current')) {
				fullSlide.animate({"height": thisObject.height}, {duration: "slow", queue: false, progress: animateTitle});
				fullSlide.removeClass('current');
			}
			else {
				otherCurrent = $('.current');
				otherCurrent.animate({"height": thisObject.height}, {duration: "slow", queue: false, progress: animateTitle});
				otherCurrent.children(".slide_title:first-of-type").animate({"opacity": 0}, {queue: false});
				otherCurrent.removeClass('current');

				var cur_height = fullSlide.height();
				var open_height = fullSlide.css("height", "auto").height();
				fullSlide.height(cur_height).animate({"height": open_height}, {duration: "slow", queue: false, progress: animateTitle});
				fullSlide.toggleClass('current');
			}
		});

		//reposition titles
		$('.slide').each(function () {
			repositionTitle($(this));
		});

		//show titles on mouse over
		$('.slide .slide_heading').mouseenter(function () {
			$(this).siblings(".slide_title:first-of-type").animate({"opacity": 1}, {queue: false});
		});
		$('.slide .slide_heading').mouseleave(function () {
			if (!$(this).parent().hasClass('current')) {
				$(this).siblings(".slide_title:first-of-type").animate({"opacity": 0}, {queue: false});
			}
		});

		this.hideAllTitles();
		this.closeAllSlides();
	}

	// Instantly hide all titles
	this.hideAllTitles = function() {
		$(".slide > .slide_title:first-of-type").css("opacity", 0);
	}


	// Instantly close all slides
	this.closeAllSlides = function() {
		$(".slide").css("height", this.height);
	}

	// Private functions, used to animate title
	var repositionTitle = function(slide) {
		var header = slide.children(".slide_heading");
		var title = slide.children(".slide_title:first-of-type");
		title.css( "top", Math.min(header.height(), slide.height()) - title.height() + Slides.titleOffset ); //TODO get rid of hardcoded -72
	}
	var animateTitle = function(animation, progress, remainingMs) {
		repositionTitle($(animation.elem));
	}
}
