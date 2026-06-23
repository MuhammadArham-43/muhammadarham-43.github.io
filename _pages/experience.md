---
layout: single
title: "Employment History"
permalink: /experience/
author_profile: true
---

<div class="timeline">
{% for job in site.data.employment.experience %}
  <div class="timeline__item{% if job.current %} timeline__item--current{% endif %}">
    <div class="timeline__date">
      {{ job.start }} — {{ job.end }}
      {% if job.current %}<span class="timeline__badge">Current</span>{% endif %}
    </div>
    <h2 class="timeline__role">{{ job.role }}</h2>
    <div class="timeline__company">{{ job.company }} &mdash; {{ job.location }}</div>
    <p class="timeline__description">{{ job.description }}</p>
  </div>
{% endfor %}
</div>
