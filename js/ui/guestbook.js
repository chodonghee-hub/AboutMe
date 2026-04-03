import { addComment, getComments, loginWithGoogle, logout, onAuthChange } from '../api/firebase.js';

let currentUser = null;

function formatDate(timestamp) {
  if (!timestamp) return '';
  const d = timestamp.toDate();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function createCommentCard(comment) {
  const $card = $('<div>').addClass('gb-comment-card');
  const safeName = $('<span>').text(comment.name).html();
  const safeMessage = $('<span>').text(comment.message).html();
  const avatarHtml = comment.photoURL
    ? `<img class="gb-comment-avatar" src="${comment.photoURL}" alt="${safeName}" />`
    : `<span class="gb-comment-avatar-fallback">👤</span>`;

  $card.html(`
    <div class="gb-comment-meta">
      <div class="gb-comment-author">
        ${avatarHtml}
        <span class="gb-comment-name">${safeName}</span>
      </div>
      <span class="gb-comment-date">${formatDate(comment.createdAt)}</span>
    </div>
    <p class="gb-comment-message">${safeMessage}</p>
  `);
  return $card;
}

async function loadComments() {
  const $list = $('#gb-comment-list');
  $list.html('<p class="gb-loading">댓글을 불러오는 중...</p>');

  try {
    const comments = await getComments();
    $list.empty();

    if (comments.length === 0) {
      $list.html('<p class="gb-empty">첫 번째 방문자가 되어보세요! 🙌</p>');
      return;
    }

    comments.forEach((c) => $list.append(createCommentCard(c)));
  } catch (e) {
    $list.html('<p class="gb-error">댓글을 불러오지 못했습니다.</p>');
    console.warn('댓글 로드 실패:', e.message);
  }
}

function showLoggedOutState() {
  $('#gb-logged-out').show();
  $('#gb-logged-in').hide();
}

function showLoggedInState(user) {
  $('#gb-logged-out').hide();
  $('#gb-logged-in').show();
  $('#gb-user-avatar').attr('src', user.photoURL).attr('alt', user.displayName);
  $('#gb-user-name').text(user.displayName);
}

export async function initGuestbook() {
  // 이벤트 핸들러를 먼저 등록 — loadComments()의 완료 여부와 무관하게 동작 보장
  onAuthChange((user) => {
    currentUser = user;
    if (user) {
      showLoggedInState(user);
    } else {
      showLoggedOutState();
    }
  });

  $('#gb-google-login').on('click', async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.warn('로그인 실패:', e.message);
      alert('로그인에 실패했습니다. 팝업 차단 또는 광고 차단기를 확인해주세요.');
    }
  });

  $('#gb-logout').on('click', async () => {
    try {
      await logout();
    } catch (e) {
      console.warn('로그아웃 실패:', e.message);
    }
  });

  $('#gb-form').on('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const message = $('#gb-message').val().trim();
    const $btn = $('#gb-submit');

    if (!message) return;

    $btn.prop('disabled', true).text('전송 중...');

    try {
      await addComment(currentUser, message);
      $('#gb-message').val('');
      await loadComments();
    } catch (e) {
      alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
      console.warn('댓글 등록 실패:', e.message);
    } finally {
      $btn.prop('disabled', false).text('남기기 →');
    }
  });

  // 이벤트 핸들러 등록 완료 후 댓글 로드 (네트워크 실패해도 버튼은 동작함)
  loadComments();
}
