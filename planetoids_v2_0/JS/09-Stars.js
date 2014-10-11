var MIN_STAR_SIZE = 0.3;
var MAX_STAR_SIZE = 1;

function Star() {
	this.pos = new b2Vec2(Math.random() * canvas.width, Math.random() * canvas.height);
	this.size = MIN_STAR_SIZE + Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE);
}

Star.prototype = {
	Draw : function() {
		// Shield
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
		context.fillStyle =	'#FFFFFF';
		context.fill();
	}
}

function Stars() {
	this.stars = [];
}

Stars.prototype = {
	Init : function(numberOfStars) {
		for (var i=0; i < numberOfStars; i++) {
			this.stars.push(new Star());
		}
	},

	Draw : function() {
		for(var i = 0; i < this.stars.length; i++)
		{
			this.stars[i].Draw();
		}
	}
}
