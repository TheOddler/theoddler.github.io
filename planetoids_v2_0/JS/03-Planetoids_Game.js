var ship;
var lasers;
var powerups;
var numberOfRocks = 10;
var rocks;
var stars;
var walls = [];

//var startTime;
var curPlayTime;
var bestTime;

function CreateWalls() {
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.0;
	fixDef.restitution = 1.0;
	fixDef.shape = new b2PolygonShape;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	
	bodyDef.position.x = canvas.width / 2 / SCALE;
	bodyDef.position.y = canvas.height / SCALE - 1/SCALE;
	fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, (10/SCALE) / 2);
	walls[0] = world.CreateBody(bodyDef);
	walls[0].CreateFixture(fixDef);
	
	bodyDef.position.x = canvas.width / 2 / SCALE;
	bodyDef.position.y = 1/SCALE;
	fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, (10/SCALE) / 2);
	walls[1] = world.CreateBody(bodyDef);
	walls[1].CreateFixture(fixDef);
	
	bodyDef.position.x = canvas.width / SCALE - 1/SCALE;
	bodyDef.position.y = canvas.height / 2 /SCALE;
	fixDef.shape.SetAsBox((10/SCALE) / 2, (canvas.height / SCALE) / 2);
	walls[2] = world.CreateBody(bodyDef);
	walls[2].CreateFixture(fixDef);
	
	bodyDef.position.x = 1/SCALE;
	bodyDef.position.y = canvas.height / 2 / SCALE;
	fixDef.shape.SetAsBox((10/SCALE) / 2, (canvas.height / SCALE) / 2);
	walls[3] = world.CreateBody(bodyDef);
	walls[3].CreateFixture(fixDef);
}


contactListener.PostSolve = function(contact, impulse) {
	var damage = 0.0;
	var other = null;
	
	if( contact.GetFixtureA().GetBody() == ship.GetBody() ) {
		other = contact.GetFixtureB().GetBody().GetUserData();
	}
	else if(contact.GetFixtureB().GetBody() == ship.GetBody() ) {
		other = contact.GetFixtureA().GetBody().GetUserData();
	}
	
	if(other != null) {
		if(other.GetType() == ROCKID) {
			damage = impulse.normalImpulses[0] * other.DeathPercentage();
			ship.Damage(damage * damage);
		}
		else if(other.GetType() == POWERUPTYPE) {
			other.PickUp();
		}
	}
}


function DestroyCurrentWorld() {
	rocks.DestroyAll();
	powerups.DestroyAll();
}

function StartNewRandomWorld() {
	DestroyCurrentWorld();
	ship.Reset();
	rocks.Create(numberOfRocks);
	powerups.Create(2);
	curPlayTime = 0;
	//startTime = new Date();
}

function RestartGameWithDifferentCanvasSize() {
	//Destroy current wals
	world.DestroyBody(walls[0]);
	world.DestroyBody(walls[1]);
	world.DestroyBody(walls[2]);
	world.DestroyBody(walls[3]);
	// Create Walls
	CreateWalls();
	
	// Create Stars
	stars = new Stars;
	stars.Init(100);

	//Create the world
	StartNewRandomWorld();
	draw();
}


function start() {
	// Create Walls
	CreateWalls();
	
	// Create Stars
	stars = new Stars;
	stars.Init(100);
	
	// Create ship
	ship = new SpaceShip;
	ship.Init();

	// Create Laser Manager
	lasers = new Lasers();
	
	// Powerups
	powerups = new Powerups();
	
	// Create rocks
	rocks = new Rocks();
	
	//Create the world
	StartNewRandomWorld();
}

function tick(dTime) {
	//var curPlayTime = new Date()-startTime;
	curPlayTime = curPlayTime + dTime;
	ship.Tick(dTime);
	lasers.Tick(dTime);
	rocks.Tick(dTime);
	powerups.Tick(dTime);
	
	
	if(!ship.IsAlive()) {
		StartNewRandomWorld();
	}
	
	if(rocks.AllDestroyed()) {
		//You won
		if(bestTime != null) {
			if( curPlayTime < bestTime )
				bestTime = curPlayTime;
		}
		else {
			bestTime = curPlayTime;
		}
		
		//if (fullscreen == false) {
		/*if (bestTimeElement != null) {
			bestTimeElement.innerHTML = "Best: " + TimeToString(bestTime);
		}
		else {
			var winMessage = "You just won, your time was: "  + TimeToString(curPlayTime);
			if (bestTime != null) {
				if (bestTime == curPlayTime) {
					winMessage = winMessage + " (This is your best time yet!)";
				}
				else {
					winMessage = winMessage + " (Your best time was: " + TimeToString(bestTime) + ")";
				}
			}
			alert(winMessage);
		}*/
		StartNewRandomWorld();
	}
	
	/*if (timeElement != null) {
		timeElement.innerHTML = "Time: " + TimeToString(curPlayTime);
		//console.log("time set");
	}*/
}

function draw() {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle='rgb(4, 15, 22)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	stars.Draw();
	lasers.Draw();
	ship.Draw();
	rocks.Draw();
	powerups.Draw();

	context.fillStyle='rgb(180, 180, 180)';
	context.font = "bold 14px sans-serif";
	context.fillText("Time: " + TimeToString(curPlayTime), 10, canvas.height-10 );
	if (bestTime) {
		context.fillText("Best: " + TimeToString(bestTime), 100, canvas.height-10 );
	}
	context.fillText("Hold right to move. Click left to shoot.", canvas.width-275, canvas.height-10 );
}
