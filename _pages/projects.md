---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

<div class="entries-grid projects-grid">

{% for project in site.data.projects.projects %}

<article class="archive__item archive__item--2-col" itemscope itemtype="https://schema.org/CreativeWork">
  <div class="archive__item-body" style="padding-top: 0.5rem; padding-bottom: 1rem;">
    <h2 class="archive__item-title" itemprop="headline" style="margin-top: 0; margin-bottom: 0.5rem;">
      <a href="{{ project.url }}" rel="permalink">{{ project.title }}</a>
    </h2>
    <div class="archive__item-excerpt" itemprop="description" style="margin-bottom: 0.5rem;">
      <p>{{ project.excerpt }}</p>
    </div>
  </div>

  <div class="archive__item-teaser-small" style="width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 0.35rem;">
    <a href="{{ project.url }}" rel="permalink" style="display: block; width: 100%; height: 100%;">
      <img src="{{ project.image_path | relative_url }}"
           alt="{{ project.title | escape }}"
           style="width: 100%; height: 100%; object-fit: cover; display: block;">
    </a>
  </div>

  <hr class="project-divider" style="width: 100%; border: none; border-top: 1px solid var(--global-border-color, #e0e0e0); margin: 1.25rem 0 0;">

</article>

{% endfor %}

</div>