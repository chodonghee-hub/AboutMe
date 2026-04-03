export default async function handler(req, res) {
  const handle = req.query.handle || 'timandsunny';

  try {
    const response = await fetch(
      `https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(handle)}`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: 'solved.ac API 오류' });
    }
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
