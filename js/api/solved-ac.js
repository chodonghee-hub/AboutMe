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

const CORS_PROXIES = [
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

export async function fetchBojUser(handle = BOJ_HANDLE) {
  const target = `https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(handle)}`;

  for (const buildUrl of CORS_PROXIES) {
    try {
      const res = await fetch(buildUrl(target));
      if (!res.ok) continue;
      return await res.json();
    } catch {
      // 다음 프록시 시도
    }
  }

  throw new Error('모든 CORS 프록시 실패');
}

export function getTierName(tier) {
  return TIER_NAMES[tier] ?? 'Unrated';
}

export function getTierImgUrl(tier) {
  return `https://d2gd6pc034wcta.cloudfront.net/tier/${tier}.svg`;
}
