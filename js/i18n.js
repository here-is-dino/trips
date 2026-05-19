// ── i18n: English / Bulgarian translations ─────────────────
const LOCALES = {
  en: {
    // Site
    siteTitle: 'Family Travels',
    siteSubtitle: 'Dino, Joshi, Bourya, Clement & Archie — on the road in the VW T3',
    footer: 'VW T3 Westfalia Syncro · Bulgaria & beyond · Est. 2025',

    // Dashboard
    allTrips: 'All trips',

    // Trip detail
    backToAll: '← All trips',
    backToTrip: '← {trip}',
    dayByDay: 'Day by Day',
    packingList: 'Packing List',
    estimatedBudget: 'Estimated Budget',
    total: 'Total',
    fuel: 'Fuel',
    food: 'Food',
    camping: 'Camping',
    misc: 'Misc',

    // Stop detail
    duration: 'Duration',
    bestTime: 'Best time',
    kidFriendly: 'Kid-friendly',
    dogFriendly: 'Dog-friendly',
    accessibility: 'Accessibility',
    highlights: 'Highlights',
    tips: 'Tips',
    yes: 'Yes',
    no: 'No',

    // Status
    planned: 'Planned',
    active: 'On the road',
    completed: 'Completed',

    // Errors
    tripNotFound: 'Trip not found',
    tripNotFoundMsg: "This trip doesn't exist or has been removed.",
    stopNotFound: 'Stop not found',
    stopNotFoundMsg: "This stop doesn't exist or has been removed.",

    // Budget labels (dynamic keys)
    thermalPools: 'Thermal pools',
    gallery: 'Gallery',
  },
  bg: {
    // Site
    siteTitle: 'Семейни пътувания',
    siteSubtitle: 'Дино, Жоши, Буря, Клемент & Арчи — на път с VW T3',
    footer: 'VW T3 Westfalia Syncro · България и не само · От 2025',

    // Dashboard
    allTrips: 'Всички пътувания',

    // Trip detail
    backToAll: '← Всички пътувания',
    backToTrip: '← {trip}',
    dayByDay: 'Ден по ден',
    packingList: 'Списък за опаковане',
    estimatedBudget: 'Приблизителен бюджет',
    total: 'Общо',
    fuel: 'Гориво',
    food: 'Храна',
    camping: 'Къмпинг',
    misc: 'Разни',

    // Stop detail
    duration: 'Продължителност',
    bestTime: 'Най-добро време',
    kidFriendly: 'Подходящ за деца',
    dogFriendly: 'Подходящ за кучета',
    accessibility: 'Достъпност',
    highlights: 'Акценти',
    tips: 'Съвети',
    yes: 'Да',
    no: 'Не',

    // Status
    planned: 'Планирано',
    active: 'На път',
    completed: 'Завършено',

    // Errors
    tripNotFound: 'Пътуването не е намерено',
    tripNotFoundMsg: 'Това пътуване не съществува или е премахнато.',
    stopNotFound: 'Спирката не е намерена',
    stopNotFoundMsg: 'Тази спирка не съществува или е премахната.',

    // Budget labels
    thermalPools: 'Термални басейни',
    gallery: 'Галерия',
  },
};

// Current language — persisted in localStorage
let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  if (lang !== 'en' && lang !== 'bg') return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  app.render();
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'bg' : 'en');
}

function t(key, vars = {}) {
  const str = LOCALES[currentLang][key] || LOCALES.en[key] || key;
  // Simple variable substitution: {name} → vars.name
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);
}
