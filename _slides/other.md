---
title: Other Projects
image: images/other.jpg
order: 5
---

{% assign ordered = site.projects | sort: 'order' %}
{% for project in ordered %}
{% unless project.content == "" %}
{% if project.custom_url %}### [{{ project.title }}]({{ project.custom_url }}){% endif %}
{% unless project.custom_url %}### {{ project.title }}{% endunless %}
{{ project.content }}
{% endunless %}
{% endfor %}
