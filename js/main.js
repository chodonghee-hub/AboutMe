import { loadIncludes } from './includes/include.js';
import { PROJECT_LIST } from './data/projects-data.js';
import { createProjectCard, startProjectCarousel } from './ui/project-card.js';

function renderProjects() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  PROJECT_LIST.forEach((project) => {
    const card = createProjectCard(project);
    grid.appendChild(card);
    startProjectCarousel(card);
  });
}

async function init() {
  await loadIncludes();
  renderProjects();
}

init();
