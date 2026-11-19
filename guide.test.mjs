import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { createHash } from 'node:crypto';
import { days, events, checklist, faq } from './data.mjs';

const root = new URL('./', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const [html, preview, css, app, snapshotText] = await Promise.all(['index.html', 'convergence-preview.html', 'styles.css', 'app.js', 'session-snapshot.json'].map(read));
const snapshot = JSON.parse(snapshotText);

class Element {
  constructor(textContent = '') {
    this.textContent = textContent;
    this.listeners = {};
    this.attributes = {};
    this.hidden = false;
    this.checked = false;
    this.open = false;
    this.value = '';
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  fire(name, event = {}) { this.listeners[name]?.(event); }
}

function harness({ saved = null, readError = false, writeError = false, date = '2026-11-18T19:00:00Z', hash = '' } = {}) {
  const ids = ['storage-note', 'check-count', 'check-progress', 'reset-checks', 'countdown', 'faq-search', 'faq-results', 'faq-search-box', 'faq-empty'];
  const elements = Object.fromEntries(ids.map(id => [`#${id}`, new Element()]));
  const checks = checklist.map(([id]) => Object.assign(new Element(), { dataset: { check: id } }));
  const questions = faq.map(([q, a]) => new Element(`${q} ${a}`));
  const navigation = ['start', 'before', 'ground', 'evenings', 'gameplan', 'faq'].map(id => Object.assign(new Element(), { hash: `#${id}` }));
  const stored = new Map(saved === null ? [] : [['convergence-2026-hls-checklist-v1', saved]]);
  const document = {
    querySelector: selector => { assert.ok(elements[selector], selector); return elements[selector]; },
    querySelectorAll: selector => ({ '[data-check]': checks, '.faq-item': questions, '.nav a': navigation })[selector]
  };
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [date])); } }
  const windowListeners = {};
  const location = { hash };
  runInNewContext(app, {
    document, location, Date: Clock, Intl,
    setInterval() {},
    window: { addEventListener(name, callback) { windowListeners[name] = callback; } },
    localStorage: {
      getItem(key) { if (readError) throw Error('Storage blocked'); return stored.get(key) ?? null; },
      setItem(key, value) { if (writeError) throw Error('Storage full'); stored.set(key, value); }
    }
  });
  return { elements, checks, questions, navigation, stored, location, windowListeners };
}

test('checklist restores, changes and resets only its own namespaced state', () => {
  const page = harness({ saved: '{"hotel":true,"pack":true}' });
  assert.equal(page.elements['#check-count'].textContent, '2 of 7 complete');
  page.checks[0].checked = true;
  page.checks[0].fire('change');
  assert.equal(page.elements['#check-progress'].value, 3);
  assert.equal(JSON.parse(page.stored.get('convergence-2026-hls-checklist-v1')).registration, true);
  page.elements['#reset-checks'].fire('click');
  assert.equal(page.elements['#check-count'].textContent, '0 of 7 complete');
  assert.equal(page.stored.size, 1);
});

for (const state of [null, '[]', 'null', '{"hotel":"yes"}', '{broken']) {
  test(`invalid or denied storage is visible and checklist remains usable: ${state}`, () => {
    const page = harness(state === null ? { readError: true } : { saved: state });
    assert.match(page.elements['#storage-note'].textContent, /cannot be saved/);
    page.checks[0].checked = true;
    page.checks[0].fire('change');
    assert.equal(page.elements['#check-count'].textContent, '1 of 7 complete');
  });
}

test('write failure is surfaced, not silently reported as saved', () => {
  const page = harness({ writeError: true });
  page.checks[0].checked = true;
  page.checks[0].fire('change');
  assert.match(page.elements['#storage-note'].textContent, /cannot be saved/);
  assert.equal(page.elements['#check-progress'].value, 1);
});

test('FAQ search matches answers, handles empty results, and Escape restores all', () => {
  const { elements, questions } = harness();
  const search = elements['#faq-search'];
  search.value = '  MIAMI INTERNATIONAL  ';
  search.fire('input');
  assert.equal(questions.filter(item => !item.hidden).length, 1);
  assert.equal(questions.filter(item => item.open).length, 1);
  search.value = 'zzzz-not-a-conference-word';
  search.fire('input');
  assert.equal(elements['#faq-empty'].hidden, false);
  search.fire('keydown', { key: 'Escape' });
  assert.equal(search.value, '');
  assert.equal(questions.filter(item => !item.hidden).length, faq.length);
  assert.equal(elements['#faq-empty'].hidden, true);
});

