import { loadIncludes } from './includes/include.js';
import { PROJECT_LIST } from './data/projects-data.js';
import { createProjectCard, startProjectCarousel } from './ui/project-card.js';
import { fetchBojUser, getTierName, getTierImgUrl } from './api/solved-ac.js';

function renderProjects() {
  const $grid = $('#project-grid');
  if ($grid.length === 0) return;

  PROJECT_LIST.forEach((project) => {
    const $card = createProjectCard(project);
    $grid.append($card);
    startProjectCarousel($card);
  });
}

async function updateBojData() {
  try {
    const user = await fetchBojUser();

    $('#hero-tier-img').attr('src', getTierImgUrl(user.tier));
    $('#hero-tier-name').text(getTierName(user.tier));

    $('#algo-tier').text(getTierName(user.tier));
    $('#algo-solved').text(user.solvedCount.toLocaleString());
    $('#algo-rating').text(user.rating.toLocaleString());
    $('#algo-rank').text('#' + user.rank.toLocaleString());
  } catch (e) {
    console.warn('백준 데이터 로드 실패:', e.message);
    $('#algo-tier, #algo-solved, #algo-rating, #algo-rank').text('N/A');
  }
}

async function init() {
  await loadIncludes();
  renderProjects();
  updateBojData();
}

init();
