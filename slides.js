var SLIDE_CLOSED_HEIGHT = 65;

function createSlides(slideIdArray, callback) {
	var deferredList = new Array(slideIdArray.length);

	for (var i = 0; i < slideIdArray.length; i++) {
		deferredList[i] =
			$.Deferred(function (dfd) {
				$("#"+slideIdArray[i]).load(slideIdArray[i]+".html", dfd.resolve);
			}).promise();
	}

	$.when.apply($, deferredList).then(callback);
}

//add toggle function to slide_heading
function initializeSlides() {
	$('.slides_wrapper .slide .slide_heading').click(function() {
		var fullSlide = $(this).parent();
		if(fullSlide.hasClass('current')) {
			fullSlide.animate({"height": SLIDE_CLOSED_HEIGHT}, {duration: "slow", queue: false, progress: animateTitle});
			fullSlide.removeClass('current');
		} else {
			otherCurrent = $('.slides_wrapper .current');
			otherCurrent.animate({"height": SLIDE_CLOSED_HEIGHT}, {duration: "slow", queue: false, progress: animateTitle});
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

	hideAllTitles();
	closeAllSlides();
}

function repositionTitle(slide) {
	var header = slide.children(".slide_heading");
	var title = slide.children(".slide_title_relative_pos");
	title.css("top", Math.min(-header.height() + slide.height(), 0));
}

//animate titles
function animateTitle(animation, progress, remainingMs) {
	repositionTitle($(animation.elem));
}

function hideAllTitles() {
	$(".slides_wrapper .slide .slide_title_relative_pos").css("opacity", 0);
}

function closeAllSlides() {
	$(".slides_wrapper .slide").css("height", SLIDE_CLOSED_HEIGHT);
}