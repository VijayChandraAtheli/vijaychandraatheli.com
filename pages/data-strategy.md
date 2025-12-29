---
layout: page
title: Data Strategy
subtitle: Thoughts on Data Architecture, Governance, and Modern Data Stack Design
permalink: /data-strategy/
---

<section class="articles-section">
    <div class="articles-grid">
        {% assign category_posts = site.posts | where: "category", "data-strategy" %}
        {% for post in category_posts %}
            {% include article-card.html post=post %}
        {% endfor %}
    </div>
    
    {% if category_posts.size == 0 %}
    <div style="text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; color: var(--gray);">No articles in this category yet. Check back soon!</p>
    </div>
    {% endif %}
</section>