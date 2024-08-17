var ROCKID = -1;

var ROCKSIZE = 50.0;
var STARTNUMPOINTS = 5;
var FADETIME = 1.0;
var DEATHAREA = .5;
var MINAREA = .01;
var ROCKCOLOR = 'rgb(240, 236, 225)';

function Rocks() {
	this.rocks = [];
}

Rocks.prototype = {
	Create : function(amount) {
		for(var i = 0; i < amount; ++i) {
			this.NewRandomRock();
		}
	},

	Add : function(rock) {
		this.rocks.push(rock);
	},

	Tick : function(dTime) {
		// Tick Rocks
		for(var i = 0; i < this.rocks.length; i++) {
			this.rocks[i].Tick(dTime);
		}

		// Check Death
		for(var i = 0; i < this.rocks.length; i++) {
			if( this.rocks[i].IsDead() ) {
				var rockBody = this.rocks[i].GetBody();
				world.DestroyBody( rockBody );
				this.rocks.splice(i,1);
				i--;
			}
		}
	},

	Draw : function() {
		for(var i = 0; i < this.rocks.length; i++) {
			this.rocks[i].Draw();
		}
	},

	Slice : function(start, end, laserPower) {
		var currentAmountOfRocks = this.rocks.length; //Do this because during slicing there can be new ones created
		for(var i = 0; i < currentAmountOfRocks; i++) {
			this.rocks[i].Slice(start, end, laserPower);
		}
	},

	NewRandomRock : function() {
		var newRock = new Rock;
		var pos = RandomStartPos();
			
		newRock.InitRand(pos);
		this.rocks.push(newRock);
	},

	DestroyOne : function(index) {
		var rockBody = this.rocks[index].GetBody();
		world.DestroyBody( rockBody );
		this.rocks.splice(index,1); //Deletes the rock
	},

	DestroyAll : function() {
		for(var i = 0; i < this.rocks.length; i++)
		{
			var rockBody = this.rocks[i].GetBody();
			world.DestroyBody( rockBody );
		}
		
		this.rocks = [];
	},

	AllDestroyed : function() {
		if(this.rocks.length <= 0) {
			return true;
		}
		else {
			return false;
		}
	}
}

// Constructor
function Rock() {
	this.body;
	this.isDying = false;
	this.fading = FADETIME;
	
	this.vertexPosBuffer;
	this.vertexColBuffer;
	
	this.physVertices;
}

