var SPACESHIP_COLOR = 'rgb(32, 63, 82)';

var FULL_HEALTH_COLOR = [136, 166, 27];
var LOW_HEALTH_COLOR = [242, 92, 5];

var MAX_HEALTH = 300.0;

function SpaceShip() {
	this.speed = 12;
	this.size = 15; //Screen
	this.body;
	this.health = MAX_HEALTH;
	this.shieldStrength = 2.0;
	this.powerTime = 0.0;

	this.dir = new b2Vec2(0,0);
	this.dragging = false;

	this.CurrentWeaponMethod = DefaultWeaponMethod;
}

SpaceShip.prototype = {
	Init : function() {
		//Init Phys Representation
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = canvas.width / 2 / SCALE;
		bodyDef.position.y = canvas.height / 2 /SCALE;
		
		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.restitution = 0.0;
		fixDef.shape = new b2CircleShape;
		fixDef.shape.m_radius = this.size / SCALE;
		
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
		this.body.SetLinearDamping(1.0);
		this.body.SetFixedRotation(true);

		this.body.SetSleepingAllowed(false);
	},
	
	Tick : function(dTime) {
		this.laserLife -= dTime;
		this.powerTime -= dTime;
		
		// Mouse Controls
		if(rightMouseDown) {
			var dir = new b2Vec2(mouseX / SCALE - this.body.GetPosition().x, mouseY / SCALE - this.body.GetPosition().y);
			dir.Normalize();
			dir.Multiply(this.speed);
			this.body.ApplyForce(dir, this.body.GetPosition());
		}

		//leftMouseClick
		//leftMouseDown
		if(leftMouseClick) {
			var dir = new b2Vec2(mouseX / SCALE - this.body.GetPosition().x, mouseY / SCALE - this.body.GetPosition().y);
			dir.Normalize();

			this.CurrentWeaponMethod(dir);
		}

		// Touch Controls
		if(/*touchStart*/ touching) {
			var touchPos = new b2Vec2(touchX / SCALE, touchY / SCALE);
			var distance = Distance(touchPos.x, touchPos.y, this.body.GetPosition().x, this.body.GetPosition().y) * SCALE;
			if (distance > this.size * 3) {
				var dir = new b2Vec2(touchX - this.body.GetPosition().x * SCALE, touchY - this.body.GetPosition().y * SCALE);
				dir.Normalize();
				
				this.CurrentWeaponMethod(dir);
			}
			else {
				this.dragging = true;
			}
		}

		if (this.dragging) {
			var touchPos = new b2Vec2(touchX, touchY);
				touchPos.x = Math.max(touchPos.x, this.size);
				touchPos.y = Math.max(touchPos.y, this.size);
				touchPos.x = Math.min(touchPos.x, canvas.width - this.size);
				touchPos.y = Math.min(touchPos.y, canvas.height - this.size);
				touchPos.x /= SCALE;
				touchPos.y /= SCALE;
			this.body.SetLinearVelocity(new b2Vec2(touchMoveAlphaX, touchMoveAlphaY));
			this.body.SetPosition(touchPos);
		}

		if (touchEnd && this.dragging) {
			this.dragging = false;
			this.body.SetLinearVelocity(new b2Vec2(touchMoveAlphaX, touchMoveAlphaY));
		}

		// Powerup
		if (this.powerTime < 0) {
			this.CurrentWeaponMethod = DefaultWeaponMethod;
		}
	},

	Draw : function() {
		// Draw the ship
		var x = this.body.GetPosition().x * SCALE;
		var y = this.body.GetPosition().y * SCALE;
		var m = this.size / 5;
		if (mouseX != -1 || mouseY != -1) {
			var angle = Math.atan2(mouseY - y, mouseX - x);
		}
		if (touchX != -1 || touchY != -1) {
			var angle = Math.atan2(touchY - y, touchX - x);
		}

		context.translate(x, y);
		context.rotate(angle);

		// Shield
		context.beginPath();
		context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
		context.fillStyle = LerpToHex(LOW_HEALTH_COLOR, FULL_HEALTH_COLOR, this.health / MAX_HEALTH, 0.2);
		context.fill();
		context.lineWidth = 1.5;
		context.strokeStyle = LerpToHex(LOW_HEALTH_COLOR, FULL_HEALTH_COLOR, this.health / MAX_HEALTH, 1.0);
		context.stroke();

		// Spaceship
		context.beginPath();

		context.moveTo( 0, 			0	   );
		context.lineTo( -1 * m, 	-1 * m );
		context.lineTo( 0, 			-3 * m );
		context.lineTo( +2 * m, 	-3 * m );
		context.lineTo( -1 * m, 	-4 * m );
		context.lineTo( -2 * m, 	0	   );
		context.lineTo( -1 * m, 	+4 * m );
		context.lineTo( +2 * m, 	+3 * m );
		context.lineTo( 0, 			+3 * m );
		context.lineTo( -1 * m, 	+1 * m );

		context.closePath();

		context.fillStyle = SPACESHIP_COLOR;
		context.fill();

		// Flames
		//ToDo
		
		ResetTransform();
	},
	
	Reset : function() {
		this.body.SetPosition(new b2Vec2(canvas.width / 2 / SCALE, canvas.height / 2 /SCALE));
		this.body.SetLinearVelocity(new b2Vec2(0,0));
		this.health = MAX_HEALTH;
		this.powerTime = 0.0;
	},
	
	GetBody : function() {
		return this.body;
	},

	Damage : function(amount) {
		this.health -= amount / this.shieldStrength;
	},

	IsAlive : function() {
		return this.health > 0.0;
	},

	SetPowerup : function(fireWeaponMethod, time) {
		this.CurrentWeaponMethod = fireWeaponMethod;
		this.powerTime = time;
	}
}

function DefaultWeaponMethod(dir) {
	var startPos = ship.body.GetPosition().Copy();
	var endPos = dir.Copy();
		endPos.Multiply(1000);
		endPos.Add(startPos);

	lasers.AddLaser(startPos, endPos, 5.0);
}
