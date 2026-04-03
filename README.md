# _AboutMe_ (자기소개 포트폴리오 페이지 👋)
🌐 <a href="https://about-me-beta-blue.vercel.app/">Live Demo 바로가기</a><br>
📌 CORP : KOSTA <br />
📌 DURATION <br>
<ul>
    <li>proto type : 2026.03.14 ~ 2026.03.19</li>
    <li>refactoring : 2026.03.29 ~ 2026.04.03</li>
</ul>
<br>

## 🛠️ _Skills_
| 분류           | 기술                           |
| -------------- | ------------------------------ |
| **Frontend**   | _HTML5_, _CSS3_, _JavaScript (ES6+)_, _jQuery_ |
| **Deployment** | _Vercel_                         |
| **Design**     | _Figma_                          |
| **REST API**     | _BOJ_, _FireBase_              |


<br>

## _✔ Abstract_

> _자기소개 및 이력을 정리하기 위한 개인 포트폴리오 페이지 제작_

<div align="center">
  <img width="851" height="511" alt="image" src="https://github.com/user-attachments/assets/f4d9a1cd-0b7a-4e0a-8488-16ca2bfe4f2c" />
</div>

## 📖 _Sections_

> **핵심 프로젝트 요약 및 시각화**

<div align='center'>
    <img width="632" height="800" alt="image" src="https://github.com/user-attachments/assets/6f9a9904-9e39-4d42-98a1-20d9ea479e16" />
</div>
<br>

> **경험 및 이력 사항 정리**

<div align='center'>
    <img width="611" height="363" alt="image" src="https://github.com/user-attachments/assets/97419cc0-5427-49c1-ab99-dca662c11768" />
</div>
<br>

> **REST API ( BOJ )**
<div align='center'>
    <img width="234" height="141" alt="image" src="https://github.com/user-attachments/assets/c78632d0-76d9-4381-8763-890c90d471ca" />
    <img width="641" height="509" alt="image" src="https://github.com/user-attachments/assets/3f01c8fe-0a7c-4e0f-afcd-854d2fed43b9" />

</div>
<br>

## 📂 _Project Structure_

```Plaintext
root
├── index.html                 # 메인 HTML 
├── README.md
├── .gitignore
├── assets/img/                # 이미지 (로고, 프로젝트 스크린샷 등)
│
├── css/                       # 모듈형 CSS 구조
│   ├── style.css              # 스타일 진입점
│   ├── responsive.css         # 반응형 미디어쿼리
│   ├── base/                  # 기본 스타일
│   │   ├── base.css
│   │   ├── reset.css
│   │   └── variables.css
│   ├── components/            # 재사용 컴포넌트 스타일
│   │   ├── badge.css
│   │   ├── card.css
│   │   └── section-title.css
│   ├── layout/
│   │   ├── main.css
│   │   └── navigation.css
│   └── sections/              # 섹션별 스타일
│       ├── about.css
│       ├── achievements.css
│       ├── algorithm.css
│       ├── experience.css
│       ├── hero.css
│       ├── projects.css
│       └── tech.css
│
├── js/                        # JavaScript 모듈
│   ├── main.js                # 메인 진입점
│   ├── api/
│   │   └── solved-ac.js       # BOJ(Solved.ac) API 클라이언트
│   ├── data/
│   │   └── projects-data.js   # 프로젝트 데이터
│   ├── includes/
│   │   └── include.js         # 섹션 동적 로더
│   └── ui/
│       └── project-card.js    # 프로젝트 카드 컴포넌트
│
└── sections/                  # HTML 섹션 조각 (동적 로드)
    ├── about.html
    ├── achievements.html
    ├── algorithm.html
    ├── experience.html
    ├── hero.html
    ├── projects.html
    └── tech-stack.html

```

## _⚙️ Ground Setting_

🎨 **Color Palette**

```
  --bg: #0d1117;
  --card: #161b22;
  --border: #30363d;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --blue: #58a6ff;
  --purple: #bc8cff;
```

<br>

🧩 **Layout Guides ( _@Media query_ )**

```
  --max-w: 900px  <-- Desktop Max Width
  --min-w: 320px  <-- Mobile Min Width
  --nav-h: 70px   <-- Navbar Height
```

<br>


## 🔄 _Init Project_
이 프로젝트는 `fetch()`로 `sections/*.html`을 불러오기 때문에 `file://`로 직접 열지 말고 로컬 서버에서 실행해야 합니다.

예시:

```bash
npx serve
```

또는 VS Code Live Server를 사용하세요.

<br>

## ✏️ **_`Commit Type`_**

| 타입         | 설명                                                           | 예시                                               |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------- |
| **feat**     | 새로운 기능을 추가할 때 사용합니다.                            | `feat: 로그인 폼 유효성 검사 추가`                 |
| **fix**      | 버그를 수정할 때 사용합니다.                                   | `fix: 로그인 버그 수정`                            |
| **style**    | 사용자 인터페이스 관련 변경 사항.                              | `style: 네비게이션 바 디자인 수정`                 |
| **refactor** | 버그 수정이나 기능 추가 없이 코드 구조를 개선할 때 사용합니다. | `refactor: 컴포넌트 상태 관리 로직 단순화`         |
| **perf**     | 성능을 개선하는 코드 변경.                                     | `perf: 이미지 로딩 시간 최적화`                    |
| **test**     | 테스트 코드를 추가하거나 수정할 때 사용합니다.                 | `test: 버튼 컴포넌트에 대한 단위 테스트 추가`      |
| **docs**     | 문서만 변경할 때 사용합니다.                                   | `docs: 설치 단계 README에 추가`                    |
| **chore**    | 소스나 테스트 파일을 수정하지 않는 일반적인 작업이나 업데이트. | `chore: 종속성 패키지 업데이트`                    |
| **revert**   | 이전 커밋을 되돌릴 때 사용합니다.                              | `revert: "로그인 폼 유효성 검사 추가" 커밋 되돌림` |
| **init**     | 프로젝트 초기 설정 시 사용합니다.                              | `init: React 프로젝트 초기 설정`                   |
| **delete**   | 코드/파일 삭제.                                                | `delete: 안 쓰는 로그인 컴포넌트 삭제`             |
| **wip**      | 작업 중이거나 실험적인 변경 사항.                              | `wip: 새로운 인증 방법을 실험 중`                  |