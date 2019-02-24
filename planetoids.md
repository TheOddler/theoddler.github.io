---
layout: more_page
title: Planetoids
---

<canvas id="planetoids_game" style="border: none; position: relative;" width="800" height="600" onselectstart="return false;" oncontextmenu="return false;"></canvas>

## Planetoids

For my exams of my first year of DAE I had to remake a classic game. It was for my maths & physics class so graphics weren't that important. I chose to remake Asteroids, but give it my own spin. I added my own controlls and upgraded the spaceship's laser to slice the astroids exactly where hit.

Over the years I remade Planetoids several times as I was learning new web technologies.

### Physics

In the original I wrote all physics myself, they were very basic, glitchy and really rough. Rocks couldn't turn, and their collision wasn't very good, but still for a first year programmer not bad at all. Now for the remake I decided to use an external library: [Box2D Web](https://code.google.com/p/box2dweb/). A javascript version of the Box2D physics engine. This gives much nicer physics and gave me a chance to try out the wonderful Box2D physics engine.

### Graphics

For graphics, in the original, I used an engine written by one of my teachers, Kevin Hoefman, it was very basic but more than enough when only using vector graphics. 
When remaking the game for the web, I initially used WebGL for graphics as that was what I was learning at the time.
It gave me a good little project to do while I learned.
Later I again remade it, now using the HTML5 canvas, again as a learning exercise.
This is also the version you are seeing at the top of this page now.

## Android and Unity

I also made a version for Android, using Unity as an engine.
You can [download it on the Google Play store](https://play.google.com/store/apps/details?id=com.TheOddler.PlanetoidsUnity) and play it for free.


<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="../planetoids_v2_0/js/planetoids.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		InitPlanetoids($("#planetoids_game")[0], 10);
	});
</script>
