---
layout: more_page
title: Planetoids
---

<canvas id="planetoids_game" style="border: none; position: relative;" width="800" height="600" onselectstart="return false;" oncontextmenu="return false;"></canvas>

## Planetoids

For my exams of my first year of DAE I had to remake a classic game. It was for my maths & physics class so graphics weren't that important. I chose to remake Asteroids, but give it my own spin. I added my own controlls and upgraded the spaceship's laser.

Then years later I decided to remake Planetoids. I first used WebGL for it's graphics, though later decided to use the HTML5 canvas instead. Now Planetoids is fully playable in any browser.

### Physics

In the original I wrote all physics myself, they were very basic, glitchy and really rough. Rocks couldn't turn, and their collision wasn't very good, but still for a first year programmer not bad at all. Now for the remake I decided to use an external library: [Box2D Web](https://code.google.com/p/box2dweb/). A javascript version of the Box2D physics engine. This gives much nicer physics and reduced the code I had to write myself.

### Graphics

For graphics, in the original, I used the engine of my teacher, Kevin Hoefman, it was very basic but more than enough when only using vector graphics. For the remake I use the HTML5 canvis, without any additional libraries.



<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="../planetoids_v2_0/js/planetoids.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		InitPlanetoids($("#planetoids_game")[0], 10);
	});
</script>
