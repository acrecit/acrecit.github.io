---
layout: page
title: HALL OF FAME
permalink: /hall/
---

<div class="hall-of-fame">
  <div class="hall-header">
    <h1>HALL OF FAME</h1>
    <p class="hall-subtitle">distinguished contributors and esteemed associates</p>
  </div>

  <div class="hall-grid">
    {% for member in site.data.hall_members %}
      <div class="hall-item">
        {% if member.name %}
          <div class="hall-name">{{ member.name }}</div>
        {% endif %}
        <img src="{{ member.image }}" 
             alt="{{ member.name | default: 'Hall member' }}" 
             class="hall-image">
      </div>
    {% endfor %}
  </div>
</div>

<!-- Modal for image preview -->
<div class="image-modal">
  <span class="close-modal">&times;</span>
  <img class="modal-content" id="expanded-image">
</div>
