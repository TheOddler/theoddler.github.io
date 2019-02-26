### Main skills

<table>
	<tr>
		<td>Programming</td>
		<td>Object Oriented programming</td>
		{% if include.fpextended %}
		<td>Functional programming</td>
		{% else %}
		<td>Algorithms, game logic</td>
		{% endif %}
	</tr>
	<tr>
		<td>Design</td>
		<td colspan="2">OO design patterns, proper class design</td>
	</tr>
	<tr>
		<td>Unity 3D</td>
		<td>Fast prototyping</td>
		<td>C# game logic programming</td>
	</tr>
</table>


### Programming Languages

{% assign experience_explanation = "Combined from work, university and most of my spare time" %}

<table>
	<tr>
		<td>C#</td>
		<td title="{{ experience_explanation }}">6+ years of experience*</td>
		<td>LINQ, polymorphism, interfaces, ...</td>
	</tr>
	<tr>
		<td>SQL</td>
		<td title="{{ experience_explanation }}">1+ years of experience*</td>
	</tr>
	<tr>
		<td>Java</td>
		<td>Main language during master studies</td>
	</tr>
	<tr>
		<td>C++</td>
		<td>Main language during bachelor studies</td>
	</tr>
	{% if include.fpextended %}
	<tr>
		<td>Haskell</td>
		<td colspan="2">Some experience during master studies</td>
	</tr>
	<tr>
		<td>Elm</td>
		<td colspan="2">Some experience during master studies, preferred over js</td>
	</tr>
	{% endif %}
	<tr>
		<td>Other</td>
		<td colspan="2">Python, {% unless include.fpextended %}Haskell, Elm, {% endunless %}Rust, Prolog, C, Javascript, HTML, CSS, XML, ...</td>
	</tr>
	<tr>
		<td class="footnote" colspan="3">* {{ experience_explanation }}</td>
	</tr>
</table>


### Minor skills

<table>
	<tr>
		<td>Photoshop</td>
		<td>General photo and image editing</td>
		<td>Texturing (diff, spec, gloss, normal maps)</td>
	</tr>
	<tr>
		<td>Blender</td>
		<td>Optimized low-poly 3D modeling</td>
		<td>Unwrapping</td>
	</tr>
</table>
