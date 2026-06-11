(function () {
  'use strict';

  var params  = new URLSearchParams(window.location.search);
  var slug    = params.get('service') || 'business-website';
  var service = nestbrainicServices[slug] || nestbrainicServices['business-website'];

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  // Browser tab title
  document.title = 'Nestbrainic – ' + service.title;

  // Breadcrumb
  setText('sd-bc-active', service.title);
  setText('sd-page-title', service.title);

  // Main content
  setText('sd-section-title', service.sectionTitle);
  setText('sd-intro-1', service.intro[0]);
  setText('sd-intro-2', service.intro[1]);

  // Includes heading + checklist
  setText('sd-includes-heading', service.includesHeading);
  setHTML('sd-includes', service.includes.map(function (item) {
    return '<li><i class="fas fa-check"></i> ' + item + '</li>';
  }).join(''));

  // Tech stack
  setText('sd-tech-intro', service.techIntro);
  setHTML('sd-tech-cards', service.tech.map(function (t) {
    return '<div class="col-md-4 mb-20">' +
             '<div class="nb-tech-card">' +
               '<i class="' + t.icon + ' fa-2x"></i>' +
               '<p>' + t.name + '</p>' +
               '<small>' + t.stack + '</small>' +
             '</div>' +
           '</div>';
  }).join(''));

  // Hero image
  var heroImg = document.getElementById('sd-hero-img');
  if (heroImg) {
    heroImg.alt = service.title;
    heroImg.src = 'https://placehold.co/800x450/2E125D/FFFFFF?text=' +
                  encodeURIComponent(service.title);
  }

  // Sidebar: highlight the active service link
  var links = document.querySelectorAll('.nb-sidebar-widget ul li a[data-service]');
  links.forEach(function (link) {
    link.parentElement.classList.toggle('active', link.getAttribute('data-service') === slug);
  });

})();
