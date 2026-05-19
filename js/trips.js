// Trip data — single source of truth for all trips
const TRIPS = [
  {
    id: 'sofia-weekend',
    slug: 'sofia-weekend',
    title: 'Sofia Weekend — Kyustendil Loop',
    dates: { start: '2025-06-20', end: '2025-06-21' },
    distance: '310 km',
    status: 'planned', // planned | active | completed
    summary: 'A two-day loop through the Struma valley and Osogovo foothills — gorges, fortresses, galleries, and thermal pools. Perfect first van trip of the season.',
    coverImage: 'assets/images/cover-sofia-weekend.jpg',
    region: 'Bulgaria — Struma & Osogovo',
    vehicle: 'VW T3 Westfalia Syncro',
    crew: ['Dino', 'Joshi', 'Bourya', 'Clement', 'Archie'],
    highlights: ['Zemen Gorge', 'Kyustendil', 'Hisarlaka Fortress', 'Maistora Gallery', 'Sequoia Trees', 'Sapareva Banya thermal pools'],
    googleMapsKey: null, // will be set from config.js
    map: {
      center: [42.666, 22.666], // approximate center of the route
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
          { time: '10:00', activity: 'Zemen Gorge walk — dramatic canyon, river path', icon: '🏞️' },
          { time: '12:00', activity: 'Drive to Kyustendil (45min)', icon: '🚐' },
          { time: '13:00', activity: 'Lunch in Kyustendil — mehana food', icon: '🍽️' },
          { time: '14:30', activity: 'Hisarlaka Fortress — Roman ruins, panoramic views', icon: '🏰' },
          { time: '16:00', activity: 'Clement nap in stroller / free play', icon: '😴' },
          { time: '17:00', activity: 'Drive to Osogovo foothills wild camp spot', icon: '🚐' },
          { time: '18:00', activity: 'Set up camp, dinner, Archie walk', icon: '⛺' },
          { time: '20:00', activity: 'Sunset, stars, early night', icon: '🌙' },
        ],
        notes: 'Wild camping in Osogovo foothills. Bring water — no facilities. Archie can roam free. Clement sleeps in the pop-top.',
        gallery: [] // photo paths will be added here
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
          { time: '10:00', activity: 'Maistora Gallery — contemporary art in the countryside', icon: '🎨' },
          { time: '11:30', activity: 'Drive to Sequoia Trees (30min)', icon: '🚐' },
          { time: '12:00', activity: 'Sequoia Trees walk — giant forest, kids love it', icon: '🌲' },
          { time: '13:30', activity: 'Lunch stop en route', icon: '🍽️' },
          { time: '14:30', activity: 'Drive to Sapareva Banya (45min)', icon: '🚐' },
          { time: '15:30', activity: 'Sapareva Banya thermal pools — warm water, relaxing', icon: '♨️' },
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
    days: [
      {
        day: 1,
        date: '2025-06-20',
        title: 'Southbound — Gorge, Fortress & Dam',
        distance: '~170 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: 'Depart Sofia south via E79 — flat, fast LPG driving', icon: '🚐' },
          { time: '09:30', activity: 'Dorkovo — park at Tsepina hill base. Small museum & spring water fountain', icon: '🏰' },
          { time: '09:45', activity: 'Climb Tsepina Fortress — short but steep on clay track. Dramatic conical peak, medieval ruins, extraordinary views over the Vacha valley', icon: '🥾' },
          { time: '11:00', activity: 'Back down — explore old stone houses in the village, relaxed lunch at a mehana', icon: '🍽️' },
          { time: '12:00', activity: 'Enter the Vacha Gorge — narrow limestone canyon, sheer walls, tunnels cut into the cliff face. Drive slowly, windows down', icon: '🏞️' },
          { time: '13:00', activity: 'Vacha Dam viewpoint — one of Bulgaria\'s most dramatic engineering feats. Picnic on the rocks, let everyone stretch', icon: '🌊' },
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
          { time: '10:45', activity: 'Devin — real working spa town, not touristy. Coffee on the square, fill water bottles at the public spring, grab anything from the market', icon: '☕' },
          { time: '11:15', activity: 'Borino — 20 min north on a narrow road climbing back into the trees. Classic high-Rhodope village at ~1000m — stone houses, walnut trees, old women in yards, complete quiet', icon: '🏘️' },
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
