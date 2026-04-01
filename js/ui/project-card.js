export function createProjectCard(project) {
  const item = document.createElement('div');
  item.className = 'proj-item';

  const images = project.imgs || (project.img ? [project.img] : []);
  const slidesHtml = images
    .map(
      (src, i) => `
        <img class="proj-thumb-img ${i === 0 ? 'active' : ''}" src="${src}" alt="${project.title} thumbnail" />
      `,
    )
    .join('');

  const badges = (project.work || [])
    .map((v) => `<div class="proj-badge">${v}</div>`)
    .join('');

  item.innerHTML = `
    <div class="proj-thumb">
      <div class="slide-wrapper">
        ${slidesHtml}
      </div>
    </div>
    <div class="proj-details">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
    </div>
    <div class="proj-badge-list">
      ${badges}
    </div>
  `;

  return item;
}

export function startProjectCarousel(item) {
  const slides = item.querySelectorAll('.proj-thumb-img');
  if (slides.length <= 1) return;

  let currentIdx = 0;

  setInterval(() => {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }, 3000);
}
