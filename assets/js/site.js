/* Locumfy public site — nav toggle + image lightbox. No dependencies. */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Lightbox for screenshots
  var shots = document.querySelectorAll('.shot img');
  if (!shots.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);

  var full = box.querySelector('img');

  function close() { box.classList.remove('open'); }

  [].forEach.call(shots, function (img) {
    img.parentElement.setAttribute('role', 'button');
    img.parentElement.setAttribute('tabindex', '0');
    function open() {
      full.src = img.getAttribute('src');
      full.alt = img.getAttribute('alt') || '';
      box.classList.add('open');
    }
    img.parentElement.addEventListener('click', open);
    img.parentElement.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
