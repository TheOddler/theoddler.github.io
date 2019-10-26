---
title: Planetoids
image: images/planetoids.jpg
order: 4
custom_url: /planetoids/
description: An Asteroids inspired game, rocks are sliced along the laser
long_description: |
    An Asteroids inspired game in which rocks are sliced along the laser, exactly where hit.
---

<div id="planetoids_game" width="100%"><canvas style="border: none; position: relative;" width="100%" onselectstart="return false;" oncontextmenu="return false;"></canvas></div>

## An awesome space shooting game

Planetoids is a little game I made in my first year of DAE. It's a lot like astroids yet with unique movement controls and a twist on the laser. When your little spacecraft shoots a laser it slices the planetoid exactly where hit.

I remade it several times as I was learning new web technologies. First recreating it using WebGL for the graphics, and then later using the html5 canvas. The latter is what you're seeing above. Originally it used a custom physics engine, but now it uses Box2dweb.

Later I also made an Android version using Unity, which you can [download on the Google Play store](https://play.google.com/store/apps/details?id=com.TheOddler.PlanetoidsUnity) for free.

Read more about the game [here]({{site.baseurl}}/planetoids/) or [play it in fullscreen]({{site.baseurl}}/planetoids_v2_0/).

<script type="text/javascript" src="planetoids_v2_0/js/planetoids.js"></script>
<script type="text/javascript">
	if (!jQuery.browser.mobile) {
		var planetoids = $("#planetoids_game");
		var planetoidsCanvas = planetoids.children("canvas")[0];

		planetoidsCanvas.width = planetoids.width();
		planetoidsCanvas.height = planetoids.width() * 0.75;
		InitPlanetoids(planetoidsCanvas, 5);
	}
	else {
		$("#planetoids_game").hide();
		//TODO Place video instead.
	}
</script>
