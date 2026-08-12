(function () {
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<img class="footer-logo" src="assets/cosmiic-basic-white.svg" alt="COSMIIC">' +
    '<div class="footer-social">' +
      '<a class="footer-social__link" href="https://www.linkedin.com/company/91309458" target="_blank" rel="noopener" aria-label="COSMIIC on LinkedIn">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' +
        'LinkedIn' +
      '</a>' +
      '<a class="footer-social__link" href="https://github.com/COSMIIC-Community" target="_blank" rel="noopener" aria-label="COSMIIC on GitHub">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>' +
        'GitHub' +
      '</a>' +
    '</div>' +
    '<p>Copyright &copy; <span id="copy-year"></span> COSMIIC &nbsp;&middot;&nbsp; <a href="privacy.html" style="color:inherit;opacity:.7;text-decoration:none">Privacy</a></p>';

  var s = document.currentScript;
  s.parentNode.insertBefore(footer, s);

  footer.querySelector('#copy-year').textContent = new Date().getFullYear();
})();
