---
layout: page
title: Recommended Reading
permalink: /resources/recommended/
---

<div class="page">
  <div class="posts-container">
    <h1 class="posts-title"></h1>
    <div class="posts-list">
      {% for category in site.data.recommended_reading %}
        {% for book in category.books %}
          <div class="post-item">
            <a href="#" class="post-link">{{ book.title }}</a>
            <span class="post-meta">{{ book.author }}</span>
          </div>
        {% endfor %}
      {% endfor %}
    </div>
  </div>
</div>