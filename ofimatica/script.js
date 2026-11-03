 // Resalta en la barra lateral la sección visible en pantalla.
    (function(){
      var links = Array.prototype.slice.call(document.querySelectorAll('.ribbon a'));
      var sections = links
        .map(function(link){ return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

      if(!('IntersectionObserver' in window) || sections.length === 0) return;

      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var link = document.querySelector('.ribbon a[href="#' + entry.target.id + '"]');
          if(!link) return;
          if(entry.isIntersecting){
            links.forEach(function(l){ l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

      sections.forEach(function(s){ observer.observe(s); });
    })();
    // Encoge el banner al bajar y lo devuelve a su tamaño al volver arriba.
(function(){
  var umbral = 40;          // píxeles de scroll a partir de los cuales se encoge
  var pendiente = false;

  function actualizar(){
    document.body.classList.toggle('banner-compact', window.scrollY > umbral);
    pendiente = false;
  }

  window.addEventListener('scroll', function(){
    if(!pendiente){
      window.requestAnimationFrame(actualizar);
      pendiente = true;
    }
  }, { passive: true });

  actualizar();             // estado correcto al cargar la página
})();
