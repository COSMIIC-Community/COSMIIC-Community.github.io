// Google Analytics
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-7HXLWKTSC5';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7HXLWKTSC5');
})();

(function () {
  var path = window.location.pathname;

  var skip = document.createElement('a');
  skip.className = 'skip';
  skip.href = '#content';
  skip.textContent = 'Skip to content';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<a class="brand" href="index.html"><img class="brand-logo" src="assets/cosmiic-basic-white.svg" alt="COSMIIC"></a>' +
    '<button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>' +
    '<nav class="site-nav" id="primary-nav" aria-label="Primary">' +
      '<a href="about.html"' + (path.endsWith('about.html') ? ' aria-current="page"' : '') + '>About</a>' +
      '<a href="projects.html"' + (path.endsWith('projects.html') ? ' aria-current="page"' : '') + '>Projects and Applications</a>' +
      '<a href="https://docs.cosmiic.org">Docs</a>' +
      '<a href="https://community.cosmiic.org">Forum</a>' +
      '<a class="btn-contact" href="mailto:open_source@cosmiic.org">Contact</a>' +
    '</nav>';

  var s = document.currentScript;
  s.parentNode.insertBefore(skip, s);
  s.parentNode.insertBefore(header, s);

  // Header hide/show on scroll
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > lastY && y > 80) header.classList.add('hidden');
    else if (y < 80) header.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  // Mobile nav toggle
  header.querySelector('.nav-toggle').addEventListener('click', function () {
    var nav = document.getElementById('primary-nav');
    var open = nav.classList.toggle('open');
    this.setAttribute('aria-expanded', String(open));
  });

})();
