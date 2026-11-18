CONVERGENCE 2026 - KNOW BEFORE YOU GO

The published guide is at https://jgardn22.github.io/convergence-kbyg/.
GitHub Pages serves index.html, styles.css and app.js from the repository root.
The build also creates convergence-preview.html for local, self-contained review.
No server, package install, build dependency, analytics or runtime fetch is needed.
Core content, links, session choices and native FAQ disclosure widgets work without JS.

Edit template.html, styles.css, app.js, data.mjs or session-snapshot.json.
Rebuild both outputs from this folder with: node build.mjs
Run the local checks with: node --test guide.test.mjs
Do not edit generated index.html or convergence-preview.html directly.

The mandatory Clawpilot theme uses scoutTheme=light or scoutTheme=dark in the URL,
otherwise the operating-system preference. The original theme definitions remain
intact. Guide-specific tokens map the Convergence navy, royal blue, cyan and ice
palette to readable surfaces and controls in each theme. Cyan is decorative;
links, focus and selection use higher-contrast colors. Miami Modern curves, coastal
linework and typographic plus marks are original CSS, not copied event assets.

Research snapshot: November 18, 2026. The selected session records were extracted
from the public Sessionize All feed referenced by the official sessions page:
https://sessionize.com/api/v2/i9eggm8p/view/All
The snapshot stores metadata only, not complete session abstracts.
data.mjs supplies independent editorial HLS rationale.

Known source conflicts are disclosed visibly: Thursday's late slots differ between
the feed and agenda overview; Quisitive's page names Lapis Circle and Arkadia Pool.
Hummingbird's luncheon time differs from the official agenda. Pool-party date/time
follow the supplied event brief; attendance-list and RSVP details remain pending.
Sonata Software is a supplied planning placeholder with unconfirmed schedule and no CTA.
No hotel-block deadline is represented as active; both published dates have passed.
No unverified room assignments, badge times or private HLS events are invented.

Checklist storage is local to the browser/origin and can be unavailable in private
or sandboxed previews. The page reports storage errors and continues in-memory.
Reset checklist unchecks only this guide's checklist; it touches no other data.
Links navigate to official/host sites; the guide never submits registrations.

GitHub Pages serves this standalone static site without analytics or runtime data
requests. No credentials or external build services are needed.

LOCAL VALIDATION - NOVEMBER 18, 2026
21 automated nonbrowser checks pass, covering the offline build, selected session
slots, event CTA semantics, checklist save/reset and blocked storage, FAQ filtering
and Escape, Miami date boundaries, navigation hashes, semantic HTML nesting and
internal targets, required text contrast pairs, responsive CSS rules, theme tokens,
standalone size and absence of legacy conference facts or runtime network APIs.
Script syntax checks also pass. Separate isolated Chrome tests used --mute-audio,
confirmed on the process before navigation, without changing system audio.
Checked rendered layouts at 1440, 820, 390 and 320 CSS pixels, keyboard skip and
jump links, checklist persistence and reset, FAQ search and disclosure, and core
content with scripts disabled. No page warnings, errors or external requests were
observed. These checks do not substitute for testing on physical phones, other
browser engines or with a screen reader.
Preview size is approximately 71 KB with all CSS/JS and content included.

Design review: replaced thick one-sided note accents and rounded-card top stripes
with neutral borders and clearer primary/alternate labels. Reduced repeated slogan
headings. Remaining terse RSVP and source caveats are factual attendance safeguards,
not manufactured contrasts; they remain intentionally visible.
