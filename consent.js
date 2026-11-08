/* Cookie consent for mcgeews.ie
   Google Analytics is only loaded after the visitor clicks Accept.
   The choice is stored in localStorage (strictly necessary, no consent needed).
   Any element with data-cookie-settings reopens the banner. */
(function () {
  var GA_ID = 'G-2VK81QZF7L';
  var KEY = 'mws-cookie-consent'; // 'granted' | 'denied'

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var gaLoaded = false;
  function loadAnalytics() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        var host = location.hostname;
        [host, '.' + host, '.' + host.replace(/^www\./, '')].forEach(function (d) {
          document.cookie = name + '=; Max-Age=0; path=/; domain=' + d;
        });
        document.cookie = name + '=; Max-Age=0; path=/';
      }
    });
  }

  var css = '' +
    '.cc{position:fixed;left:20px;bottom:20px;z-index:90;max-width:360px;' +
    'background:#FFFFFF;color:var(--ink,#0F1D30);border:1px solid rgba(15,29,48,.12);' +
    'border-radius:20px;padding:20px 20px 18px;font-family:var(--body,sans-serif);' +
    'box-shadow:0 1px 2px rgba(15,29,48,.04),0 18px 40px -18px rgba(15,29,48,.32);' +
    'opacity:1;transform:none;transition:opacity 300ms cubic-bezier(.23,1,.32,1),transform 300ms cubic-bezier(.23,1,.32,1)}' +
    '@starting-style{.cc{opacity:0;transform:translateY(8px)}}' +
    '.cc.cc-leaving{opacity:0;transform:translateY(8px);transition-duration:200ms}' +
    '.cc p{margin:0;font-size:.9rem;line-height:1.55;color:var(--slate,#536275);max-width:none}' +
    '.cc p strong{color:var(--ink,#0F1D30);font-weight:700}' +
    '.cc a{color:var(--copper-deep,#8F5E28);text-decoration:underline;text-underline-offset:2px}' +
    '.cc-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px}' +
    '.cc button{font:inherit;font-size:.9rem;font-weight:700;min-height:44px;border-radius:999px;cursor:pointer;' +
    'background:transparent;color:var(--ink,#0F1D30);border:1px solid rgba(15,29,48,.24);' +
    'transition:background 200ms ease,transform 160ms cubic-bezier(.23,1,.32,1)}' +
    '.cc button:active{transform:scale(.97)}' +
    '.cc button:focus-visible{outline:2px solid var(--copper,#B07535);outline-offset:3px}' +
    '@media (hover:hover) and (pointer:fine){.cc button:hover{background:rgba(15,29,48,.045)}}' +
    '@media (max-width:620px){.cc{left:12px;right:12px;bottom:12px;max-width:none}}' +
    '@media (prefers-reduced-motion:reduce){.cc,.cc.cc-leaving{transform:none !important}}';

  var banner = null;

  function hideBanner() {
    if (!banner) return;
    var el = banner;
    banner = null;
    el.classList.add('cc-leaving');
    setTimeout(function () { el.remove(); }, 200);
  }

  function decide(v) {
    setChoice(v);
    if (v === 'granted') loadAnalytics();
    else clearAnalyticsCookies();
    hideBanner();
  }

  function showBanner() {
    if (banner) return;
    if (!document.getElementById('cc-style')) {
      var st = document.createElement('style');
      st.id = 'cc-style';
      st.textContent = css;
      document.head.appendChild(st);
    }
    banner = document.createElement('div');
    banner.className = 'cc';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.innerHTML =
      '<p><strong>Can we use analytics cookies?</strong> They show us which pages people visit so we can improve the site. ' +
      'Nothing is set unless you accept. <a href="privacy.html">Privacy policy</a></p>' +
      '<div class="cc-actions">' +
      '<button type="button" data-cc="denied">Reject</button>' +
      '<button type="button" data-cc="granted">Accept</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cc]');
      if (b) decide(b.getAttribute('data-cc'));
    });
    document.body.appendChild(banner);
  }

  // Reopen from any "Cookie settings" link
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cookie-settings]');
    if (!t) return;
    e.preventDefault();
    showBanner();
  });

  var choice = getChoice();
  if (choice === 'granted') loadAnalytics();
  else if (choice !== 'denied') showBanner();
})();
