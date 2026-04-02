const BOJ_HANDLE = 'timandsunny';

const TIER_NAMES = [
  'Unrated',
  'Bronze V', 'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I',
  'Silver V', 'Silver IV', 'Silver III', 'Silver II', 'Silver I',
  'Gold V',   'Gold IV',   'Gold III',   'Gold II',   'Gold I',
  'Platinum V', 'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I',
  'Diamond V', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I',
  'Ruby V',   'Ruby IV',   'Ruby III',   'Ruby II',   'Ruby I',
];

const CORS_PROXY = 'https://corsproxy.io/?url=';

export async function fetchBojUser(handle = BOJ_HANDLE) {
  const target = `https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(handle)}`;
  const res = await fetch(CORS_PROXY + encodeURIComponent(target));
  if (!res.ok) throw new Error(`solved.ac API 오류: ${res.status}`);
  return res.json();
}

export function getTierName(tier) {
  return TIER_NAMES[tier] ?? 'Unrated';
}

export function getTierImgUrl(tier) {
  return `https://d2gd6pc034wcta.cloudfront.net/tier/${tier}.svg`;
}
