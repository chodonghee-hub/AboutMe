PROJECT_LIST = [
  {
    title: "포옹",
    desc: "임시보호 중인 반려동물들을 위한 커뮤니티 서비스<br>피드를 통해 임보상태를 공유하고 유저간 후원이 가능",
    imgs: [
      "../img/pawong_logo.png",
      "../img/pawong.png",
      "../img/pawong_petList.png",
      "../img/pawong_info.png",
      "../img/pawong_donation.png",
    ],
    work: ["개발 리드", "기획", "FE", "UI/UX"],
  },
  {
    title: "PopFlix",
    desc: "로튼 토마토 지수를 참고한 영화 리뷰 커뮤니티 서비스<br>자신의 취향과 맞는 영화들을 목록으로 만들고 유저간에 공유 및 평가",
    imgs: [
      "../img/popflix_logo.png",
      "../img/popflix_detail.png",
      "../img/popflix_search.png",
      "../img/popflix_watch_list.png",
      "../img/popflix_404.png",
    ],
    work: ["개발 리드", "기획", "FE", "UI/UX"],
  },
  {
    title: "SAR Denoising With Deep Learning",
    desc: "CNN 및 gaussian noise기법과 PSNR 평가 방법을 적용한 Deep Learning모델 개발 <br>동적 웹크롤링을 통해 NASA SAR Image dataset 확보",
    imgs: [
      "../img/SAR_Denoising.png",
      "../img/SAR_webCrawling.png",
      "../img/SAR_DnCNN.png",
      "../img/SAR_thesis.png",
    ],
    work: ["개발 리드", "DeepLearning", "모델학습"],
  },
];

const grid = document.getElementById("project-grid");

PROJECT_LIST.forEach((p, index) => {
  const item = document.createElement("div");
  item.className = "proj-item";

  // 이미지들을 생성 (배열이 아니면 빈 배열 처리)
  const images = p.imgs || [p.img];
  const slidesHtml = images
    .map(
      (src, i) => `
    <img class="proj-thumb-img ${i === 0 ? "active" : ""}" src='${src}' alt='thumb-nail'/>
  `,
    )
    .join("");

  const workArr = p.work;
  const badges = workArr
    .map((v) => `<div class="proj-badge">${v}</div>`)
    .join("");

  item.innerHTML = `
    <div class="proj-thumb">
      <div class="slide-wrapper">
        ${slidesHtml}
      </div>
    </div>
    <div class="proj-details">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
    <div class="proj-badge-list">
      ${badges}
    </div>
  `;

  grid.appendChild(item);

  // 이미지가 2개 이상일 때만 캐러셀 작동
  if (images.length > 1) {
    let currentIdx = 0;
    const slides = item.querySelectorAll(".proj-thumb-img");

    setInterval(() => {
      slides[currentIdx].classList.remove("active");
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add("active");
    }, 3000); // 3초마다 전환
  }
});
