var canvasPosition;

function InitInput() {
	canvasPosition = GetElementPosition(canvas);

	InitMouse();
	InitTouch();
}

function ResetInput() {
	ResetMouse();
	ResetTouch();
}

//
// MOUSE
// ----------------------------
var mouseX = -1, mouseY = -1,
	leftMouseDown = false, rightMouseDown = false,
	leftMouseClick = false, rightMouseClick = false,
	mouseIsOverCanvas = false;

function InitMouse() {
	canvas.addEventListener("mousedown", function(e) {
		if(e.which == 1) {
			leftMouseDown = true;
			leftMouseClick = true;
		}
		else if (e.which == 3) {
			rightMouseDown = true;
			rightMouseClick = true;
		}

		e.preventDefault();
	}, true);

	canvas.addEventListener("mouseup", function(e) {
		if(e.which == 1) {
			leftMouseDown = false;
		}
		else if (e.which == 3) {
			rightMouseDown = false;
		}

		e.preventDefault();
	}, true);
	
	canvas.addEventListener("mousemove", function(e) {
		mouseX = e.layerX;
		mouseY = e.layerY;

		e.preventDefault();
	}, true);

	canvas.addEventListener("mouseover", function(e) {
		mouseIsOverCanvas = true;
		console.log("in");

		e.preventDefault();
	}, true);
	canvas.addEventListener("mouseout", function(e) {
		mouseIsOverCanvas = false;
		console.log("out");

		e.preventDefault();
	}, true);
}

function ResetMouse() {
	leftMouseClick = false;
	rightMouseClick = false;
}

//
// Touch
// ---------------------------------------
var touchX = -1, touchY = -1,
	touchStart = false, touchEnd = false,
	touchMove = false, touching = false,
	touchMoveAlphaX = 0, touchMoveAlphaY = 0;

function InitTouch() {
	canvas.addEventListener("touchstart", function(e) {
		if(e.touches.length > 0) {
			touchStart = true;
			touching = true;
			var touch = e.touches[0];
			touchX = (touch.pageX - canvasPosition.x);
			touchY = (touch.pageY - canvasPosition.y);
			touchMoveAlphaX = 0;
			touchMoveAlphaY = 0;
		}

		e.preventDefault();
	}, true);

	canvas.addEventListener("touchmove", function(e) {
		if(e.touches.length > 0) {
			touchMove = true;
			var touch = e.touches[0];

			var newX = (touch.pageX - canvasPosition.x);
			var newY = (touch.pageY - canvasPosition.y);

			touchMoveAlphaX = newX - touchX;
			touchMoveAlphaY = newY - touchY;

			touchX = newX;
			touchY = newY;
		}

		e.preventDefault();
	}, true);
	
	canvas.addEventListener("touchend", TouchStop, true);
	canvas.addEventListener("touchcancel", TouchStop, true);

	function TouchStop(e) {
		touchEnd = true;
		touching = false;

		e.preventDefault();
	};
}

function ResetTouch() {
	touchStart = false;
	touchEnd = false;
	touchMove = false;
}
