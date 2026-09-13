(function () {
  // ---- syntax highlighting (degrades to plain text if the CDN is blocked) --
  try {
    if (window.hljs) {
      window.hljs.configure({ ignoreUnescapedHTML: true });
      document.querySelectorAll('pre code').forEach(function (el) {
        try { window.hljs.highlightElement(el); } catch (e) {}
      });
    }
  } catch (e) {}

  // ---- theme: Rose Pine Dawn / Rose Pine, following the OS until chosen ----
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var KEY = 'wpf-guide-theme';

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function systemDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function current() { return root.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light'); }
  function paint() {
    if (!toggle) return;
    var dark = current() === 'dark';
    toggle.classList.toggle('is-dark', dark);
    toggle.querySelector('.theme-name').textContent = dark ? 'Ros\u00E9 Pine' : 'Dawn';
    toggle.setAttribute('aria-label',
      dark ? 'Theme: Ros\u00E9 Pine. Switch to Dawn.' : 'Theme: Dawn. Switch to Ros\u00E9 Pine.');
  }
  paint();
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      paint();
    });
  }
  if (window.matchMedia) {
    var q = window.matchMedia('(prefers-color-scheme: dark)');
    var on = function () { if (!stored()) paint(); };
    if (q.addEventListener) q.addEventListener('change', on);
    else if (q.addListener) q.addListener(on);
  }

  // ---- contents drawer starts closed on narrow screens --------------------
  var contents = document.querySelector('.contents');
  if (contents && window.matchMedia('(max-width: 940px)').matches) {
    contents.removeAttribute('open');
  }

  // ---- left/right arrows walk the pager -----------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    var sel = e.key === 'ArrowLeft' ? '.pager-prev' : e.key === 'ArrowRight' ? '.pager-next' : null;
    if (!sel) return;
    var link = document.querySelector(sel);
    if (link) window.location.href = link.getAttribute('href');
  });
})();
