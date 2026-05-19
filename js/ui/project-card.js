export function createProjectCard(project, index, total) {
  const imgs = project.imgs || [];
  const hasImgs = imgs.length > 0;

  const headerContent = hasImgs
    ? `<div class="proj-img-slider">${imgs.map((src, i) =>
        `<img class="proj-slide-img${i === 0 ? ' active' : ''}" src="${src}" alt="${project.title}" />`
      ).join('')}</div>`
    : `<div class="proj-icon-wrap"><span class="proj-icon-text">${project.icon || project.title[0]}</span></div>`;

  const meta = [project.role, project.year, project.category].filter(Boolean).join(' · ');
  const cardNum = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const link = project.link || '#';
  const linkAttrs = link !== '#' ? ' target="_blank" rel="noopener"' : '';

  const $card = $('<article>').addClass('proj-card');
  $card.html(`
    <div class="proj-color-header" style="background:${hasImgs ? '#fff' : (project.color || '#888')}">
      ${headerContent}
      <span class="proj-hex-badge">${project.color || ''}</span>
    </div>
    <div class="proj-body">
      ${meta ? `<p class="proj-meta-row">${meta}</p>` : ''}
      <h3 class="proj-title">${project.title}</h3>
      <p class="proj-desc">${project.desc}</p>
      <div class="proj-foot">
        <a class="proj-learn-more" href="${link}"${linkAttrs}>Learn more ›</a>
        <span class="proj-card-num">${cardNum}</span>
      </div>
    </div>
  `);

  return $card;
}