for (const [date, expected] of [
  ['2026-11-18T19:00:00Z', '21 days to go'],
  ['2026-12-09T02:00:00Z', '1 day to go'],
  ['2026-12-09T05:00:00Z', 'Core days are here'],
  ['2026-12-11T04:59:00Z', 'Core days are here'],
  ['2026-12-11T05:00:00Z', 'See you next time']
]) {
  test(`countdown follows Miami date, not machine timezone: ${date}`, () => {
    assert.equal(harness({ date }).elements['#countdown'].textContent, expected);
  });
}

test('day deep links retain session navigation and unknown hashes do not claim a section', () => {
  const page = harness({ hash: '#day-2' });
  assert.equal(page.navigation[4].attributes['aria-current'], 'location');
  page.location.hash = '#faq';
  page.windowListeners.hashchange();
  assert.equal(page.navigation[5].attributes['aria-current'], 'location');
  assert.equal(page.navigation[4].attributes['aria-current'], undefined);
});

test('both core days have nine simultaneous primary/alternate pairs with source metadata', () => {
  assert.equal(days.length, 2);
  assert.equal(days.flatMap(day => day.slots).length, 9);
  assert.equal(snapshot.sessions.length, 18);
  for (const day of days) {
    let end = `${day.date}T${day.keynote[1]}:00`;
    for (const slot of day.slots) {
      const pair = slot.picks.map(([id]) => snapshot.sessions.find(item => item.id === id));
      assert.equal(pair.length, 2);
      assert.equal(pair[0].startsAt, pair[1].startsAt);
      assert.equal(pair[0].endsAt, pair[1].endsAt);
      assert.ok(pair[0].startsAt >= end, 'Non-overlapping chronological picks');
      end = pair[0].endsAt;
      for (const session of pair) {
        assert.ok(session.startsAt.startsWith(day.date));
        assert.ok(session.speakers.every(name => name && !name.includes('undefined')));
        assert.ok(html.includes(`data-session-id="${session.id}"`));
        assert.ok(html.includes(session.title.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')));
      }
    }
  }
});

test('event CTAs distinguish host requests, information and pending placeholders', () => {
  assert.equal(events.length, 6);
  assert.equal(events[0].id, 'quisitive');
  assert.equal(events.filter(event => event.featured).length, 1);
  assert.equal(events.filter(event => event.cta?.intent === 'request').length, 1);
  assert.equal(events.find(event => event.id === 'sonata').cta, undefined);
  assert.match(events.find(event => event.id === 'hummingbird-pool').status, /coming soon/);
  assert.equal(events.find(event => event.id === 'hummingbird-pool').time, '5:00-8:00 PM ET');
  assert.match(events.find(event => event.id === 'hummingbird-pool').location, /4441 Collins Avenue/);
  assert.equal(events.find(event => event.id === 'sonata').host, 'Sonata Software');
  assert.match(events.find(event => event.id === 'women-in-tech').footnote, /not a registration/);
  assert.match(html, /Invitation only/);
  assert.match(html, /5:00-6:00 PM ET/);
  assert.match(html, /6:00-8:00 PM ET/);
  assert.match(html, /Thursday timing discrepancy/);
  assert.match(html, /Arkadia Pool/);
});

test('core content is baked into semantic HTML and internal references resolve', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'Unique IDs');
  for (const [, id] of html.matchAll(/(?:href="#|for="|aria-labelledby="|aria-describedby=")([^"]+)"/g)) {
    for (const target of id.split(' ')) assert.ok(ids.includes(target), `Missing target ${target}`);
  }
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.equal((html.match(/class="faq-item"/g) || []).length, faq.length);
  assert.equal((html.match(/data-check=/g) || []).length, checklist.length);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="skip" href="#main"/);
  assert.match(html, /<noscript>/);
  assert.doesNotMatch(html, /<!-- (?:DAYS|EVENTS|FAQ|CHECKLIST) -->|\{\{CHECKED\}\}/);
});

test('HTML nesting is balanced, with no custom elements or forgotten closing tags', () => {
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const voidTags = new Set(['meta', 'link', 'input', 'br', 'hr', 'img', 'source', 'wbr', 'area', 'base', 'col', 'embed', 'param', 'track']);
  const stack = [];
  for (const [, slash, tag] of markup.matchAll(/<(\/?)([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
    if (voidTags.has(tag)) continue;
    if (slash) assert.equal(stack.pop(), tag, `Closing ${tag}`);
    else stack.push(tag);
  }
  assert.deepEqual(stack, []);
});

test('preview is standalone, public-safe, and has no legacy facts or network dependencies', () => {
  assert.doesNotMatch(preview, /<(?:script|img|iframe|audio|video)\b[^>]*\bsrc=|<link\b[^>]*href="(?!data:image\/svg\+xml,)/i);
  assert.doesNotMatch(preview, /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/);
  assert.doesNotMatch(preview, /PPCC|MGM|Las Vegas|Whova|Pacific|October 27|healthcare-logo|google-analytics|googletagmanager|tracking/i);
  assert.doesNotMatch(preview, /url\s*\(\s*["']?https?:/i);
  assert.match(preview, /No analytics/);
  assert.match(html, /Public sources checked <time datetime="2026-11-18">/);
  assert.doesNotMatch(html, /local preview|not publicly released|supplied for this preview/i);
  assert.ok(Buffer.byteLength(preview) < 150000, 'Lightweight preview under 150 KB');
});

test('theme setup precedes app logic, and component colors use only theme variables', () => {
  assert.ok(preview.indexOf('get("scoutTheme")') < preview.indexOf('storageKey'));
  const baseTheme = css.slice(0, css.indexOf(':root {', 1)).replaceAll('\r\n', '\n').trim();
  assert.equal(createHash('sha256').update(baseTheme).digest('hex'), '579ac8aa59da76150c9b0e6a09760c90733cc0ca5ccb2e295ed0efd4d4fb8b3f', 'Preserve the exact Clawpilot base theme');
  const componentCSS = css.replace(/:root\s*\{[^}]*\}/g, '').replace(/html\[data-theme="dark"\]\s*\{[^}]*\}/g, '');
  assert.doesNotMatch(componentCSS, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i);
  assert.match(css, /"Segoe UI", Aptos, Calibri/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /forced-colors/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.checklist, \.logistics-grid, \.session-pair, \.faq-layout, \.footer-inner \{ grid-template-columns: 1fr; \}/);
});

test('guide text, interactive states, and focus colors meet WCAG AA contrast in both themes', () => {
  const tokens = (selector) => Object.assign({}, ...[...css.matchAll(selector)].map(([, block]) =>
    Object.fromEntries([...block.matchAll(/--cp-([\w-]+):\s*(#[\da-f]{6}|var\(--cp-[\w-]+\));/gi)].map(([, key, value]) => [key, value]))
  ));
  const light = tokens(/:root\s*\{([^}]*)\}/g);
  const dark = { ...light, ...tokens(/html\[data-theme="dark"\]\s*\{([^}]*)\}/g) };
  const resolve = (theme, name) => {
    const value = theme[name];
    assert.ok(value, `Missing token ${name}`);
    return value.startsWith('#') ? value.slice(1) : resolve(theme, value.slice(9, -1));
  };
  const luminance = hex => {
    const rgb = hex.match(/[\da-f]{2}/gi).map(pair => parseInt(pair, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const contrast = (a, b) => {
    const [light, dark] = [luminance(a), luminance(b)].sort((a, b) => b - a);
    return (light + .05) / (dark + .05);
  };
  for (const [mode, theme] of Object.entries({ light, dark })) {
    const verify = (foreground, background, min) => {
      const ratio = contrast(resolve(theme, `guide-${foreground}`), resolve(theme, `guide-${background}`));
      assert.ok(ratio >= min, `${mode} ${foreground}/${background}: ${ratio.toFixed(2)} < ${min}`);
    };
    for (const surface of ['canvas', 'paper', 'band', 'tint']) {
      for (const text of ['ink', 'muted', 'action', 'action-hover']) verify(text, surface, 4.5);
      for (const control of ['focus', 'control']) verify(control, surface, 3);
    }
    for (const button of ['action', 'action-hover']) verify('on-action', button, 4.5);
    verify('ice', 'navy', 4.5);
    verify('ice', 'royal', 4.5);
    verify('cyan', 'navy', 3);
    for (const surface of ['midnight', 'night-panel']) {
      for (const text of ['ice', 'night-muted', 'night-blue', 'night-hover']) verify(text, surface, 4.5);
      verify('night-control', surface, 3);
    }
  }
});
