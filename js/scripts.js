(function () {
  var rail = document.getElementById('rail');
  if (!rail) return;

  var bar  = document.getElementById('railProgress');
  var prev = document.getElementById('railPrev');
  var next = document.getElementById('railNext');
  var EDGE = 1;

  function maxScroll(){ return rail.scrollWidth - rail.clientWidth; }

  function update(){
    var max = maxScroll();
    bar.style.width = (max > 0 ? rail.scrollLeft / max * 100 : 0) + '%';
    prev.disabled = rail.scrollLeft <= EDGE;
    next.disabled = rail.scrollLeft >= max - EDGE;
  }

  // Wrap the section in a tall div so extra vertical scroll space maps to horizontal rail scroll.
  // The section is made sticky in CSS, so it pins while the user scrolls through the extra space.
  var section = document.querySelector('.rail-section');
  var wrapper = document.createElement('div');
  wrapper.className = 'rail-wrapper';
  section.parentNode.insertBefore(wrapper, section);
  wrapper.appendChild(section);

  function isDesktop() { return window.innerWidth > 900; }

  function setWrapperHeight() {
    if (!isDesktop()) { wrapper.style.height = ''; return; }
    wrapper.style.height = (section.offsetHeight + maxScroll()) + 'px';
  }

  var dragging = false, startX = 0, startLeft = 0, moved = 0;

  function onPageScroll() {
    if (!isDesktop() || dragging) return;
    var scrolled = -wrapper.getBoundingClientRect().top;
    if (scrolled < 0) scrolled = 0;
    rail.scrollLeft = Math.min(scrolled, maxScroll());
  }

  window.addEventListener('scroll', onPageScroll, { passive: true });
  window.addEventListener('load', function() { setWrapperHeight(); onPageScroll(); });
  window.addEventListener('resize', function() { setWrapperHeight(); onPageScroll(); });
  setWrapperHeight();

  // Click-and-drag — use document listeners instead of setPointerCapture so the
  // browser delivers click events to the element under the cursor, not the rail.
  function onDragMove(e) {
    if (!dragging) return;
    var dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    if (moved > 10) rail.scrollLeft = startLeft - dx;
  }

  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    rail.classList.remove('dragging');
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
    document.removeEventListener('pointercancel', onDragEnd);
  }

  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') return;
    dragging = true; moved = 0; startX = e.clientX; startLeft = rail.scrollLeft;
    rail.classList.add('dragging');
    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
    document.addEventListener('pointercancel', onDragEnd);
  });

  rail.addEventListener('click', function (e) {
    if (moved > 10) { e.preventDefault(); e.stopPropagation(); }
    moved = 0;
  }, true);

  function page(dir){ rail.scrollBy({ left: dir * rail.clientWidth * 0.62, behavior: 'smooth' }); }
  prev.addEventListener('click', function(){ page(-1); });
  next.addEventListener('click', function(){ page(1); });

  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
