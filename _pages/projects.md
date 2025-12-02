---
title: "Projects"
layout: archive
permalink: /projects/
author_profile: true
---

{% for project in site.data.projects.projects %}

<div class="list__item">
  <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
    <div class="archive__item-teaser">
      <a href="{{ project.url }}" rel="permalink"><img src="{{ project.image_path | relative_url }}" alt=""></a>
    </div>
    <div class="archive__item-body">
      <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ project.url }}" rel="permalink">{{ project.title }}</a>
      </h2>
      <div class="archive__item-excerpt" itemprop="description">
        <p>{{ project.excerpt }}</p>
      </div>
      <p><a href="{{ project.url }}" class="btn btn--primary">View Project</a></p>
    </div>
  </article>
</div>

{% endfor %}