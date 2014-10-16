// OO
// http://stackoverflow.com/questions/881515/how-do-i-declare-a-namespace-in-javascript
// Extra: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
var Slides = new function() {
	this.height = 85;

	// Load slides into divs with givben ID's.
	// The slides have to be in html files named "slideId.html"
	this.loadSlides = function(slideIdArray, callback) {
		var deferredList = new Array(slideIdArray.length);

		for (var i = 0; i < slideIdArray.length; i++) {
			deferredList[i] =
				$.Deferred(function (dfd) {
					$("#"+slideIdArray[i]).load(slideIdArray[i]+".html", dfd.resolve);
				}).promise();
		}

		$.when.apply($, deferredList).then(callback);
	}

	// Initialize slides so they can be opened/closed.
	// Everything with the class "slide" will get this functionality.
	this.initializeSlides = function() {
		var slideHeight = this.height;
		$('.slides_wrapper .slide .slide_heading').click(function() {
			var fullSlide = $(this).parent();
			if(fullSlide.hasClass('current')) {
				fullSlide.animate({"height": slideHeight}, {duration: "slow", queue: false, progress: animateTitle});
				fullSlide.removeClass('current');
			} else {
				otherCurrent = $('.slides_wrapper .current');
				otherCurrent.animate({"height": slideHeight}, {duration: "slow", queue: false, progress: animateTitle});
				otherCurrent.children(".slide_title_relative_pos").animate({"opacity": 0}, {queue: false});
				otherCurrent.removeClass('current');

				var cur_height = fullSlide.height();
				var open_height = fullSlide.css("height", "auto").height();
				fullSlide.height(cur_height).animate({"height": open_height}, {duration: "slow", queue: false, progress: animateTitle});
				fullSlide.toggleClass('current');
			}
		});

		//reposition titles
		$('.slides_wrapper .slide').each(function () {
			repositionTitle($(this));
		});

		//show titles on mouse over
		$('.slides_wrapper .slide .slide_heading').mouseenter(function () {
			$(this).siblings(".slide_title_relative_pos").animate({"opacity": 1}, {queue: false});
		});
		$('.slides_wrapper .slide .slide_heading').mouseleave(function () {
			if (!$(this).parent().hasClass('current')) {
				$(this).siblings(".slide_title_relative_pos").animate({"opacity": 0}, {queue: false});
			}
		});

		this.hideAllTitles();
		this.closeAllSlides();
	}

	// Instantly hide all titles
	this.hideAllTitles = function() {
		$(".slides_wrapper .slide .slide_title_relative_pos").css("opacity", 0);
	}


	// Instantly close all slides
	this.closeAllSlides = function() {
		$(".slides_wrapper .slide").css("height", this.height);
	}

	// Private functions, used to animate title
	var repositionTitle = function(slide) {
		var header = slide.children(".slide_heading");
		var title = slide.children(".slide_title_relative_pos");
		title.css("top", Math.min(-header.height() + slide.height(), 0));
	}
	var animateTitle = function(animation, progress, remainingMs) {
		repositionTitle($(animation.elem));
	}

}
