(() => {
  'use strict';
  const checks = [...document.querySelectorAll('[data-check]')];
  const storageKey = 'convergence-2026-hls-checklist-v1';
  const note = document.querySelector('#storage-note');
  const count = document.querySelector('#check-count');
  const progress = document.querySelector('#check-progress');
  const reset = document.querySelector('#reset-checks');
  let canSave = true;
  const storageFailure = () => {
    canSave = false;
    note.textContent = 'Browser storage is unavailable or invalid. Your checklist works for this page visit only; progress cannot be saved.';
  };
  const updateChecks = () => {
    const complete = checks.filter(input => input.checked).length;
    count.textContent = `${complete} of ${checks.length} complete`;
    progress.value = complete;
  };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved) || Object.values(saved).some(value => typeof value !== 'boolean')) {
      throw new TypeError('Invalid checklist state');
    }
    checks.forEach(input => { input.checked = saved[input.dataset.check] === true; });
    note.textContent = 'Progress is saved only in this browser. Nothing is sent or synced. Clearing site data removes it.';
  } catch {
    storageFailure();
  }
  const save = () => {
    if (canSave) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(checks.map(input => [input.dataset.check, input.checked]))));
      } catch {
        storageFailure();
      }
    }
    updateChecks();
  };
  checks.forEach(input => input.addEventListener('change', save));
  reset.hidden = false;
  reset.addEventListener('click', () => {
    checks.forEach(input => { input.checked = false; });
    save();
  });
  updateChecks();

  const countdown = document.querySelector('#countdown');
  const updateCountdown = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const datePart = name => parts.find(part => part.type === name).value;
    const today = Date.UTC(Number(datePart('year')), Number(datePart('month')) - 1, Number(datePart('day')));
    const days = Math.round((Date.UTC(2026, 11, 9) - today) / 86400000);
    countdown.textContent = days > 0 ? `${days} ${days === 1 ? 'day' : 'days'} to go` : days >= -1 ? 'Core days are here' : 'See you next time';
  };
  updateCountdown();
  setInterval(updateCountdown, 60000);

  const search = document.querySelector('#faq-search');
  const questions = [...document.querySelectorAll('.faq-item')];
  const results = document.querySelector('#faq-results');
  document.querySelector('#faq-search-box').hidden = false;
  const filterFAQ = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    questions.forEach(item => {
      const match = item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !match;
      item.open = Boolean(query && match);
      if (match) matches++;
    });
    results.textContent = `${matches} of ${questions.length} questions${query ? ' match' : ''}`;
    document.querySelector('#faq-empty').hidden = matches > 0;
  };
  search.addEventListener('input', filterFAQ);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; filterFAQ(); }
  });
  filterFAQ();

  const navigation = [...document.querySelectorAll('.nav a')];
  const setCurrent = id => navigation.forEach(anchor => {
    if (anchor.hash === `#${id}`) anchor.setAttribute('aria-current', 'location');
    else anchor.removeAttribute('aria-current');
  });
  const followHash = () => {
    const id = location.hash.slice(1);
    setCurrent(id.startsWith('day-') ? 'gameplan' : id || 'start');
  };
  window.addEventListener('hashchange', followHash);
  followHash();
})();
