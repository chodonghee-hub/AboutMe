PROJECT_LIST = [
  {
    title: '포옹',
    desc: '반려동물 임시 보호 서비스', 
    img: '../img/pawong_logo.png'
  },
  {
    title: '포옹',
    desc: '반려동물 임시 보호 서비스', 
    img: '../img/pawong_logo.png'
  },
  {
    title: '포옹',
    desc: '반려동물 임시 보호 서비스', 
    img: '../img/pawong_logo.png'
  },
  {
    title: '포옹',
    desc: '반려동물 임시 보호 서비스', 
    img: '../img/pawong_logo.png'
  }
]

const grid = document.getElementById("project-grid");

PROJECT_LIST.forEach(p => {
  const item = document.createElement("div");
  item.className = "proj-item";

  item.innerHTML = `
    <div class="proj-thumb">
      <img class="proj-thumb-img" src='${p.img}' alt='thumb-nail'/>
    </div>
    <div class="proj-details">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `;

  grid.appendChild(item);
});