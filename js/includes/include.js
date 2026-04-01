export async function loadIncludes() {
  const includeTargets = document.querySelectorAll('[data-include]');

  const tasks = [...includeTargets].map(async (target) => {
    const filePath = target.getAttribute('data-include');
    if (!filePath) return;

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load: ${filePath}`);
      }

      const html = await response.text();
      target.outerHTML = html;
    } catch (error) {
      console.error(error);
      target.outerHTML = `<section><p>섹션을 불러오지 못했습니다: ${filePath}</p></section>`;
    }
  });

  await Promise.all(tasks);
}
