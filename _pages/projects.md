---
layout: archive
title: "Projects"
permalink: /projects/
---

<div class="entries-grid">

{% for project in site.data.projects.projects %}

<article class="archive__item feature-card" itemscope itemtype="https://schema.org/CreativeWork">
  
  <div class="archive__item-teaser">
    <a href="{{ project.url }}" rel="permalink">
      <img src="{{ project.image_path | relative_url }}" alt="{{ project.title | escape }}" style="border: 1px solid #ddd; border-radius: 4px;">
    </a>
  </div>

  <div class="archive__item-body" style="padding: 1rem;">
    <h2 class="archive__item-title" itemprop="headline" style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
      <a href="{{ project.url }}" rel="permalink">{{ project.title }}</a>
    </h2>
    <div class="archive__item-excerpt" itemprop="description">
      <p>{{ project.excerpt }}</p>
    </div>
  </div>

</article>

{% endfor %}

</div>