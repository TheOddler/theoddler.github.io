---
layout: more_page
title: War Systems
---

War Systems is a litte project I started years ago, then called "Master Wars". I first made a very simple 2D clone of Advance Wars with a friend as a school project. Later I decided to make my own turn-based strategy in 3D using Unity, still based on Advance Wars but no longer a simple clone, this was Master Wars. It used hexagons as tiles but it was still a flat playing field.

After I got an internship at Vanguard Games, I decided to rewrite the whole game since I learned a lot there. I changed the world from a flat playing field, to the planets I have now.

Recently I've restarted the project once again. Applying everything I learned during my master studies. Now I'm focussing on a full undo/redo system and sync/async networked multiplayer. This by using the command-pattern to make all actions undo-able, and a better split between model and view.

## Play

I made a Unity build of the most playable version I have. This however is and old version, and is now being rewritten entirely. Still, you might like it.

Note that this uses the Unity Webplayer, which is getting phased out, so this might not work for you. I would make a WebGL build, but Unity's WebGL really isn't up to the task yet. Hopefully this will change in the coming years.

<div class="unityPlayer" data-options='{"url": "{{site.masterwars_unity}}"}'>You don't seem to have the Unity Webplayer installed, or are using a webbrowser that no-longer supports </div>

{% include makeunity3d.html %}

### How To Play

Move the camera by dragging with the middle-mouse button.

You start as the blue player.

You can build units by clicking factories, the small buildings with wavy roofs.

To attack first select a unit, then move it next to an enemy unit, then click the unit to attack and confirm.

Capture neutral or enemy buildings by moving your unit on them, and clicking the capture button that appears. This will take multiple turns.

To end your turn click the menu button, bottom right, and click the 'next turn' button, middle right. (There are a bunch of other unused buttons, as well as some bugs in the menu.)
