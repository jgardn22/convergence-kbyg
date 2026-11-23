export const checked = '2026-11-18';
export const feed = 'https://sessionize.com/api/v2/i9eggm8p/view/All';
export const events = [
  {
    id: 'quisitive', kind: 'Partner reception', featured: true,
    title: 'An evening with Quisitive', host: 'Quisitive',
    date: 'Wednesday, December 9', time: '6:00-8:00 PM ET',
    location: 'Lapis Circle · Fontainebleau Miami Beach',
    status: 'Invitation only · host confirmation required',
    description: 'Cocktails and conversation with fellow business and technology leaders. This partner-hosted reception is separate from the official Expo Happy Hour; it is not an HLS-exclusive gathering.',
    note: 'The host invitation names Lapis Circle, while other sections name Arkadia Pool. Confirm the final gathering point in your RSVP email.',
    cta: { label: 'Request RSVP with Quisitive', href: 'https://info.quisitive.com/convergence-happy-hour/', intent: 'request' },
    footnote: 'Opens the host page and its RSVP form. A request is not confirmed registration.'
  },
  {
    id: 'bdo-all-aboard', kind: 'Partner event',
    title: 'ALL ABOARD...GOING NOWHERE: Zero Nautical Miles. Countless Connections.',
    host: 'BDO, Vertex and eftsure',
    date: 'Wednesday, December 9', time: '6:00-9:00 PM EST',
    location: 'The Miami Lady at The Fontainebleau Marina · 45th Street and Collins Avenue, Miami Beach, FL 33140',
    status: 'Registration available with the organizers',
    description: 'A docked-boat gathering for cocktails, conversation and networking during Convergence. The hosts say there is no departure schedule.',
    cta: {
      label: 'Register with BDO',
      href: 'https://insights.bdo.com/EV-2026-12-09-ALLABOARD...GOINGNOWHEREZeroNauticalMiles.CountlessConnections.-_EventRegistrationPage.html',
      intent: 'register'
    },
    source: {
      label: 'BDO event details',
      href: 'https://www.bdo.com/events/all-aboard-going-nowhere-zero-nautical-miles-countless-connections',
      checked: 'November 23, 2026'
    }
  },
  {
    id: 'welcome', kind: 'Official conference event',
    title: 'Welcome Reception', host: 'Convergence',
    date: 'Tuesday, December 8', time: '6:00-8:00 PM ET',
    location: 'Fontainebleau Miami Beach',
    status: 'Included in general admission',
    description: 'Reconnect, meet Microsoft teams, and get ready for the two core conference days. Check organizer communications for the gathering point.',
    cta: { label: 'View official agenda', href: 'https://convergence365.com/agenda-at-a-glance/', intent: 'information' }
  },
  {
    id: 'expo', kind: 'Official conference event',
    title: 'Expo Hall Happy Hour', host: 'Convergence',
    date: 'Wednesday, December 9', time: '5:00-6:00 PM ET',
    location: 'Expo Hall · Fontainebleau Miami Beach',
    status: 'Official conference reception',
    description: 'Continue the conversation after Wednesday’s sessions. This hour in the Expo Hall is distinct from the Quisitive partner reception that follows.',
    cta: { label: 'View official agenda', href: 'https://convergence365.com/agenda-at-a-glance/', intent: 'information' }
  },
  {
    id: 'hummingbird-pool', kind: 'Partner event',
    title: 'Hummingbird Cabana Pool Party', host: 'Hummingbird',
    date: 'Wednesday, December 9', time: '5:00-8:00 PM ET',
    location: 'Fontainebleau Miami Beach · 4441 Collins Avenue, Miami Beach, FL',
    status: 'Details and RSVP coming soon',
    description: 'A poolside gathering with Hummingbird during Convergence. Attendance-list and RSVP details are still being finalized; check the host’s information page for updates.',
    cta: { label: 'View Hummingbird event information', href: 'https://hummingbirdworks.ai/events/convergence-365-2026', intent: 'information' },
    footnote: 'Information page only; no confirmed RSVP link is available.'
  },
  {
    id: 'women-in-tech', kind: 'Luncheon · partner information',
    title: 'Women in Tech Luncheon', host: 'Hummingbird panel participants',
    date: 'Wednesday, December 9', time: 'Approximately noon-1:30 PM ET · reconfirm',
    location: 'Fontainebleau Miami Beach',
    status: 'More details coming · information only',
    description: 'A careers and business applications panel with Hummingbird leaders. The host lists noon-1:30 PM; the official agenda places the Women in Tech lunch within 11:30 AM-12:30 PM.',
    note: 'Timing differs between sources and may overlap the 12:30 PM session slot. Confirm the exact luncheon schedule before choosing sessions.',
    cta: { label: 'View luncheon information', href: 'https://hummingbirdworks.ai/events/convergence-365-2026', intent: 'information' },
    footnote: 'This is not a registration link.'
  },
  {
    id: 'sonata', kind: 'Partner gathering · pending confirmation',
    title: 'Sonata Software Customer Fireside Chat', host: 'Sonata Software',
    date: 'Wednesday, December 9', time: '3:45 PM ET · pending confirmation',
    location: 'Venue and invitation pending',
    status: 'Schedule / invite pending',
    description: 'This gathering is not publicly verified. Final schedule, location and invitation details have not been confirmed.',
    note: 'No RSVP or registration link is available. If confirmed at this time, it would conflict with the afternoon session slot.'
  }
];
export const days = [
  {
    date: '2026-12-09', label: 'Wednesday', theme: 'Connect the dots.',
    intro: 'Start with service and data foundations. Leave with a practical view of how agents fit into your operating model.',
    keynote: ['08:30', '10:00'],
    rhythm: 'Breakfast 7:30-8:30 AM; lunch 11:30 AM-12:30 PM; expo breaks 10:00-10:30 AM and 2:45-3:45 PM.',
    slots: [
      { focus: 'Service or supply chain', picks: [
        ['1380784', 'Explore service workflows across the tools staff already use. Ask about access boundaries, human review and safe knowledge grounding for member or patient support.'],
        ['1335539', 'For supply chain leaders: evaluate planning, warehouse and manufacturing capabilities against medical supply and life sciences operations.']
      ] },
      { focus: 'Build on trusted foundations', picks: [
        ['1293217', 'For platform teams: pressure-test how enterprise data architecture supports reliable agents before expanding a service pilot.'],
        ['1322897', 'For service leaders: connect intent, case, knowledge and quality agents to nonclinical support work, with clear escalation to people.']
      ] },
      { focus: 'Move beyond the pilot', picks: [
        ['1362809', 'Bring a real scaling challenge from a member or patient contact center. Focus on governance, operating readiness and adoption, not just a successful demo.'],
        ['1322927', 'For finance leaders: compare service-led and product-led operating models with your provider, payer or life sciences business.']
      ] },
      { focus: 'Make implementation real', picks: [
        ['1368757', 'Probe identity, telephony, integration and migration tradeoffs for a resilient contact center. Ask what to validate before any regulated-data rollout.'],
        ['1324819', 'For finance teams: examine reconciliation exceptions and oversight for a more controlled close across complex organizations.']
      ] }
    ]
  },
  {
    date: '2026-12-10', label: 'Thursday', theme: 'Turn insight into a plan.',
    intro: 'Make room for governance, operational quality and value. Finish with questions your team can act on after Miami.',
    keynote: ['08:30', '09:30'],
    rhythm: 'Breakfast 7:30-8:30 AM; lunch 11:15 AM-12:15 PM; expo networking 9:30-10:15 AM. Later slots below follow the session feed, not the agenda overview.',
    slots: [
      { focus: 'Govern before you scale', picks: [
        ['1324847', 'Make cost, agent permissions and enterprise data protection explicit. Ask how to monitor consumption and enforce controls for your organization.'],
        ['1380782', 'For builders: examine email-to-case automation and human oversight for nonclinical inquiries. Use synthetic examples, never patient information.']
      ] },
      { focus: 'Measure quality end to end', picks: [
        ['1362844', 'Define a scorecard across human and AI interactions. Explore quality, compliance review and coaching for member and patient service teams.'],
        ['1281655', 'For operations teams: connect field execution, project costs and finance for equipment and asset-service scenarios.']
      ] },
      { focus: 'Protect the data estate', picks: [
        ['1292444', 'Bring retention, capacity and access questions. Compare the governance model with your own privacy, security and records requirements.'],
        ['1370534', 'For service strategy: pressure-test the roadmap against your contact center architecture and readiness; distinguish roadmap from available features.']
      ] },
      { focus: 'Choose a practical next step', picks: [
        ['1284763', 'Explore dispatch decision support for equipment-service operations. Ask where scheduling recommendations need a human decision.'],
        ['1362828', 'For sponsors: choose measurable service outcomes and a baseline before committing to an AI pilot or an ROI claim.']
      ] },
      { focus: 'Close with the right questions', picks: [
        ['1322899', 'Explore how service work can meet staff in Microsoft 365. Ask about authorization, context and case ownership across application boundaries.'],
        ['1335543', 'For supply chain teams: explore planning scenarios and human oversight for demand and inventory decisions in healthcare and life sciences.']
      ] }
    ]
  }
];
export const checklist = [
  ['registration', 'Confirm your conference registration', 'General admission covers the Tuesday Welcome Reception and the two core days. Check your confirmation for your exact ticket.', 'https://convergence365.com/frequently-asked-questions/', 'Ticket details'],
  ['hotel', 'Reconfirm your hotel and travel', 'Both dates posted for the main room-block deadline have passed. Check current availability directly; do not rely on an old deadline.', 'https://convergence365.com/venue/', 'Venue and housing'],
  ['quisitive', 'Request your Wednesday Quisitive RSVP', 'Invitation-only, with limited space. Submit your request to the host and wait for confirmation; this guide is not an invitation.', 'https://info.quisitive.com/convergence-happy-hour/', 'Request RSVP with host'],
  ['sessions', 'Save a primary and alternate for each slot', 'Review the current official catalog before travel and each morning. Session times can change.', 'https://convergence365.com/sessions/', 'Official sessions'],
  ['addons', 'Check any separately ticketed add-ons', 'Partner Pre-Day is Tuesday; workshops are Friday. For a workshop, prepare the required environment in your organization’s tenant.', 'https://convergence365.com/workshops/', 'Workshop preparation'],
  ['access', 'Plan dietary and accessibility needs', 'Contact the organizer for conference accommodations and the hotel for room needs. Do not assume a request is confirmed.', 'mailto:info@dynamicsusergroup.com', 'Contact the organizer'],
  ['pack', 'Pack for sessions and conversations', 'Our suggestion: comfortable shoes, a light layer, charger, water bottle and a few nonconfidential questions. Bring no patient data for demos.', null, null]
];
export const faq = [
  ['What dates should I book?', 'Convergence runs December 8-11, 2026. The core conference is Wednesday and Thursday, December 9-10. Tuesday has the separately ticketed Partner Pre-Day plus the official Welcome Reception. Friday workshops are add-ons.', 'https://convergence365.com/agenda-at-a-glance/'],
  ['What is included in general admission?', 'The official FAQ includes the Tuesday Welcome Reception, core education sessions and executive roundtables, Expo Hall, Convergence-sponsored receptions, and breakfast, lunch, snacks and beverages on both core days. Partner-hosted events may have their own invitation or RSVP rules.', 'https://convergence365.com/frequently-asked-questions/'],
  ['Which Wednesday events overlap?', 'The official Expo Hall Happy Hour is December 9, 5:00-6:00 PM ET. Hummingbird’s 5:00-8:00 PM pool party overlaps it. Quisitive’s invitation-only reception is 6:00-8:00 PM ET and needs host confirmation. BDO, Vertex and eftsure list a docked event aboard The Miami Lady from 6:00-9:00 PM EST, overlapping Quisitive and Hummingbird from 6:00-8:00 PM. Check each host’s registration or RSVP requirements.', 'https://www.bdo.com/events/all-aboard-going-nowhere-zero-nautical-miles-countless-connections'],
  ['Where exactly is the Quisitive reception?', 'It is onsite at Fontainebleau Miami Beach. The host page names Lapis Circle in its invitation and Arkadia Pool elsewhere. Confirm the final gathering point in the host’s RSVP email before walking over.', 'https://info.quisitive.com/convergence-happy-hour/'],
  ['Which airport should I use?', 'The conference FAQ recommends Miami International Airport (MIA), about 12 miles away. Fort Lauderdale-Hollywood International Airport (FLL) is an alternative farther away. Allow for Miami traffic rather than treating a drive estimate as a guarantee.', 'https://convergence365.com/frequently-asked-questions/'],
  ['Is the conference hotel block still open?', 'Check the current booking link or call the hotel. The venue page lists conflicting November 6 and November 13, 2026 deadlines, both in the past as of this guide’s review. No active booking deadline or guaranteed rate is represented here.', 'https://convergence365.com/venue/'],
  ['What should I wear?', 'The organizer recommends business casual to professional attire. Our packing suggestion: comfortable shoes and a light layer for indoor sessions.', 'https://convergence365.com/frequently-asked-questions/'],
  ['Are Friday workshops included?', 'No. Microsoft-led workshops run Friday, December 11, 8:00 AM-1:00 PM ET, at $249 per attendee per workshop as currently listed. A separate ticket and a prepared environment in your organization’s tenant are required. Workshops overlap, so choose one.', 'https://convergence365.com/workshops/'],
  ['Can I get a refund or transfer my ticket?', 'The official FAQ says refunds are not available, but tickets can be transferred. Contact info@dynamicsusergroup.com about a possible future-event credit if you cannot attend or transfer.', 'https://convergence365.com/frequently-asked-questions/'],
  ['Where are badge pickup and session rooms?', 'This guide does not publish unverified badge hours or room assignments. Check the latest organizer instructions and official session catalog for current check-in and room information.', 'https://convergence365.com/sessions/'],
  ['Is this an official healthcare conference track?', 'No. This is an independent Healthcare & Life Sciences companion. Session choices and relevance notes are editorial suggestions across the broader Dynamics 365 program, not an organizer-designated track or an assurance of healthcare compliance.', 'https://convergence365.com/sessions/'],
  ['Why do Thursday’s times differ from the agenda overview?', 'The public session catalog snapshot lists the last two Thursday slots at 3:30-4:30 PM and 4:45-5:45 PM ET. The agenda-at-a-glance lists 3:15-4:15 PM and 4:30-5:30 PM. We show the session-level times for our picks and recommend reconfirming them with the organizer.', 'https://convergence365.com/agenda-at-a-glance/'],
  ['Where is my checklist saved?', 'Only in this browser’s local storage, when available. It is not sent to anyone or synced between devices. Private browsing, clearing site data or opening the guide on another origin may reset it. If storage is blocked, the checklist works for the current page visit only.', null]
];
