// FAQ accordion + "What Grey Matter makes possible" accordion + services tab switcher.
// Plain vanilla JS, no dependencies.

function setupAccordion(containerId, itemSelector, triggerSelector, panelSelector) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var items = Array.prototype.slice.call(container.querySelectorAll(itemSelector));

  function setOpen(item, open) {
    var panel = item.querySelector(panelSelector);
    if (open) {
      item.classList.add('is-open');
      panel.style.height = panel.scrollHeight + 'px';
      panel.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'height') return;
        if (item.classList.contains('is-open')) {
          panel.style.height = 'auto';
        }
        panel.removeEventListener('transitionend', onEnd);
      });
    } else {
      if (panel.style.height === 'auto' || !panel.style.height) {
        panel.style.height = panel.scrollHeight + 'px';
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight;
      }
      item.classList.remove('is-open');
      panel.style.height = '0px';
    }
  }

  items.forEach(function (item) {
    var panel = item.querySelector(panelSelector);
    if (item.classList.contains('is-open')) {
      panel.style.height = 'auto';
    } else {
      panel.style.height = '0px';
    }
    var trigger = item.querySelector(triggerSelector);
    trigger.addEventListener('click', function () {
      var alreadyOpen = item.classList.contains('is-open');
      items.forEach(function (other) {
        if (other !== item) setOpen(other, false);
      });
      setOpen(item, !alreadyOpen);
    });
  });
}

setupAccordion('faq-list', '.faq-item', '.faq-trigger', '.faq-panel');
setupAccordion('possible-accordion', '.accordion-item', '.accordion-trigger', '.accordion-panel');

// Services tab switcher (same expand/collapse animation as the accordions above)
(function () {
  var container = document.getElementById('services-tabs');
  var image = document.getElementById('services-image');
  var desc = document.getElementById('services-image-desc');
  if (!container || !image) return;

  var tabs = Array.prototype.slice.call(container.querySelectorAll('.service-tab'));

  function openPanel(tab) {
    var panel = tab.querySelector('.service-desc');
    tab.classList.add('is-active');
    panel.style.height = panel.scrollHeight + 'px';
    panel.addEventListener('transitionend', function onEnd(e) {
      if (e.propertyName !== 'height') return;
      if (tab.classList.contains('is-active')) {
        panel.style.height = 'auto';
      }
      panel.removeEventListener('transitionend', onEnd);
    });
  }

  function closePanel(tab) {
    var panel = tab.querySelector('.service-desc');
    if (!tab.classList.contains('is-active')) return;
    if (panel.style.height === 'auto' || !panel.style.height) {
      panel.style.height = panel.scrollHeight + 'px';
      // eslint-disable-next-line no-unused-expressions
      panel.offsetHeight;
    }
    tab.classList.remove('is-active');
    panel.style.height = '0px';
  }

  function activate(tab) {
    tabs.forEach(function (t) {
      if (t !== tab) closePanel(t);
    });
    openPanel(tab);
    var src = tab.getAttribute('data-image');
    if (src) image.src = src;
    var descText = tab.querySelector('.service-desc');
    if (desc && descText) desc.textContent = descText.textContent;
  }

  tabs.forEach(function (tab) {
    var panel = tab.querySelector('.service-desc');
    panel.style.height = tab.classList.contains('is-active') ? 'auto' : '0px';
    tab.addEventListener('click', function () {
      activate(tab);
    });
  });

  if (tabs.length) activate(tabs[0]);
})();

// Nav drawer (slide-in from left), MENU button opens it on both mobile and desktop
(function () {
  var btn = document.getElementById('nav-menu-btn');
  var drawer = document.getElementById('nav-drawer');
  var overlay = document.getElementById('nav-drawer-overlay');
  var closeBtn = document.getElementById('nav-drawer-close');
  if (!btn || !drawer || !overlay) return;

  function open() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) close(); else open();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
})();

// About page contact form -> opens a pre-filled email to info@greymatterws.com
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements['name'].value.trim();
    var email = form.elements['email'].value.trim();
    var message = form.elements['message'].value.trim();

    var subject = 'New inquiry from ' + name;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    var mailto = 'mailto:info@greymatterws.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
  });
})();
