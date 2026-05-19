import { loadIncludes } from './includes/include.js';
import { PROJECT_LIST } from './data/projects-data.js';
import { createProjectCard } from './ui/project-card.js';
import { fetchBojUser, getTierName, getTierImgUrl } from './api/solved-ac.js';

const CAROUSEL_GAP = 20;
const CLONE_COUNT = 4;

function renderProjects() {
  const $track = $('#proj-track');
  if ($track.length === 0) return;

  const total = PROJECT_LIST.length;
  $('#proj-count').text(total);

  PROJECT_LIST.forEach((project, index) => {
    $track.append(createProjectCard(project, index, total));
  });

  initCarousel(total);
  initImageSliders();
}

function initImageSliders() {
  $('#proj-track .proj-img-slider').each(function () {
    const $slides = $(this).find('.proj-slide-img');
    if ($slides.length <= 1) return;
    let cur = 0;
    setInterval(() => {
      $slides.eq(cur).removeClass('active');
      cur = (cur + 1) % $slides.length;
      $slides.eq(cur).addClass('active');
    }, 3000);
  });
}

function initCarousel(total) {
  const $track = $('#proj-track');
  const $dotsContainer = $('#proj-dots');

  // Clone last CLONE_COUNT cards → prepend; first CLONE_COUNT cards → append
  const $orig = $track.children();
  $orig.slice(-CLONE_COUNT).clone().prependTo($track);
  $orig.slice(0, CLONE_COUNT).clone().appendTo($track);

  let currentIndex = CLONE_COUNT;
  let isAnimating = false;

  function getStep() {
    const firstCard = $track.children()[0];
    return firstCard.offsetWidth + CAROUSEL_GAP;
  }

  function applyTransform(instant) {
    const tx = -currentIndex * getStep();
    if (instant) {
      $track[0].style.transition = 'none';
      $track[0].style.transform = `translateX(${tx}px)`;
      $track[0].offsetHeight; // force reflow
      $track[0].style.transition = 'transform 0.4s ease';
    } else {
      $track[0].style.transform = `translateX(${tx}px)`;
    }
  }

  // Initial position without animation
  $track[0].style.transition = 'none';
  applyTransform(false);
  $track[0].offsetHeight;
  $track[0].style.transition = 'transform 0.4s ease';

  // Dots
  for (let i = 0; i < total; i++) {
    const $dot = $('<button>').addClass('proj-dot').attr('data-index', i);
    if (i === 0) $dot.addClass('active');
    $dotsContainer.append($dot);
  }

  function getRealIndex() {
    return (currentIndex - CLONE_COUNT + total) % total;
  }

  function updateDots() {
    $dotsContainer.children().removeClass('active');
    $dotsContainer.children().eq(getRealIndex()).addClass('active');
  }

  $track[0].addEventListener('transitionend', (e) => {
    if (e.target !== $track[0] || e.propertyName !== 'transform') return;
    if (currentIndex >= CLONE_COUNT + total) {
      currentIndex -= total;
      applyTransform(true);
    } else if (currentIndex < CLONE_COUNT) {
      currentIndex += total;
      applyTransform(true);
    }
    isAnimating = false;
  });

  function navigate(dir) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += dir;
    applyTransform(false);
    updateDots();
  }

  $('#proj-prev').on('click', () => navigate(-1));
  $('#proj-next').on('click', () => navigate(1));

  $dotsContainer.on('click', '.proj-dot', function () {
    if (isAnimating) return;
    currentIndex = parseInt($(this).data('index')) + CLONE_COUNT;
    isAnimating = true;
    applyTransform(false);
    updateDots();
  });

  $(window).on('resize.carousel', () => applyTransform(true));
}

async function updateBojData() {
  try {
    const user = await fetchBojUser();

    $('#hero-tier-img').attr('src', getTierImgUrl(user.tier));
    $('#hero-tier-name').text(getTierName(user.tier));

    $('#boj-tier').text(getTierName(user.tier));
    $('#boj-solved').text(user.solvedCount.toLocaleString());
    $('#boj-rating').text(user.rating.toLocaleString());
    $('#boj-rank').text('#' + user.rank.toLocaleString());
    $('#boj-streak').text(user.maxStreak ?? user.streak ?? '—');
  } catch (e) {
    console.warn('백준 데이터 로드 실패:', e.message);
    $('#boj-tier, #boj-solved, #boj-rating, #boj-rank, #boj-streak').text('N/A');
  }
}

async function init() {
  await loadIncludes();
  renderProjects();
  updateBojData();
}

init();
