// nav.js — puts the shared nav and footer into every page
// 注意：必须通过 HTTP 打开（VS Code Live Server 或线上 Pages）。
// 直接在 file:// 里双击打开时，浏览器会拦截 fetch。

function inject(file, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return; // 这个页面没有对应的占位容器，安静跳过

  // cache: 'no-store' —— 绕过浏览器/GitHub Pages 的 10 分钟缓存，
  // 否则改完 nav.html 后页面上还会显示旧内容
  fetch(file, { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error(file + ' 加载失败：HTTP ' + res.status);
      return res.text();
    })
    .then(function (html) {
      target.innerHTML = html;
    })
    .catch(function (err) {
      console.warn('[nav.js]', err.message);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  inject('nav.html', 'site-header');
  inject('footer.html', 'site-footer');
});
