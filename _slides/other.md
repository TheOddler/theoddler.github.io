---
title: Other Projects
image: images/other.jpg
date: 0000/02
---

{%- assign ordered = site.projects | sort: 'order' -%}
{%- for project in ordered -%}
{%- if project.long_description -%}

{%- if project.custom_url -%}
### [{{ project.title }}]({{ project.custom_url }})
{% endif %}
{%- unless project.custom_url -%}
### {{ project.title }}
{% endunless %}

{{ project.long_description }}

{%- endif -%}
{%- endfor -%}
