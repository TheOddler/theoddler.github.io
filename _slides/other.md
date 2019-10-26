---
title: Other Projects
image: images/other.jpg
order: 1000
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
