// Other Helpers
function ResetTransform() {
	context.setTransform(1, 0, 0, 1, 0, 0);
}

function LerpToHex(from, to, time, alpha) {
	var r = Math.round( from[0] * (1-time) + to[0] * time );
	var b = Math.round( from[1] * (1-time) + to[1] * time );
	var g = Math.round( from[2] * (1-time) + to[2] * time );
	return 'rgba(' + r + ',' + b + ',' + g + ',' + alpha + ')';
}

function ToHexColor(r, g, b, a) {
	return 'rgba(' + r + ',' + b + ',' + g + ',' + a + ')';
}

function GetElementPosition(element) {
	DetectBrowser();
	var x, y;
	if(browserName == "Chrome") {
		x = 0;
		y = 0;
	}
	else {
		x = canvas.offsetLeft;
		y = canvas.offsetTop;
	}
	return {x: x, y: y};
}
 
function DegToRad(degrees) {
	return degrees * Math.PI / 180;
}

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

function DetectBrowser() {
	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) {
			fullVersion = nAgt.substring(verOffset+8);
		}
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) {
			fullVersion = nAgt.substring(verOffset+8);
		}
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) )  {
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1) {
		fullVersion=fullVersion.substring(0,ix);
	}
	if ((ix=fullVersion.indexOf(" "))!=-1) {
		fullVersion=fullVersion.substring(0,ix);
	}
	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}
}

function DeTransformVector(vect, pos, scale, angle) {
	var rotMat = new b2Mat22;
	rotMat.Set(-angle);

	var newVec = new b2Vec2(vect.x, vect.y);
	
	newVec.x -= pos.x;
	newVec.y -= pos.y;
	newVec.MulM(rotMat);
	newVec.x /= scale;
	newVec.y /= scale;

	return newVec;
}

//function TimeToString(milliseconds) {
function TimeToString(seconds) {
	// Determine the minutes and seconds portions of the time.
	//var seconds = milliseconds / 1000;
	var m = Math.floor(seconds/60);
	var s = Math.round(seconds - (m * 60));

	// Add leading zeros to one-digit numbers.
	if (m < 10) {
		m = "0" + m;
	}
	if (s < 10) {
		s = "0" + s;
	}
	return m + ":" + s;
}

function RandomStartPos() {
	var pos = new b2Vec2;
		pos.x = 20 + Math.random()*(canvas.width-40);
		pos.y = 20 + Math.random()*(canvas.height-40);
	
	//Make sure the pos isn't in the middle of screen
	var circleRad = 100;
	var fromMid = pos.Copy()
	fromMid.Subtract(new b2Vec2(canvas.width/2, canvas.height/2));
	if(fromMid.LengthSquared() <= circleRad*circleRad) {
		fromMid.Normalize();
		fromMid.Multiply(circleRad);
		pos.Add(fromMid);
	}
	
	return pos;
}

function Distance(x1, y1, x2, y2) {
	var xs = 0;
	var ys = 0;

	xs = x2 - x1;
	xs = xs * xs;

	ys = y2 - y1;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}
