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

  // Vertical wheel drives horizontal scroll; releases to the page at either end.
  rail.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;   // native trackpad pan
    var factor = e.deltaMode === 1 ? 18 : e.deltaMode === 2 ? rail.clientWidth : 1;
    var delta = e.deltaY * factor;
    if (!delta) return;
    var max = maxScroll();
    if ((delta < 0 && rail.scrollLeft <= EDGE) || (delta > 0 && rail.scrollLeft >= max - EDGE)) return;
    e.preventDefault();
    rail.scrollLeft += delta;
  }, { passive: false });

  // Click-and-drag
  var dragging = false, startX = 0, startLeft = 0, moved = 0;
  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') return;
    dragging = true; moved = 0; startX = e.clientX; startLeft = rail.scrollLeft;
    rail.classList.add('dragging'); rail.setPointerCapture(e.pointerId);
  });
  rail.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    rail.scrollLeft = startLeft - dx;
  });
  function endDrag(e){
    if (!dragging) return;
    dragging = false; rail.classList.remove('dragging');
    if (e.pointerId != null && rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
  }
  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);
  rail.addEventListener('click', function (e) {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    moved = 0;
  }, true);

  function page(dir){ rail.scrollBy({ left: dir * rail.clientWidth * 0.62, behavior: 'smooth' }); }
  prev.addEventListener('click', function(){ page(-1); });
  next.addEventListener('click', function(){ page(1); });

  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
