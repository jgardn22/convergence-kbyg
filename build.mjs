import { readFile, writeFile } from 'node:fs/promises';
import { checked, days, checklist, faq, feed, events } from './data.mjs';

const root = new URL('./', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const snapshot = JSON.parse(await read('session-snapshot.json'));
const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const fmt = value => {
  const [hours, minutes] = value.slice(-8, -3).split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
};
const time = value => fmt(`2000-01-01T${value}:00`);
const range = (start, end) => `${fmt(start)}-${fmt(end)} ET`;
const session = (pick, index, day) => {
  const [id, why] = pick;
  const item = snapshot.sessions.find(row => row.id === id);
  if (!item || item.startsAt.slice(0, 10) !== day.date) throw new Error(`Missing or wrong-day session ${id}`);
  return `<article class="session ${index ? 'alternate' : 'primary'}" data-session-id="${escape(id)}">
    <p class="eyebrow">${index ? 'Alternate' : 'Primary pick'} <span>${escape(item.source)}</span></p>
    <h4>${escape(item.title)}</h4><p class="speakers">${escape(item.speakers.join(' · '))}</p>
    <p><strong>HLS lens:</strong> ${escape(why)}</p>
    <details><summary>Question to take with you</summary><p>What is available today, what needs configuration, and what evidence would our security, privacy and operations teams need before production use?</p></details>
    <p class="source">${link('https://convergence365.com/sessions/', 'Find in official catalog')} <span>Session ${escape(id)}</span></p>
  </article>`;
};
const dayMarkup = days.map((day, index) => `<section class="day" id="day-${index + 1}" aria-labelledby="day-heading-${index + 1}" data-day="${day.date}">
  <div class="day-heading"><div><p class="eyebrow">December ${index ? '10' : '9'} · ${day.label}</p><h3 id="day-heading-${index + 1}">${escape(day.theme)}</h3></div><span class="day-number" aria-hidden="true">0${index + 1}</span></div>
  <p>${escape(day.intro)}</p><p class="rhythm">${escape(day.rhythm)} All times Eastern.</p>
  <div class="keynote"><p class="eyebrow">${time(day.keynote[0])}-${time(day.keynote[1])} ET</p><h4>${index ? 'Thursday keynote' : 'Opening keynote'}</h4><p>Keep this shared starting point on your calendar. ${link('https://convergence365.com/agenda-at-a-glance/', 'Official agenda')}</p></div>
  ${day.slots.map((slot, slotIndex) => {
    const [first, second] = slot.picks.map(([id]) => snapshot.sessions.find(row => row.id === id));
    if (!first || !second || first.startsAt !== second.startsAt || first.endsAt !== second.endsAt) throw new Error('Alternates must share a verified slot');
    return `<section class="slot" aria-labelledby="slot-${index}-${slotIndex}"><div class="slot-heading"><p class="slot-time">${range(first.startsAt, first.endsAt)}</p><h4 id="slot-${index}-${slotIndex}">${escape(slot.focus)}</h4></div><div class="session-pair">${slot.picks.map((pick, n) => session(pick, n, day)).join('')}</div></section>`;
  }).join('')}
</section>`).join('');
const checks = checklist.map(([id, title, detail, url, label]) => `<li><label class="check-row" for="check-${id}"><input type="checkbox" id="check-${id}" data-check="${id}"><span><strong>${escape(title)}</strong><span>${escape(detail)}</span></span></label>${url ? `<p class="check-link">${link(url, label)}</p>` : ''}</li>`).join('');
const faqs = faq.map(([question, answer, url]) => `<details class="faq-item"><summary>${escape(question)}</summary><div><p>${escape(answer)}</p>${url ? `<p>${link(url, 'Check the source')}</p>` : ''}</div></details>`).join('');
const eventMarkup = events.map(event => `<article class="card event-card${event.featured ? ' event-featured' : ''}" id="event-${escape(event.id)}" aria-labelledby="event-title-${escape(event.id)}">
  <p class="eyebrow">${event.featured ? 'Featured · ' : ''}${escape(event.kind)}</p>
  <h3 id="event-title-${escape(event.id)}">${escape(event.title)}</h3>
  <p class="event-when">${escape(event.date)}<br><strong>${escape(event.time)}</strong></p>
  <p class="event-location">${escape(event.location)}</p>
  <p class="event-status">${escape(event.status)}</p>
  <p>${escape(event.description)}</p>
  ${event.note ? `<p class="event-note">${escape(event.note)}</p>` : ''}
  ${event.cta ? `<a class="${event.cta.intent === 'request' ? 'button' : 'event-info-link'}" href="${escape(event.cta.href)}">${escape(event.cta.label)} <span aria-hidden="true">↗</span></a>` : ''}
  ${event.footnote ? `<p class="event-footnote">${escape(event.footnote)}</p>` : ''}
</article>`).join('');
let html = (await read('template.html')).replace('<!-- CHECKLIST -->', checks).replace('<!-- DAYS -->', dayMarkup).replace('<!-- FAQ -->', faqs).replace('<!-- EVENTS -->', eventMarkup).replaceAll('{{CHECKED}}', checked);
await writeFile(new URL('index.html', root), html);
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${await read('styles.css')}\n</style>`).replace('<script src="app.js" defer></script>', `<script>\n${await read('app.js')}\n</script>`);
await writeFile(new URL('convergence-preview.html', root), html);
console.log(`Built offline source and self-contained preview: ${snapshot.sessions.length} sessions, ${days.reduce((n, d) => n + d.slots.length, 0)} paired slots; checked ${checked}; feed ${feed}`);
