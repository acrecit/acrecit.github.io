---
layout: page
title: Currently Reading
permalink: /resources/current/
---

<div class="page">
  <div class="posts-container">
    <h1 class="posts-title"></h1>
    <div class="posts-list">
      {% for book in site.data.current_reading %}
        <div class="post-item">
          <a href="#" class="post-link">{{ book.title }}</a>
          <span class="post-meta">{{ book.author }}</span>
        </div>
      {% endfor %}
    </div>
  </div>
</div>