var MAX_LASER_LIFE = 0.5;
var LASER_WIDTH = 4;

var LASER_COLOR = 'rgb(217, 37, 37)';

function Lasers() {
	this.lasers = [];
}

Lasers.prototype = {
	AddLaser : function(startPos, endPos, power) {
		this.lasers.push(new Laser(startPos, endPos, power));
	},

	Draw : function() {
		// Draw Lasers
		for(var i = 0; i < this.lasers.length; i++) {
			this.lasers[i].Draw();
		}
	},

	Tick : function(dTime) {
		// Tick Lasers
		for(var i = 0; i < this.lasers.length; i++) {
			this.lasers[i].Tick(dTime);
		}

		// Check Deaths
		for(var i = 0; i < this.lasers.length; i++) {
			if( this.lasers[i].IsDead() ) {
				this.lasers.splice(i,1);
      			i--;
			}
		}
	}
}

function Laser(startPos, endPos, power) {
	this.startPos = new b2Vec2(startPos.x * SCALE, startPos.y * SCALE);
	this.endPos = new b2Vec2(endPos.x * SCALE, endPos.y * SCALE);

	this.life = MAX_LASER_LIFE;

	rocks.Slice(startPos, endPos, power);
}

Laser.prototype = {
	Draw : function() {
		context.beginPath();
		context.moveTo(this.startPos.x, this.startPos.y);
		context.lineTo(this.endPos.x, this.endPos.y);

		context.strokeStyle = ToHexColor(217, 37, 37, this.LifePercentage());
		context.lineWidth = LASER_WIDTH * this.LifePercentage();
		context.stroke();
	},

	Tick : function(dTime) {
		this.life -= dTime;
	},

	IsDead : function() {
		if(this.life < 0) {
			return true;
		}
		else {
			return false;
		}
	},

	LifePercentage : function(){
		return this.life / MAX_LASER_LIFE;
	}
}
