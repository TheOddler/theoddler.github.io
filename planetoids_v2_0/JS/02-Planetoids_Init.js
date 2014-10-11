//Get the context and initialize Box2D
//Also starts the game Loop

var SCALE = 30.0;
//var fullscreen;

var context;
function Init2D(canvas) {
	context = canvas.getContext('2d');
}

var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2Vec3 = Box2D.Common.Math.b2Vec3;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body; 
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2Transform = Box2D.Common.Math.b2Transform;
var b2Mat22 = Box2D.Common.Math.b2Mat22;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;

var world;
var debugDraw;
var contactListener = new b2ContactListener;
function InitBox2D() {
	world = new b2World(new b2Vec2(0, 0),  true);
	/*var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("Planetoids_DebugCanvas").getContext("2d"));
		debugDraw.SetDrawScale(SCALE/2);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);*/
	
		world.SetContactListener(contactListener);
}

var prevTime = 0;
function Loop() {
	// Loop
	requestAnimFrame(Loop);

	if (mouseIsOverCanvas) {
		//Calc delta time
		var curTime = new Date().getTime();
		var elapsed = 0;
		if (prevTime != 0) {
			elapsed = ( curTime - prevTime ) / 1000.0;
		}
		prevTime = curTime;
		if (elapsed>0.1) {
			elapsed = 0.0;
		}
		
		//Tick all objects
		tick(elapsed);
		
		//Simulate world
		world.Step(elapsed, 8,3);
		//world.DrawDebugData();
		world.ClearForces();
		
		//Draw
		draw();
	}

	//Reset input
	ResetInput();
}

var canvas;
//var timeElement;
//var bestTimeElement;
function InitPlanetoids(planetoidsCanvas, rockCount) {
	// Initialize 2D
	canvas = planetoidsCanvas;
	//fullscreen = fs;
	numberOfRocks = rockCount;
	//if (fullscreen) {
	//	canvas.width = document.width;
	//	canvas.height = document.height;
	//}
	Init2D(canvas);
	
	// Initialize Box2D
	InitBox2D();
	
	// Init input
	InitInput();
	
	// Init time field
	//timeElement = document.getElementById('planetoidsTime');
	//bestTimeElement = document.getElementById('planetoidsBestTime');

	// Start Game
	start();
	if(!mouseIsOverCanvas) {
		//Draw
		draw();
	}
	Loop();
}