Rock.prototype = {
	InitRand : function(screenPos) {
		//Physics representation
		if(!this.CreateBodyRand(screenPos, 0))
		{
			return false;
		}
			
		return true;
	},

	Init : function(screenPos, physVerts, angle) {
		//Physics representation
		if(!this.CreateBody(screenPos, angle, physVerts))
		{
			return false;
		}
			
		var area = this.GetArea(physVerts);
		if(area <= DEATHAREA)
		{
			this.isDying = true;
		}

		return true;
	},

	CreateBody : function(screenPos, angle, vertexes) {
		try {
			var bodyDef = new b2BodyDef;
			bodyDef.type = b2Body.b2_dynamicBody;
			bodyDef.position.x = screenPos.x / SCALE;
			bodyDef.position.y = screenPos.y / SCALE;

			this.physVertices = vertexes;
			
			if(!this.IsValid(this.physVertices)) {
				return false;
			}

			var fixDef = new b2FixtureDef;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsArray(vertexes, vertexes.length);
			fixDef.density = 1.0;
			fixDef.restitution = 1.0;
			fixDef.friction = 0.0;

			this.body = world.CreateBody(bodyDef);
			this.body.CreateFixture(fixDef);
			this.body.SetLinearDamping(0.0);
			this.body.SetAngularDamping(0.2);
			var pos = this.body.GetPosition();
			this.body.SetPositionAndAngle(pos, angle);
			this.body.SetUserData(this);
		}
		catch(err) {
			console.log("Creating rock body failed with folowing error: " + err.description );
			return false;
		}

		return true;
	},

	CreateBodyRand : function(screenPos, angle) {
		try {
			var bodyDef = new b2BodyDef;
			bodyDef.type = b2Body.b2_dynamicBody;
			bodyDef.position.x = screenPos.x / SCALE;
			bodyDef.position.y = screenPos.y / SCALE;

			var vertexes = [];
			for (var i = 0; i < STARTNUMPOINTS; ++i) {
				var pointAngle = Math.PI/STARTNUMPOINTS*2*i;
				pointAngle -= Math.PI/STARTNUMPOINTS;
				pointAngle += Math.PI/STARTNUMPOINTS *2 * Math.random();
				
				vertexes.push( new b2Vec2(Math.cos(pointAngle) * ROCKSIZE / SCALE, Math.sin(pointAngle) * ROCKSIZE / SCALE ) );
			}


			this.physVertices = vertexes;
			
			if(!this.IsValid(this.physVertices)) {
				return false;
			}

			var fixDef = new b2FixtureDef;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsArray(vertexes, vertexes.length);
			fixDef.density = 1.0;
			fixDef.restitution = 1.0;
			fixDef.friction = 0.0;

			this.body = world.CreateBody(bodyDef);
			this.body.CreateFixture(fixDef);
			this.body.SetLinearDamping(0.0);
			this.body.SetAngularDamping(0.2);
			var pos = this.body.GetPosition();
			this.body.SetPositionAndAngle(pos, angle);
			this.body.SetUserData(this);
		}
		catch(err) {
			console.log("Creating rock body failed with folowing error: " + err.description );
			return false;
		}

		return true;
	},

	IsValid : function(physVecs) {
		var area = this.GetArea(physVecs);
		if(area >= MINAREA) {
			return true;
		}
		else {
			console.log("Rock is too small (" + area +"), limiting this for efficiency reasons.");
			return false;
		}
	},

	Tick : function(dTime) {
		if(this.isDying) {
			this.fading -= dTime;
		}
	},

	Draw : function() {
		context.beginPath();

		var pos = this.body.GetPosition()
		context.translate(pos.x * SCALE, pos.y * SCALE);
		context.rotate(this.body.GetAngle());

		context.moveTo(this.physVertices[0].x * SCALE, this.physVertices[0].y * SCALE);
		for(var i = 1; i < this.physVertices.length; i++) {
			context.lineTo(this.physVertices[i].x * SCALE, this.physVertices[i].y * SCALE);
		}
		context.closePath();

		context.globalAlpha = this.fading / FADETIME;
		context.fillStyle = ROCKCOLOR;
		context.fill();
		context.globalAlpha = 1.0;

		ResetTransform();
	},

	Slice : function(start, end, laserPower) {
		//No more slicing when dead. Dead means it's small enough and fading away.
		if (this.isDying && this.fading < FADETIME)
			return false;
			
		var body = this.body;
		var vertexPosBuffer = this.vertexPosBuffer;
		var vertexColBuffer = this.vertexColBuffer;
		var vertices = this.physVertices;

		//Convert the start & end to local for this rock
		start = DeTransformVector(start, body.GetPosition(), 1.0, body.GetAngle());
		end = DeTransformVector(end, body.GetPosition(), 1.0, body.GetAngle());

		//Look for intersection points
		var slicePoints = [];
		for (var i = 0; i < vertices.length; ++i) {
			//Calculate intersectionPoint
			//For formula see https://en.wikipedia.org/wiki/Line-line_intersection
			//I'm using x1, x2, ... since that's easier to write.
			var intersectionPoint = new b2Vec2;
			var x1 = start.x, x2 = end.x, x3 = vertices[i].x, x4 = vertices[(i+1)%vertices.length].x,
				  y1 = start.y, y2 = end.y, y3 = vertices[i].y, y4 = vertices[(i+1)%vertices.length].y;
	 		intersectionPoint.x =(((x1*y2 - y1*x2)*(x3 - x4)) - ((x1-x2)*(x3*y4 - y3*x4))) / (((x1-x2)*(y3-y4))-((y1-y2)*(x3-x4)));
	 		intersectionPoint.y =(((x1*y2 - y1*x2)*(y3 - y4)) - ((y1-y2)*(x3*y4 - y3*x4))) / (((x1-x2)*(y3-y4))-((y1-y2)*(x3-x4)));
			
			//See if the point is is actually on the side & laser.
			var startx = Math.min(vertices[i].x, vertices[(i+1)%vertices.length].x), //side
				endx = Math.max(vertices[i].x, vertices[(i+1)%vertices.length].x),
				starty = Math.min(vertices[i].y, vertices[(i+1)%vertices.length].y),
				endy = Math.max(vertices[i].y,vertices[(i+1)%vertices.length].y),

				start2x = Math.min(start.x, end.x), //laser
				end2x = Math.max(start.x, end.x),
				start2y = Math.min(start.y, end.y),
				end2y = Math.max(start.y,end.y);
			if (intersectionPoint.x >= startx && intersectionPoint.x < endx && intersectionPoint.y >= starty && intersectionPoint.y < endy
				&& intersectionPoint.x >= start2x && intersectionPoint.x < end2x && intersectionPoint.y >= start2y && intersectionPoint.y < end2y) {
				//Add to the slicePoints vector if you find anything
				var point = new SlicePoint(intersectionPoint, i);
				//point.Position = intersectionPoint;
				//point.Side = i;
				slicePoints.push(point);
			}
		}

		//Miss is 0, fully sliced is exactly 2, and when the laser isn't 'long' enough it's 1
		//More than 2 should be (or is) impossible
		if (slicePoints.length > 2) {
			console.log("Something wrong with the slicing, " + slicePoints.length +  " hit(s) found. Should never happen, please report this.");
			return false;
		}

		//There's a hit !
		if (slicePoints.length == 2) {
			//Calculate the number of sides each part of the rock will have
			var numberOfPoints1 = Math.abs(slicePoints[0].Side - slicePoints[1].Side),
				numberOfPoints2 = vertices.length - numberOfPoints1;
			//numberOfPoints1 = min(numberOfPoints1, b2_maxPolygonVertices-2); //Make sure there aren't too many vertexes (Box2D 'limitation')
			//numberOfPoints2 = min(numberOfPoints2, b2_maxPolygonVertices-2); //I raised the max Polygon verts to 16 (default 8) so it will almost never happen, though when it does it's almost invisible
			//Create vectors to save the sides of each new rock
			var sides1 = [];
			var sides2 = [];

			//Filling in the first vector
			var counter = slicePoints[0].Side +1;
			for (var i = 0; i < numberOfPoints1; ++i) {
				if(counter >= vertices.length)
					console.log("Whoops, something wrong with the slicing. Should never happen, please report this."); //Should never go over 0
				sides1.push(vertices[counter]);
				++counter;
			}
			//Lastly add the intersection points to the sides1.
			sides1.push(slicePoints[1].Position); //Since I add them to the back the second one found will always be the first one here.
			sides1.push(slicePoints[0].Position);

			//Filling in the second one
			for (var i = 0; i < numberOfPoints2; ++i) {
				counter = counter % vertices.length;
				sides2.push(vertices[counter]);
				++counter;
			}
			sides2.push( slicePoints[0].Position );
			sides2.push( slicePoints[1].Position );

			//Check if both new polygons are valid. Their size & winding will be checked, also they have to be convex.
			if (!this.IsValid(sides1) || !this.IsValid(sides2)) {
				return false;
			}

			//Get some values needed to set later.
			var pos = new b2Vec2(body.GetPosition().x * SCALE, body.GetPosition().y * SCALE);
			var angle = body.GetAngle();
			var linVel = new b2Vec2( body.GetLinearVelocity().x, body.GetLinearVelocity().y);
			var angleVel = body.GetAngularVelocity();
			var dir = new b2Vec2(end.x - start.x, end.y - start.y);
			var lr = new b2Vec2(-dir.y, dir.x);
			lr.Normalize();
			lr.Multiply(laserPower);
			
			//Change this rock.
			world.DestroyBody(body);
			this.Init(pos, sides1, angle);
			
			//Make the other part.
			var newRock = new Rock;
			if( !newRock.Init(pos, sides2, angle) ) {
				//If it fails to initialize delete it again.
				return false;
			}
			
			//Set Velocities.
			var newVel = new b2Vec2;
			newVel.Set(linVel.x + lr.x, linVel.y + lr.y);
			this.body.SetLinearVelocity(linVel);
			this.body.SetAngularVelocity(angleVel);
			this.body.ApplyImpulse(lr, this.body.GetWorldCenter());
			
			newVel.Set(linVel.x - lr.x, linVel.y - lr.y);
			var newRockBody = newRock.GetBody();
			newRockBody.SetLinearVelocity(linVel);
			newRockBody.SetAngularVelocity(angleVel);
			newRockBody.ApplyImpulse(lr.GetNegative(), newRockBody.GetWorldCenter());
			
			//Add new rock to rocks
			rocks.Add(newRock);
			
			return true;
		}
	},
	
	GetArea : function(physVecs) {
		var area = 0.0;
		for (var i = 0; i < physVecs.length; ++i) {
			var p1 = new b2Vec2, p2 = new b2Vec2;
			p1.x = physVecs[i].x;
			p1.y = physVecs[i].y;
			p2.x = physVecs[(i+1)%physVecs.length].x;
			p2.y = physVecs[(i+1)%physVecs.length].y;

			area += (p1.x*p2.y - p2.x*p1.y);
		}
		area /= 2.0;
		area = Math.abs(area); //just in case
		return area;
	},

	IsDead : function() {
		return ( this.isDying && this.fading <= 0.0 );
	},

	DeathPercentage : function() {
		return this.fading / FADETIME;
	},

	GetBody : function() {
		return this.body;
	},

	GetType : function() {
		return ROCKID;
	}
}
