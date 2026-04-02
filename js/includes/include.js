export async function loadIncludes() {
  const tasks = $('[data-include]').toArray().map((target) => {
    const $target = $(target);
    const filePath = $target.data('include');
    if (!filePath) return Promise.resolve();

    return new Promise((resolve) => {
      $.get(filePath)
        .done((html) => {
          $target.replaceWith(html);
          resolve();
        })
        .fail(() => {
          $target.replaceWith(`<section><p>섹션을 불러오지 못했습니다: ${filePath}</p></section>`);
          resolve();
        });
    });
  });

  await Promise.all(tasks);
}
