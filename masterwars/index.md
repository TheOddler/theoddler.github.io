---
layout: more_page
title: Master Wars
---

<style type="text/css">

	<!--
	body {
		font-family: Helvetica, Verdana, Arial, sans-serif;
		background-color: white;
		color: black;
		text-align: center;
	}
	a:link, a:visited {
		color: #000;
	}
	a:active, a:hover {
		color: #666;
	}
	p.header {
		font-size: small;
	}
	p.header span {
		font-weight: bold;
	}
	p.footer {
		font-size: x-small;
	}
	div.broken,
	div.missing {
		margin: auto;
		position: relative;
		top: 50%;
		width: 193px;
	}
	div.broken a,
	div.missing a {
		height: 63px;
		position: relative;
		top: -31px;
	}
	div.broken img,
	div.missing img {
		border-width: 0px;
	}
	div.broken {
		display: none;
	}
	div#unityPlayer {
		cursor: default;
		height: 600px;
		width: 800px;
	}
	-->

</style>



<div id="unityPlayer">
	<div class="missing">
		<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!">
			<img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" />
		</a>
	</div>
</div>

## How To Play

Move the camera by dragging with the middle-mouse button.

You start as the blue player.

You can build units by clicking factories, the small buildings with wavy roofs.

To attack first select a unit, then move it next to an enemy unit, then click the unit to attack and confirm.

Capture neutral or enemy buildings by moving your unit on them, and clicking the capture button that appears. This will take multiple turns.

To end your turn click the menu button, bottom right, and click the 'next turn' button, middle right. (There are a bunch of other unused buttons, as well as some bugs in the menu.)

## Master Wars

Master Wars is a litte project I started years ago. I first made a very simple 2D clone of Advance Wars with a friend as a school project. Later I decided to make my own turn-based strategy in 3D using Unity, still based on Advance Wars but no longer a clone. It used hexagons as tiles but it was still a flat playing field. Then I got an internship at Vanguard Games and I decided to rewrite the whole game since I learned a lot there. I then changed to world from a flat playing field, to the planets I have now.


<script type='text/javascript' src='https://ssl-webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/jquery.min.js'></script>

<script type="text/javascript">

	<!--
	var unityObjectUrl = "http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js";
	if (document.location.protocol == 'https:')
		unityObjectUrl = unityObjectUrl.replace("http://", "https://ssl-");
	document.write('<script type="text\/javascript" src="' + unityObjectUrl + '"><\/script>');
	-->

</script>

<script type="text/javascript">

	<!--
	var config = {
		width: 800,
		height: 600,
		params: { enableDebugging:"0" }

	};
	config.params["disableContextMenu"] = true;
	var u = new UnityObject2(config);

	jQuery(function() {
		var $missingScreen = jQuery("#unityPlayer").find(".missing");
		var $brokenScreen = jQuery("#unityPlayer").find(".broken");
		$missingScreen.hide();
		$brokenScreen.hide();

		u.observeProgress(function (progress) {
			switch(progress.pluginStatus) {
			case "broken":
				$brokenScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$brokenScreen.show();
				break;
			case "missing":
				$missingScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$missingScreen.show();
				break;
			case "installed":
				$missingScreen.remove();
				break;
			case "first":
				break;
			}
		});
		u.initPlugin(jQuery("#unityPlayer")[0], "//dl.dropboxusercontent.com/u/10448192/Master%20Wars%20Ball/Master%20Wars%20Ball.unity3d");
	});
	-->

</script>
