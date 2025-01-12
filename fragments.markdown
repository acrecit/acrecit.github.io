---
layout: page
title: FRAGMENTS
permalink: /fragments/
---

<div class="fragments-page">
  <div class="fragments-header">
    <h1>FRAGMENTS</h1>
    <p class="fragments-subtitle">unstructured thoughts and observations</p>
  </div>

  <div class="fragments-timeline">
    {% assign fragments = site.data.fragments | sort: 'date' | reverse %}
    {% for fragment in fragments %}
      <div class="fragment-item">
        <div class="fragment-meta">
          <time>{{ fragment.date | date: "%Y-%m-%d" }}</time>
          <span class="fragment-title">{{ fragment.title }}</span>
        </div>
        <div class="fragment-content">
          <div class="fragment-preview">
            {{ fragment.content | truncatewords: 50 | markdownify }}
          </div>
          <div class="fragment-full">
            {{ fragment.content | markdownify }}
          </div>
          {% assign words = fragment.content | number_of_words %}
          {% if words > 50 %}
            <button class="expand-toggle">Read more</button>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<script>
document.querySelectorAll('.expand-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.parentElement;
    content.classList.toggle('expanded');
    button.textContent = content.classList.contains('expanded') ? 'Show less' : 'Read more';
  });
});
</script>
