---
layout: page
title: Journal
subtitle: Insights on Business Intelligence, Analytics & Technology Strategy
permalink: /journal/
---

<section class="articles-section">
    <div class="articles-grid">
        {% for post in site.posts %}
            {% include article-card.html post=post %}
        {% endfor %}
    </div>
    
    {% if site.posts.size == 0 %}
    <div style="text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; color: var(--gray);">No articles published yet. Check back soon!</p>
    </div>
    {% endif %}
</section>