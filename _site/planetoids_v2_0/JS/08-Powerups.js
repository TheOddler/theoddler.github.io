var POWERUPSIZE = 10.0;
var POWERUPTYPE = 0;
var tripleLaserVertexPosBuffer;
var tripleLaserVertexColBuffer;
var TRIPLELASERCOLOR = 'rgb(100, 100, 225)';

function Powerups() {
	this.powerups = [];
}

Powerups.prototype = {
	Tick : function(dTime) {
		// Check Deaths
		for(var i = 0; i < this.powerups.length; i++) {
			if( this.powerups[i].IsDead() ) {
				var powerupBody = this.powerups[i].GetBody();
				world.DestroyBody( powerupBody );
				this.powerups.splice(i,1);
				i--;
			}
		}
	},

	Create : function(amount) {
		for(var i = 0; i < amount; ++i) {
			this.NewRandomPowerup();
		}
	},

	NewRandomPowerup : function() {
		var pos = RandomStartPos();
		var newPowerup = new Powerup(pos, TripleLaserWeaponMethod);
		
		this.powerups.push(newPowerup);
	},

	DestroyOne : function(index) {
		var powerupBody = this.powerups[index].GetBody();
		world.DestroyBody( powerupBody );
		this.powerups.splice(index,1); //Deletes the rock
	},

	DestroyAll: function() {
		for(var i = 0; i < this.powerups.length; i++) {
			var powerupBody = this.powerups[i].GetBody();
			world.DestroyBody( powerupBody );
		}
		
		this.powerups = [];
	},

	Draw : function() {
		for(var i = 0; i < this.powerups.length; i++) {
			this.powerups[i].Draw();
		}
	}
}

function Powerup(pos, weaponMethod) {
	this.body;
	this.isDead = false;
	this.weaponMethod = weaponMethod;

	this.Init(pos);
}

Powerup.prototype = {
	Init : function(pos) {
		//Init Phys Representation
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = pos.x / SCALE;
		bodyDef.position.y = pos.y / SCALE;
		
		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.restitution = 0.0;
		fixDef.shape = new b2CircleShape;
		fixDef.shape.m_radius = POWERUPSIZE / SCALE;
		
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
		this.body.SetLinearDamping(1.0);
		this.body.SetFixedRotation(true);
		this.body.SetUserData(this);
	},

	Draw : function() {

		var pos = this.body.GetPosition();
		
		context.beginPath();
		context.arc(pos.x * SCALE, pos.y * SCALE, POWERUPSIZE, 0, 2 * Math.PI, false);
		context.fillStyle = TRIPLELASERCOLOR;
		context.fill();
	},

	IsDead : function() {
		return this.isDead;
	},

	GetBody : function() {
		return this.body;
	},

	GetWeaponMethod : function() {
		return this.weaponMethod;
	},

	PickUp : function() {
		ship.SetPowerup(this.GetWeaponMethod(), 5.0);
		this.isDead = true;
	},

	GetType : function() {
		return POWERUPTYPE;
	}
}


//
// Powerup Methods
// ------------------------------------
function TripleLaserWeaponMethod(dir) {
	var startPos = ship.body.GetPosition().Copy();
	var endPos = dir.Copy();
		endPos.Multiply(1000);
		endPos.Add(startPos);

	var lr = new b2Vec2(-dir.y, dir.x);
		lr.Multiply(3.5*3/SCALE);

	lasers.AddLaser(startPos, endPos, 2.5);

	startPos.Add(lr);
	endPos.Add(lr);
	lasers.AddLaser(startPos, endPos, 2.5);
	
	lr.Multiply(-2);
	startPos.Add(lr);
	endPos.Add(lr);
	lasers.AddLaser(startPos, endPos, 2.5);
}

