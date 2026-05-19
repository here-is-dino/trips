// Trip data — single source of truth for all trips
const TRIPS = [
  {
    id: 'sofia-weekend',
    slug: 'sofia-weekend',
    title: 'Sofia Weekend — Kyustendil Loop',
    dates: { start: '2025-06-20', end: '2025-06-21' },
    distance: '310 km',
    status: 'planned',
    summary: 'A two-day loop through the Struma valley and Osogovo foothills — gorges, fortresses, galleries, and thermal pools. Perfect first van trip of the season.',
    coverImage: 'assets/images/cover-sofia-weekend.jpg',
    region: 'Bulgaria — Struma & Osogovo',
    vehicle: 'VW T3 Westfalia Syncro',
    crew: ['Dino', 'Joshi', 'Bourya', 'Clement', 'Archie'],
    highlights: ['Zemen Gorge', 'Kyustendil', 'Hisarlaka Fortress', 'Maistora Gallery', 'Sequoia Trees', 'Sapareva Banya thermal pools'],
    map: {
      center: [42.666, 22.666],
      zoom: 10,
      route: [
        { name: 'Sofia', lat: 42.6977, lng: 23.3219, type: 'start', label: 'Home base' },
        { name: 'Zemen Gorge', lat: 42.483, lng: 22.650, type: 'stop', label: 'Zemen Gorge — dramatic canyon walk' },
        { name: 'Kyustendil', lat: 42.283, lng: 22.683, type: 'stop', label: 'Kyustendil — old town stroll' },
        { name: 'Hisarlaka Fortress', lat: 42.285, lng: 22.690, type: 'highlight', label: 'Hisarlaka Fortress — Roman ruins' },
        { name: 'Osogovo Foothills', lat: 42.350, lng: 22.550, type: 'camp', label: 'Wild camp — Osogovo foothills' },
        { name: 'Maistora Gallery', lat: 42.450, lng: 22.700, type: 'highlight', label: 'Maistora Gallery — contemporary art' },
        { name: 'Sequoia Trees', lat: 42.520, lng: 22.750, type: 'stop', label: 'Sequoia Trees — giant forest' },
        { name: 'Sapareva Banya', lat: 42.583, lng: 22.967, type: 'highlight', label: 'Sapareva Banya — thermal pools' },
        { name: 'Sofia', lat: 42.6977, lng: 23.3219, type: 'end', label: 'Home' },
      ]
    },
    // ── Stop detail pages ──────────────────────────────────
    stops: {
      'zemen-gorge': {
        name: 'Zemen Gorge',
        subtitle: 'Dramatic canyon walk',
        lat: 42.483, lng: 22.650,
        image: null,
        description: 'A spectacular limestone canyon carved by the Struma River. The path follows the river through narrow sections with sheer walls rising on both sides. In places the gorge is so narrow you can touch both walls. The water is crystal clear and cold — perfect for dipping feet on a hot day.',
        highlights: ['Narrow canyon sections with sheer limestone walls', 'Crystal clear river pools', 'Shaded path — stays cool in summer', 'Free access, no entrance fee'],
        tips: 'Wear water shoes or sandals with grip — the rocks can be slippery. The path is stroller-unfriendly past the first 500m. Best in the morning before the sun hits the gorge floor. About 1-2 hours for a good walk.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Partial — first section is easy, then gets rocky',
        bestTime: 'Morning (9-11am) for shade',
        duration: '1-2 hours',
      },
      'hisarlaka-fortress': {
        name: 'Hisarlaka Fortress',
        subtitle: 'Roman & medieval hilltop ruins',
        lat: 42.285, lng: 22.690,
        image: null,
        description: 'A dramatic hilltop fortress overlooking Kyustendil, with layers of history from Roman times through the medieval Bulgarian empire. The walls and towers are partially restored, and the views from the top stretch across the entire valley. Bourya will love running along the ramparts.',
        highlights: ['Panoramic views over Kyustendil and the valley', 'Roman-era walls and medieval towers', 'Free to explore', 'Great picnic spot on the grass inside the walls'],
        tips: 'The climb up is about 10 minutes on a dirt path — manageable with a carrier but not with a stroller. Bring water, no facilities at the top. Best in late afternoon for golden light.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Not stroller-friendly — dirt path uphill',
        bestTime: 'Late afternoon for views and light',
        duration: '45 min - 1 hour',
      },
      'sapareva-banya': {
        name: 'Sapareva Banya',
        subtitle: 'Thermal pools & warm springs',
        lat: 42.583, lng: 22.967,
        image: null,
        description: 'A small town built around natural thermal springs. The main pool complex has warm mineral water (around 35-38°C) that\'s perfect for relaxing after a day of driving and hiking. There are both indoor and outdoor pools, and the water is said to have therapeutic properties.',
        highlights: ['Natural thermal water at 35-38°C', 'Indoor and outdoor pools', 'Stroller-friendly facilities', 'Affordable entry fee (~5-10 BGN / €3-5)'],
        tips: 'Bring swim diapers for Clement. Archie will need to wait in the van (shaded parking available). The outdoor pool is nicest in the late afternoon. Towels can be rented on-site.',
        kidFriendly: true,
        dogFriendly: false,
        accessibility: 'Fully stroller-friendly',
        bestTime: 'Late afternoon (3-5pm)',
        duration: '1-2 hours',
      },
      'maistora-gallery': {
        name: 'Maistora Gallery',
        subtitle: 'Contemporary art in the countryside',
        lat: 42.450, lng: 22.700,
        image: null,
        description: 'A surprising find in the Bulgarian countryside — a contemporary art gallery housed in a converted building with rotating exhibitions. The surrounding grounds have outdoor sculptures and installations. It\'s the kind of place that makes you stop and think, and the kids can run around the garden between artworks.',
        highlights: ['Rotating contemporary art exhibitions', 'Outdoor sculpture garden', 'Free or low-cost entry', 'Peaceful rural setting'],
        tips: 'Check opening hours before going — it\'s a small gallery and may close unexpectedly. The garden is the real highlight for kids. Combine with a picnic lunch.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Stroller-friendly',
        bestTime: 'Mid-morning (10am-12pm)',
        duration: '45 min - 1 hour',
      },
      'sequoia-trees': {
        name: 'Sequoia Trees',
        subtitle: 'Giant forest walk',
        lat: 42.520, lng: 22.750,
        image: null,
        description: 'A grove of giant sequoia trees planted in the early 20th century — towering redwoods that feel completely out of place in the Bulgarian landscape. The kids will be dwarfed by the massive trunks. A short, easy walking path loops through the grove.',
        highlights: ['Towering giant sequoias (some 30+ meters tall)', 'Easy flat walking path', 'Shaded and cool even in summer', 'Free access'],
        tips: 'The path is short (15-20 min loop) and completely flat — perfect for the stroller. Bring a camera, the scale of the trees is hard to capture. Best after rain when the forest floor smells amazing.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Fully stroller-friendly',
        bestTime: 'Any time — always shaded',
        duration: '20-30 min',
      },
    },
    days: [
      {
        day: 1,
        date: '2025-06-20',
        title: 'Southbound — Gorge & Fortress',
        distance: '~160 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: 'Breakfast at home, load the van', icon: '☕' },
          { time: '09:00', activity: 'Depart Sofia → Zemen Gorge (1h)', icon: '🚐' },
          { time: '10:00', activity: 'Zemen Gorge walk — dramatic canyon, river path', icon: '🏞️', stopId: 'zemen-gorge' },
          { time: '12:00', activity: 'Drive to Kyustendil (45min)', icon: '🚐' },
          { time: '13:00', activity: 'Lunch in Kyustendil — mehana food', icon: '🍽️' },
          { time: '14:30', activity: 'Hisarlaka Fortress — Roman ruins, panoramic views', icon: '🏰', stopId: 'hisarlaka-fortress' },
          { time: '16:00', activity: 'Clement nap in stroller / free play', icon: '😴' },
          { time: '17:00', activity: 'Drive to Osogovo foothills wild camp spot', icon: '🚐' },
          { time: '18:00', activity: 'Set up camp, dinner, Archie walk', icon: '⛺' },
          { time: '20:00', activity: 'Sunset, stars, early night', icon: '🌙' },
        ],
        notes: 'Wild camping in Osogovo foothills. Bring water — no facilities. Archie can roam free. Clement sleeps in the pop-top.',
        gallery: []
      },
      {
        day: 2,
        date: '2025-06-21',
        title: 'Northbound — Art, Trees & Thermal Pools',
        distance: '~150 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: 'Breakfast at camp, pack up', icon: '☕' },
          { time: '09:30', activity: 'Drive to Maistora Gallery (30min)', icon: '🚐' },
          { time: '10:00', activity: 'Maistora Gallery — contemporary art in the countryside', icon: '🎨', stopId: 'maistora-gallery' },
          { time: '11:30', activity: 'Drive to Sequoia Trees (30min)', icon: '🚐' },
          { time: '12:00', activity: 'Sequoia Trees walk — giant forest, kids love it', icon: '🌲', stopId: 'sequoia-trees' },
          { time: '13:30', activity: 'Lunch stop en route', icon: '🍽️' },
          { time: '14:30', activity: 'Drive to Sapareva Banya (45min)', icon: '🚐' },
          { time: '15:30', activity: 'Sapareva Banya thermal pools — warm water, relaxing', icon: '♨️', stopId: 'sapareva-banya' },
          { time: '17:00', activity: 'Final drive back to Sofia (1h)', icon: '🚐' },
          { time: '18:00', activity: 'Home! Unpack, dinner, collapse', icon: '🏠' },
        ],
        notes: 'Thermal pools are stroller-friendly. Bring swim diapers for Clement. Archie waits in the van (shaded, ventilated).',
        gallery: []
      }
    ],
    packing: [
      'Pop-up tent (backup sleeping)',
      'Swim gear + towels',
      'Swim diapers x10',
      'Stroller',
      'Archie leash + portable bowl',
      'Clement carrier',
      'Cooler box + 20L water',
      'Portable stove + gas',
      'First aid kit',
      'Headlamps',
      'Power bank',
      'Camera'
    ],
    budget: {
      fuel: '~18',
      food: '~30',
      thermalPools: '~10',
      gallery: '~5',
      total: '~63',
      currency: 'EUR'
    }
  },
  {
    id: 'rhodope-loop',
    slug: 'rhodope-loop',
    title: 'Rhodope Loop — Dorkovo & Vacha Dam',
    dates: { start: '2025-06-20', end: '2025-06-21' },
    distance: '~340 km',
    status: 'planned',
    summary: 'A dramatic two-day loop into the western Rhodopes — medieval fortress ruins, a spectacular gorge with tunnels and a massive dam, wild camping on the mountain plateau, then back through Devin and the timeless village of Borino.',
    coverImage: 'assets/images/cover-rhodope-loop.jpg',
    region: 'Bulgaria — Western Rhodopes',
    vehicle: 'VW T3 Westfalia Syncro',
    crew: ['Dino', 'Joshi', 'Bourya', 'Clement', 'Archie'],
    highlights: ['Tsepina Fortress', 'Vacha Gorge', 'Vacha Dam', 'Wild camp on plateau', 'Devin spa town', 'Borino village'],
    map: {
      center: [42.100, 24.400],
      zoom: 10,
      route: [
        { name: 'Sofia', lat: 42.6977, lng: 23.3219, type: 'start', label: 'Home base' },
        { name: 'Dorkovo', lat: 42.108, lng: 24.318, type: 'stop', label: 'Tsepina Fortress & village' },
        { name: 'Vacha Dam', lat: 42.135, lng: 24.455, type: 'highlight', label: 'Dramatic dam in the gorge' },
        { name: 'Plateau Wild Camp', lat: 42.180, lng: 24.520, type: 'camp', label: 'Wild camp — pine forest plateau' },
        { name: 'Devin', lat: 41.740, lng: 24.400, type: 'stop', label: 'Spa town — coffee & spring water' },
        { name: 'Borino', lat: 41.685, lng: 24.290, type: 'highlight', label: 'High Rhodope village' },
        { name: 'Sofia', lat: 42.6977, lng: 23.3219, type: 'end', label: 'Home' },
      ]
    },
    stops: {
      'tsepina-fortress': {
        name: 'Tsepina Fortress',
        subtitle: 'Medieval hilltop ruins',
        lat: 42.108, lng: 24.318,
        image: null,
        description: 'A dramatic medieval fortress perched on a conical hill above Dorkovo. The ruins include walls, towers, and a church, all surrounded by extraordinary 360° views over the Vacha valley and the Rhodope mountains. The climb is short but steep — about 10 minutes up a clay track.',
        highlights: ['360° panoramic views from the hilltop', 'Medieval walls and church ruins', 'Small museum at the base', 'Free access'],
        tips: 'The climb is steep on clay — wear proper shoes, not flip-flops. Not stroller-friendly (use the carrier). Best in the morning before it gets hot. The museum at the base has interesting artifacts from the site.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Not stroller-friendly — steep clay path',
        bestTime: 'Morning (9-11am)',
        duration: '1-1.5 hours',
      },
      'vacha-dam': {
        name: 'Vacha Dam',
        subtitle: 'Dramatic dam in the gorge',
        lat: 42.135, lng: 24.455,
        image: null,
        description: 'One of Bulgaria\'s most spectacular engineering feats — a massive concrete dam spanning a narrow limestone gorge. The reservoir stretches back into the mountains, and the viewpoint from the top gives a vertigo-inducing drop to the river below. The gorge road leading to it has tunnels cut into the cliff face.',
        highlights: ['Massive dam spanning a narrow gorge', 'Tunnels cut into the cliff face on the approach road', 'Viewpoint from the top of the dam', 'Picnic spots on the rocks nearby'],
        tips: 'The road through the gorge is narrow but paved — take it slow in the T3. Water shoes are great for the rocks near the dam. Not for anyone afraid of heights! The best viewpoint is from the dam crest.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Partial — viewpoint is accessible, rocks are not',
        bestTime: 'Midday for best light in the gorge',
        duration: '45 min - 1 hour',
      },
      'devin': {
        name: 'Devin',
        subtitle: 'Authentic spa town',
        lat: 41.740, lng: 24.400,
        image: null,
        description: 'A real working spa town in the Rhodopes — not touristy, just authentic. The town square has a natural spring where you can fill bottles with mineral water for free. There are small cafes, a market, and a relaxed mountain-town atmosphere. Good coffee and a proper stretch after the mountain drive.',
        highlights: ['Free mineral water from public spring', 'Authentic mountain town atmosphere', 'Good coffee on the square', 'Local market for supplies'],
        tips: 'Fill all your water bottles at the spring — it\'s excellent water. The market has local honey, herbs, and cheese. Public pools are available if you have time. Archie-friendly town with plenty of shade.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Fully stroller-friendly',
        bestTime: 'Mid-morning (10am-12pm)',
        duration: '30-45 min',
      },
      'borino': {
        name: 'Borino',
        subtitle: 'Timeless Rhodope village',
        lat: 41.685, lng: 24.290,
        image: null,
        description: 'A high-Rhodope village at ~1000m that hasn\'t changed shape in 80 years. Stone houses with slate roofs, walnut trees, old women in traditional dress in their yards, and complete silence except for birdsong. No tourist infrastructure — just pure authenticity. The kind of place that makes you want to sell everything and move to the mountains.',
        highlights: ['Traditional stone architecture', 'Walnut trees and mountain streams', 'Complete peace and quiet', 'No tourist crowds — ever'],
        tips: 'This is a living village, not a museum — be respectful. The road in is narrow but paved. Great spot for a final picnic lunch under a tree. Take photos of the architecture but ask before photographing people.',
        kidFriendly: true,
        dogFriendly: true,
        accessibility: 'Partially — village paths are uneven',
        bestTime: 'Midday (11am-1pm)',
        duration: '30-45 min',
      },
    },
    days: [
      {
        day: 1,
        date: '2025-06-20',
        title: 'Southbound — Gorge, Fortress & Dam',
        distance: '~170 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: 'Depart Sofia south via E79 — flat, fast LPG driving', icon: '🚐' },
          { time: '09:30', activity: 'Dorkovo — park at Tsepina hill base. Small museum & spring water fountain', icon: '🏰', stopId: 'tsepina-fortress' },
          { time: '09:45', activity: 'Climb Tsepina Fortress — short but steep on clay track. Dramatic conical peak, medieval ruins, extraordinary views over the Vacha valley', icon: '🥾', stopId: 'tsepina-fortress' },
          { time: '11:00', activity: 'Back down — explore old stone houses in the village, relaxed lunch at a mehana', icon: '🍽️' },
          { time: '12:00', activity: 'Enter the Vacha Gorge — narrow limestone canyon, sheer walls, tunnels cut into the cliff face. Drive slowly, windows down', icon: '🏞️', stopId: 'vacha-dam' },
          { time: '13:00', activity: 'Vacha Dam viewpoint — one of Bulgaria\'s most dramatic engineering feats. Picnic on the rocks, let everyone stretch', icon: '🌊', stopId: 'vacha-dam' },
          { time: '14:00', activity: 'Climb to the plateau — road winds up through pine forest. Temperature drops noticeably. Clement nap window', icon: '🚐' },
          { time: '15:30', activity: 'Find a flat clearing well off the road above 1200m. Pine trees, total silence. Set up camp', icon: '⛺' },
          { time: '18:00', activity: 'Dinner at camp, pop the top, stars', icon: '🌙' },
        ],
        notes: 'The gorge road is narrow in places but entirely paved — fine for the T3 at a sensible pace. Wild camping on the plateau is legal and peaceful. Bring water from the village.',
        gallery: []
      },
      {
        day: 2,
        date: '2025-06-21',
        title: 'Northbound — Devin, Borino & Home',
        distance: '~170 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: 'Breakfast at camp. Slow morning, Archie gets a proper run in the pines', icon: '☕' },
          { time: '10:00', activity: 'Drive down toward Devin (~45 min). Descent gives completely different views of the Rhodopes', icon: '🚐' },
          { time: '10:45', activity: 'Devin — real working spa town, not touristy. Coffee on the square, fill water bottles at the public spring, grab anything from the market', icon: '☕', stopId: 'devin' },
          { time: '11:15', activity: 'Borino — 20 min north on a narrow road climbing back into the trees. Classic high-Rhodope village at ~1000m — stone houses, walnut trees, old women in yards, complete quiet', icon: '🏘️', stopId: 'borino' },
          { time: '12:00', activity: 'Final picnic lunch under a tree in Borino before the long drive home', icon: '🍽️' },
          { time: '13:00', activity: 'Head north — road down to Velingrad, then Kostenets and E79. Plateau and pine forest, comfortable driving', icon: '🚐' },
          { time: '16:30', activity: 'Home! Well inside 19:00', icon: '🏠' },
        ],
        notes: 'Borino is the kind of village that hasn\'t changed shape in 80 years. No tourist infrastructure — just authenticity. Total budget ~€80-100 for two days.',
        gallery: []
      }
    ],
    packing: [
      'Water shoes (for dam viewpoint rocks)',
      'Proper hiking shoes (Tsepina climb is steep clay)',
      'Swim gear (Devin has public pools if time allows)',
      'Stroller (for Borino village walk)',
      'Archie leash + portable bowl',
      'Clement carrier',
      'Cooler box + 20L water (no water on plateau)',
      'Portable stove + gas',
      'First aid kit',
      'Headlamps',
      'Power bank',
      'Camera'
    ],
    budget: {
      fuel: '~40',
      food: '~35',
      camping: '~0 (wild camp)',
      misc: '~10',
      total: '~85',
      currency: 'EUR'
    }
  }
];

// Helper: get trip by ID
function getTrip(id) {
  return TRIPS.find(t => t.id === id) || TRIPS.find(t => t.slug === id);
}

// Helper: get stop by trip ID and stop ID
function getStop(tripId, stopId) {
  const trip = getTrip(tripId);
  if (!trip || !trip.stops) return null;
  return trip.stops[stopId] || null;
}

// Helper: format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper: get status label
function getStatusLabel(status) {
  const labels = { planned: 'Planned', active: 'On the road', completed: 'Completed' };
  return labels[status] || status;
}
