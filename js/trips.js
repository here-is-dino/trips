// Trip data — single source of truth for all trips
const TRIPS = [
  {
    id: 'sofia-weekend',
    slug: 'sofia-weekend',
    title: { en: 'Sofia Weekend — Kyustendil Loop', bg: 'Уикенд в София — Кюстендилски маршрут' },
    dates: { start: '2025-06-20', end: '2025-06-21' },
    distance: '310 km',
    status: 'planned',
    summary: {
      en: 'A two-day loop through the Struma valley and Osogovo foothills — gorges, fortresses, galleries, and thermal pools. Perfect first van trip of the season.',
      bg: 'Двудневен маршрут през долината на Струма и подножието на Осогово — клисури, крепости, галерии и термални басейни. Перфектното първо пътуване с фурона за сезона.',
    },
    coverImage: 'assets/images/cover-sofia-weekend.jpg',
    region: { en: 'Bulgaria — Struma & Osogovo', bg: 'България — Струма и Осогово' },
    vehicle: 'VW T3 Westfalia Syncro',
    crew: ['Dino', 'Joshi', 'Bourya', 'Clement', 'Archie'],
    highlights: {
      en: ['Zemen Gorge', 'Kyustendil', 'Hisarlaka Fortress', 'Maistora Gallery', 'Sequoia Trees', 'Sapareva Banya thermal pools'],
      bg: ['Земенско ждрело', 'Кюстендил', 'Крепостта Хисарлака', 'Галерия Майстора', 'Секвои', 'Термални басейни Сапарева баня'],
    },
    map: {
      center: [42.666, 22.666],
      zoom: 10,
      route: [
        { name: { en: 'Sofia', bg: 'София' }, lat: 42.6977, lng: 23.3219, type: 'start', label: { en: 'Home base', bg: 'Начало' } },
        { name: { en: 'Zemen Gorge', bg: 'Земенско ждрело' }, lat: 42.483, lng: 22.650, type: 'stop', label: { en: 'Zemen Gorge — dramatic canyon walk', bg: 'Земенско ждрело — разходка в каньона' } },
        { name: { en: 'Kyustendil', bg: 'Кюстендил' }, lat: 42.283, lng: 22.683, type: 'stop', label: { en: 'Kyustendil — old town stroll', bg: 'Кюстендил — разходка из стария град' } },
        { name: { en: 'Hisarlaka Fortress', bg: 'Крепостта Хисарлака' }, lat: 42.285, lng: 22.690, type: 'highlight', label: { en: 'Hisarlaka Fortress — Roman ruins', bg: 'Крепостта Хисарлака — римски руини' } },
        { name: { en: 'Osogovo Foothills', bg: 'Подножието на Осогово' }, lat: 42.350, lng: 22.550, type: 'camp', label: { en: 'Wild camp — Osogovo foothills', bg: 'Див къмпинг — подножието на Осогово' } },
        { name: { en: 'Maistora Gallery', bg: 'Галерия Майстора' }, lat: 42.450, lng: 22.700, type: 'highlight', label: { en: 'Maistora Gallery — contemporary art', bg: 'Галерия Майстора — съвременно изкуство' } },
        { name: { en: 'Sequoia Trees', bg: 'Секвои' }, lat: 42.520, lng: 22.750, type: 'stop', label: { en: 'Sequoia Trees — giant forest', bg: 'Секвои — гигантска гора' } },
        { name: { en: 'Sapareva Banya', bg: 'Сапарева баня' }, lat: 42.583, lng: 22.967, type: 'highlight', label: { en: 'Sapareva Banya — thermal pools', bg: 'Сапарева баня — термални басейни' } },
        { name: { en: 'Sofia', bg: 'София' }, lat: 42.6977, lng: 23.3219, type: 'end', label: { en: 'Home', bg: 'Начало' } },
      ]
    },
    // ── Stop detail pages ──────────────────────────────────
    stops: {
      'zemen-gorge': {
        name: { en: 'Zemen Gorge', bg: 'Земенско ждрело' },
        subtitle: { en: 'Dramatic canyon walk', bg: 'Разходка в каньона' },
        lat: 42.483, lng: 22.650,
        image: null,
        description: {
          en: 'A spectacular limestone canyon carved by the Struma River. The path follows the river through narrow sections with sheer walls rising on both sides. In places the gorge is so narrow you can touch both walls. The water is crystal clear and cold — perfect for dipping feet on a hot day.',
          bg: 'Впечатващ варовиков каньон, издълбан от река Струма. Пътеката следва реката през тесни участъци с отвесни стени от двете страни. На места ждрелото е толкова тясно, че можеш да докоснеш и двете стени. Водата е кристално чиста и студена — перфектна за потапяне на крака в горещ ден.',
        },
        highlights: {
          en: ['Narrow canyon sections with sheer limestone walls', 'Crystal clear river pools', 'Shaded path — stays cool in summer', 'Free access, no entrance fee'],
          bg: ['Тесни участъци с отвесни варовикови стени', 'Кристално чисти речни вирове', 'Сенчест път — остава хладен лято', 'Безплатен достъп'],
        },
        tips: {
          en: 'Wear water shoes or sandals with grip — the rocks can be slippery. The path is stroller-unfriendly past the first 500m. Best in the morning before the sun hits the gorge floor. About 1-2 hours for a good walk.',
          bg: 'Носете водоустойчиви обувки или сандали с добро сцепление — камъните могат да са хлъзгави. Пътеката не е подходяща за количка след първите 500м. Най-добре сутрин, преди слънцето да е паднало на дъното на ждрелото. Около 1-2 часа за добра разходка.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Partial — first section is easy, then gets rocky', bg: 'Частична — първият участък е лесен, после става скалист' },
        bestTime: { en: 'Morning (9-11am) for shade', bg: 'Сутрин (9-11ч) за сянка' },
        duration: { en: '1-2 hours', bg: '1-2 часа' },
      },
      'hisarlaka-fortress': {
        name: { en: 'Hisarlaka Fortress', bg: 'Крепостта Хисарлака' },
        subtitle: { en: 'Roman & medieval hilltop ruins', bg: 'Римски и средновековни руини на хълма' },
        lat: 42.285, lng: 22.690,
        image: null,
        description: {
          en: 'A dramatic hilltop fortress overlooking Kyustendil, with layers of history from Roman times through the medieval Bulgarian empire. The walls and towers are partially restored, and the views from the top stretch across the entire valley. Bourya will love running along the ramparts.',
          bg: 'Драматична хълмна крепост с изглед към Кюстендил, с слоеве от история от римско време до средновековната българска империя. Стените и кулите са частично реставрирани, а изгледът от върха се простира над цялата долина. Буря ще обича да тича по стените.',
        },
        highlights: {
          en: ['Panoramic views over Kyustendil and the valley', 'Roman-era walls and medieval towers', 'Free to explore', 'Great picnic spot on the grass inside the walls'],
          bg: ['Панорамна гледка към Кюстендил и долината', 'Римски стени и средновековни кули', 'Безплатно за разглеждане', 'Страхотно място за пикник на тревата вътре в стените'],
        },
        tips: {
          en: 'The climb up is about 10 minutes on a dirt path — manageable with a carrier but not with a stroller. Bring water, no facilities at the top. Best in late afternoon for golden light.',
          bg: 'Изкачването е около 10 минути по пясъчен път — поносимо с раница, но не и с количка. Носи вода, няма удобства на върха. Най-добре следобед за златна светлина.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Not stroller-friendly — dirt path uphill', bg: 'Не е подходящо за количка — пясъчен път нагоре' },
        bestTime: { en: 'Late afternoon for views and light', bg: 'Следобед за гледка и светлина' },
        duration: { en: '45 min - 1 hour', bg: '45 мин - 1 час' },
      },
      'sapareva-banya': {
        name: { en: 'Sapareva Banya', bg: 'Сапарева баня' },
        subtitle: { en: 'Thermal pools & warm springs', bg: 'Термални басейни и топли извори' },
        lat: 42.583, lng: 22.967,
        image: null,
        description: {
          en: 'A small town built around natural thermal springs. The main pool complex has warm mineral water (around 35-38°C) that\'s perfect for relaxing after a day of driving and hiking. There are both indoor and outdoor pools, and the water is said to have therapeutic properties.',
          bg: 'Малко градче, построено около естествени термални извори. Основният басейнен комплекс има топла минерална вода (около 35-38°C), перфектна за отдих след ден на шофиране и разходки. Има закрити и открити басейни, а водата се счита за терапевтична.',
        },
        highlights: {
          en: ['Natural thermal water at 35-38°C', 'Indoor and outdoor pools', 'Stroller-friendly facilities', 'Affordable entry fee (~5-10 BGN / €3-5)'],
          bg: ['Естествена термална вода при 35-38°C', 'Закрити и открити басейни', 'Удобства за колички', 'Приемна такса (~5-10 лв. / €3-5)'],
        },
        tips: {
          en: 'Bring swim diapers for Clement. Archie will need to wait in the van (shaded parking available). The outdoor pool is nicest in the late afternoon. Towels can be rented on-site.',
          bg: 'Занесете плувни памперси за Клемент. Арчи ще трябва да изчака в фурона (има сенчесто паркиране). Откритият басейн е най-хубав следобед. Кърпите могат да се наемат на място.',
        },
        kidFriendly: true, dogFriendly: false,
        accessibility: { en: 'Fully stroller-friendly', bg: 'Напълно подходящо за количка' },
        bestTime: { en: 'Late afternoon (3-5pm)', bg: 'Следобед (15-17ч)' },
        duration: { en: '1-2 hours', bg: '1-2 часа' },
      },
      'maistora-gallery': {
        name: { en: 'Maistora Gallery', bg: 'Галерия Майстора' },
        subtitle: { en: 'Contemporary art in the countryside', bg: 'Съвременно изкуство в провинцията' },
        lat: 42.450, lng: 22.700,
        image: null,
        description: {
          en: 'A surprising find in the Bulgarian countryside — a contemporary art gallery housed in a converted building with rotating exhibitions. The surrounding grounds have outdoor sculptures and installations. It\'s the kind of place that makes you stop and think, and the kids can run around the garden between artworks.',
          bg: 'Изненадващ откритие в българската провинция — галерия за съвременно изкуство в преоборудвана сграда с въртящи се изложения. Околните терени имат открити скулптури и инсталации. Това е мястото, което те кара да спреш и да мислиш, а децата могат да тичат из градината между произведенията.',
        },
        highlights: {
          en: ['Rotating contemporary art exhibitions', 'Outdoor sculpture garden', 'Free or low-cost entry', 'Peaceful rural setting'],
          bg: ['Въртящи се изложения на съвременно изкуство', 'Открита градина със скулптури', 'Безплатен или евтин вход', 'Спокойна селска обстановка'],
        },
        tips: {
          en: 'Check opening hours before going — it\'s a small gallery and may close unexpectedly. The garden is the real highlight for kids. Combine with a picnic lunch.',
          bg: 'Проверете работното време преди да отидете — малка е галерията и може да е затворена. Градината е истинският акцент за децата. Комбинирайте с обяд на открито.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Stroller-friendly', bg: 'Подходящо за количка' },
        bestTime: { en: 'Mid-morning (10am-12pm)', bg: 'Следобед (10-12ч)' },
        duration: { en: '45 min - 1 hour', bg: '45 мин - 1 час' },
      },
      'sequoia-trees': {
        name: { en: 'Sequoia Trees', bg: 'Секвои' },
        subtitle: { en: 'Giant forest walk', bg: 'Разходка сред гигантски дървета' },
        lat: 42.520, lng: 22.750,
        image: null,
        description: {
          en: 'A grove of giant sequoia trees planted in the early 20th century — towering redwoods that feel completely out of place in the Bulgarian landscape. The kids will be dwarfed by the massive trunks. A short, easy walking path loops through the grove.',
          bg: 'Горичка от гигантски секвои, засадени в началото на 20-ти век — величествени червени дървета, които изглеждат напълно неуместни в българския пейзаж. Децата ще бъдат дребни до масивните стъбла. Кратък и лесен път минава през горичката.',
        },
        highlights: {
          en: ['Towering giant sequoias (some 30+ meters tall)', 'Easy flat walking path', 'Shaded and cool even in summer', 'Free access'],
          bg: ['Величествени гигантски секвои (някои над 30м)', 'Лесен равен път за разходка', 'Сенчесто и хладор дори лято', 'Безплатен достъп'],
        },
        tips: {
          en: 'The path is short (15-20 min loop) and completely flat — perfect for the stroller. Bring a camera, the scale of the trees is hard to capture. Best after rain when the forest floor smells amazing.',
          bg: 'Пътеката е къса (15-20 мин обиколка) и напълно равна — перфектна за количка. Занесете камера, мащабът на дърветата е труден за заснемане. Най-добре след дъжд, когато пода на гората мирише невероятно.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Fully stroller-friendly', bg: 'Напълно подходящо за количка' },
        bestTime: { en: 'Any time — always shaded', bg: 'По всяко време — винаги в сянка' },
        duration: { en: '20-30 min', bg: '20-30 мин' },
      },
    },
    days: [
      {
        day: 1,
        date: '2025-06-20',
        title: { en: 'Southbound — Gorge & Fortress', bg: 'На юг — Ждрело и крепост' },
        distance: '~160 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: { en: 'Breakfast at home, load the van', bg: 'Закуска вкъщи, зареждане на фурона' }, icon: '☕' },
          { time: '09:00', activity: { en: 'Depart Sofia → Zemen Gorge (1h)', bg: 'Тръгване от София → Земенско ждрело (1ч)' }, icon: '🚐' },
          { time: '10:00', activity: { en: 'Zemen Gorge walk — dramatic canyon, river path', bg: 'Разходка в Земенско ждрело — каньон, речен път' }, icon: '🏞️', stopId: 'zemen-gorge' },
          { time: '12:00', activity: { en: 'Drive to Kyustendil (45min)', bg: 'Караван до Кюстендил (45мин)' }, icon: '🚐' },
          { time: '13:00', activity: { en: 'Lunch in Kyustendil — mehana food', bg: 'Обяд в Кюстендил — храна в механа' }, icon: '🍽️' },
          { time: '14:30', activity: { en: 'Hisarlaka Fortress — Roman ruins, panoramic views', bg: 'Крепостта Хисарлака — римски руини, панорамна гледка' }, icon: '🏰', stopId: 'hisarlaka-fortress' },
          { time: '16:00', activity: { en: 'Clement nap in stroller / free play', bg: 'Клемент спи в количката / свободна игра' }, icon: '😴' },
          { time: '17:00', activity: { en: 'Drive to Osogovo foothills wild camp spot', bg: 'Караван до див къмпинг в подножието на Осогово' }, icon: '🚐' },
          { time: '18:00', activity: { en: 'Set up camp, dinner, Archie walk', bg: 'Поставяне на лагер, вечеря, разходка с Арчи' }, icon: '⛺' },
          { time: '20:00', activity: { en: 'Sunset, stars, early night', bg: 'Залез, звезди, ранна нощ' }, icon: '🌙' },
        ],
        notes: { en: 'Wild camping in Osogovo foothills. Bring water — no facilities. Archie can roam free. Clement sleeps in the pop-top.', bg: 'Див къмпинг в подножието на Осогово. Носи вода — няма удобства. Арчи може да се разхожда свободно. Клемент спи в покрива.' },
        gallery: []
      },
      {
        day: 2,
        date: '2025-06-21',
        title: { en: 'Northbound — Art, Trees & Thermal Pools', bg: 'На север — Изкуство, дървета и термални басейни' },
        distance: '~150 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: { en: 'Breakfast at camp, pack up', bg: 'Закуска на лагер, пакетиране' }, icon: '☕' },
          { time: '09:30', activity: { en: 'Drive to Maistora Gallery (30min)', bg: 'Караван до Галерия Майстора (30мин)' }, icon: '🚐' },
          { time: '10:00', activity: { en: 'Maistora Gallery — contemporary art in the countryside', bg: 'Галерия Майстора — съвременно изкуство в провинцията' }, icon: '🎨', stopId: 'maistora-gallery' },
          { time: '11:30', activity: { en: 'Drive to Sequoia Trees (30min)', bg: 'Караван до Секвоите (30мин)' }, icon: '🚐' },
          { time: '12:00', activity: { en: 'Sequoia Trees walk — giant forest, kids love it', bg: 'Разходка сред секвоите — гигантска гора, децата го обичат' }, icon: '🌲', stopId: 'sequoia-trees' },
          { time: '13:30', activity: { en: 'Lunch stop en route', bg: 'Обяд по пътя' }, icon: '🍽️' },
          { time: '14:30', activity: { en: 'Drive to Sapareva Banya (45min)', bg: 'Караван до Сапарева баня (45мин)' }, icon: '🚐' },
          { time: '15:30', activity: { en: 'Sapareva Banya thermal pools — warm water, relaxing', bg: 'Термални басейни Сапарева баня — топла вода, отдих' }, icon: '♨️', stopId: 'sapareva-banya' },
          { time: '17:00', activity: { en: 'Final drive back to Sofia (1h)', bg: 'Последно караван обратно до София (1ч)' }, icon: '🚐' },
          { time: '18:00', activity: { en: 'Home! Unpack, dinner, collapse', bg: 'Вкъщи! Разопаковане, вечеря, падане' }, icon: '🏠' },
        ],
        notes: { en: 'Thermal pools are stroller-friendly. Bring swim diapers for Clement. Archie waits in the van (shaded, ventilated).', bg: 'Термалните басейни са подходящи за количка. Занесете плувни памперси за Клемент. Арчи чака в фурона (сенчесто, проветрено).' },
        gallery: []
      }
    ],
    packing: {
      en: ['Pop-up tent (backup sleeping)', 'Swim gear + towels', 'Swim diapers x10', 'Stroller', 'Archie leash + portable bowl', 'Clement carrier', 'Cooler box + 20L water', 'Portable stove + gas', 'First aid kit', 'Headlamps', 'Power bank', 'Camera'],
      bg: ['Походна палатка (резервно спане)', 'Плувни принадлежности + кърпи', 'Плувни памперси x10', 'Количка', 'Повод за Арчи + преносима купа', 'Раница за Клемент', 'Хладилник + 20л вода', 'Преносима печка + газ', 'Аптека', 'Фенери', 'Външна батерия', 'Камера'],
    },
    budget: {
      fuel: '~18', food: '~30', thermalPools: '~10', gallery: '~5',
      total: '~63', currency: 'EUR'
    }
  },
  {
    id: 'rhodope-loop',
    slug: 'rhodope-loop',
    title: { en: 'Rhodope Loop — Dorkovo & Vacha Dam', bg: 'Родопски маршрут — Дорково и Въча язовир' },
    dates: { start: '2026-05-20', end: '2026-05-21' },
    distance: '~340 km',
    status: 'planned',
    summary: {
      en: 'A dramatic two-day loop into the western Rhodopes — medieval fortress ruins, a spectacular gorge with tunnels and a massive dam, wild camping on the mountain plateau, then back through Devin and the timeless village of Borino.',
      bg: 'Драматичен двудневен маршрут в западните Родопи — средновековни крепостни руини, впечатващ каньон с тунели и масивен язовир, див къмпинг на планинското плато, после обратно през Девин и вечното село Борино.',
    },
    coverImage: 'assets/images/cover-rhodope-loop.jpg',
    region: { en: 'Bulgaria — Western Rhodopes', bg: 'България — Западни Родопи' },
    vehicle: 'VW T3 Westfalia Syncro',
    crew: ['Dino', 'Joshi', 'Bourya', 'Clement', 'Archie'],
    highlights: {
      en: ['Tsepina Fortress', 'Vacha Gorge', 'Vacha Dam', 'Wild camp on plateau', 'Devin spa town', 'Borino village'],
      bg: ['Крепостта Цепина', 'Въчинско ждрело', 'Язовир Въча', 'Див къмпинг на платото', 'Курорт Девин', 'Село Борино'],
    },
    map: {
      center: [42.100, 24.400],
      zoom: 10,
      route: [
        { name: { en: 'Sofia', bg: 'София' }, lat: 42.6977, lng: 23.3219, type: 'start', label: { en: 'Home base', bg: 'Начало' } },
        { name: { en: 'Dorkovo', bg: 'Дорково' }, lat: 42.108, lng: 24.318, type: 'stop', label: { en: 'Tsepina Fortress & village', bg: 'Крепостта Цепина и село' } },
        { name: { en: 'Vacha Dam', bg: 'Язовир Въча' }, lat: 42.135, lng: 24.455, type: 'highlight', label: { en: 'Dramatic dam in the gorge', bg: 'Драматичен язовир в каньона' } },
        { name: { en: 'Plateau Wild Camp', bg: 'Див къмпинг на платото' }, lat: 42.180, lng: 24.520, type: 'camp', label: { en: 'Wild camp — pine forest plateau', bg: 'Див къмпинг — борова гора на платото' } },
        { name: { en: 'Devin', bg: 'Девин' }, lat: 41.740, lng: 24.400, type: 'stop', label: { en: 'Spa town — coffee & spring water', bg: 'Курорт — кафе и изворна вода' } },
        { name: { en: 'Borino', bg: 'Борино' }, lat: 41.685, lng: 24.290, type: 'highlight', label: { en: 'High Rhodope village', bg: 'Високо родопско село' } },
        { name: { en: 'Sofia', bg: 'София' }, lat: 42.6977, lng: 23.3219, type: 'end', label: { en: 'Home', bg: 'Начало' } },
      ]
    },
    stops: {
      'tsepina-fortress': {
        name: { en: 'Tsepina Fortress', bg: 'Крепостта Цепина' },
        subtitle: { en: 'Medieval hilltop ruins', bg: 'Средновековни руини на хълма' },
        lat: 42.108, lng: 24.318,
        image: null,
        description: {
          en: 'A dramatic medieval fortress perched on a conical hill above Dorkovo. The ruins include walls, towers, and a church, all surrounded by extraordinary 360° views over the Vacha valley and the Rhodope mountains. The climb is short but steep — about 10 minutes up a clay track.',
          bg: 'Драматична средновековна крепост, разположена на коничен хълм над Дорково. Руините включват стени, кули и църква, всичко заобиколено от изключителна 360° гледка към долината на Въча и Родопските планини. Изкачването е кратко, но стръмно — около 10 минути по глинен път.',
        },
        highlights: {
          en: ['360° panoramic views from the hilltop', 'Medieval walls and church ruins', 'Small museum at the base', 'Free access'],
          bg: ['360° панорамна гледка от хълма', 'Средновековни стени и църковни руини', 'Малък музей в основата', 'Безплатен достъп'],
        },
        tips: {
          en: 'The climb is steep on clay — wear proper shoes, not flip-flops. Not stroller-friendly (use the carrier). Best in the morning before it gets hot. The museum at the base has interesting artifacts from the site.',
          bg: 'Изкачването е стръмно по глина — носете подходящи обувки, не джапанки. Не е подходящо за количка (използвайте раница). Най-добре сутрин, преди да стане горещо. Музеят в основата има интересни артефакти от мястото.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Not stroller-friendly — steep clay path', bg: 'Не е подходящо за количка — стръмен глинен път' },
        bestTime: { en: 'Morning (9-11am)', bg: 'Сутрин (9-11ч)' },
        duration: { en: '1-1.5 hours', bg: '1-1.5 часа' },
      },
      'vacha-dam': {
        name: { en: 'Vacha Dam', bg: 'Язовир Въча' },
        subtitle: { en: 'Dramatic dam in the gorge', bg: 'Драматичен язовир в каньона' },
        lat: 42.135, lng: 24.455,
        image: null,
        description: {
          en: 'One of Bulgaria\'s most spectacular engineering feats — a massive concrete dam spanning a narrow limestone gorge. The reservoir stretches back into the mountains, and the viewpoint from the top gives a vertigo-inducing drop to the river below. The gorge road leading to it has tunnels cut into the cliff face.',
          bg: 'Едно от най-впечатващите инженерни постижения на България — масивен бетонов язовир, пресичащ тесен варовиков каньон. Резервоарът се простира назад към планините, а гледката от върха дава вртоглавичен пад към реката отдолу. Пътят през каньона има тунели, изсечени в скалита.',
        },
        highlights: {
          en: ['Massive dam spanning a narrow gorge', 'Tunnels cut into the cliff face on the approach road', 'Viewpoint from the top of the dam', 'Picnic spots on the rocks nearby'],
          bg: ['Масивен язовир, пресичащ тесен каньон', 'Тунели, изсечени в скалита по подходния път', 'Гледка от върха на язовира', 'Места за пикник по камъните наблизо'],
        },
        tips: {
          en: 'The road through the gorge is narrow but paved — take it slow in the T3. Water shoes are great for the rocks near the dam. Not for anyone afraid of heights! The best viewpoint is from the dam crest.',
          bg: 'Пътят през каньона е тесен, но асфалтиран — бавно с Т3. Водоустойчивите обувки са страхотни за камъните близо до язовира. Не е за хора, страхуващи се от височина! Най-добрата гледка е от гребена на язовира.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Partial — viewpoint is accessible, rocks are not', bg: 'Частична — гледката е достъпна, камъните не' },
        bestTime: { en: 'Midday for best light in the gorge', bg: 'Обяд за най-добра светлина в каньона' },
        duration: { en: '45 min - 1 hour', bg: '45 мин - 1 час' },
      },
      'devin': {
        name: { en: 'Devin', bg: 'Девин' },
        subtitle: { en: 'Authentic spa town', bg: 'Автентичен курорт' },
        lat: 41.740, lng: 24.400,
        image: null,
        description: {
          en: 'A real working spa town in the Rhodopes — not touristy, just authentic. The town square has a natural spring where you can fill bottles with mineral water for free. There are small cafes, a market, and a relaxed mountain-town atmosphere. Good coffee and a proper stretch after the mountain drive.',
          bg: 'Истински работещ курорт в Родопите — не туристически, а автентичен. На градския площад има естествен извор, където може да пълните бутилки с минерална вода безплатно. Има малки кафенета, пазар и спокойна планинска атмосфера. Добро кафе и разтягане след планинското караван.',
        },
        highlights: {
          en: ['Free mineral water from public spring', 'Authentic mountain town atmosphere', 'Good coffee on the square', 'Local market for supplies'],
          bg: ['Безплатна минерална вода от обществен извор', 'Автентична планинска атмосфера', 'Добро кафе на площада', 'Местен пазар за припаси'],
        },
        tips: {
          en: 'Fill all your water bottles at the spring — it\'s excellent water. The market has local honey, herbs, and cheese. Public pools are available if you have time. Archie-friendly town with plenty of shade.',
          bg: 'Напълнете всички бутилки на извора — водата е отлична. На пазара има местен мед, билки и сирене. Има обществени басейни, ако имате време. Градчето е подходящо за Арчи с много сянка.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Fully stroller-friendly', bg: 'Напълно подходящо за количка' },
        bestTime: { en: 'Mid-morning (10am-12pm)', bg: 'Следобед (10-12ч)' },
        duration: { en: '30-45 min', bg: '30-45 мин' },
      },
      'borino': {
        name: { en: 'Borino', bg: 'Борино' },
        subtitle: { en: 'Timeless Rhodope village', bg: 'Вечно родопско село' },
        lat: 41.685, lng: 24.290,
        image: null,
        description: {
          en: 'A high-Rhodope village at ~1000m that hasn\'t changed shape in 80 years. Stone houses with slate roofs, walnut trees, old women in traditional dress in their yards, and complete silence except for birdsong. No tourist infrastructure — just pure authenticity. The kind of place that makes you want to sell everything and move to the mountains.',
          bg: 'Високо родопско село на ~1000м, което не е променило формата си от 80 години. Каменни къщи с шисти, орехови дървета, стари жени в традиционни дрехи в дворовете и пълна тишина освен птичи песни. Без туристическа инфраструктура — само чиста автентичност. Мястото, което те кара да искаш да продадеш всичко и да се преселиш в планината.',
        },
        highlights: {
          en: ['Traditional stone architecture', 'Walnut trees and mountain streams', 'Complete peace and quiet', 'No tourist crowds — ever'],
          bg: ['Традиционна каменна архитектура', 'Орехови дървета и планински потоци', 'Пълно спокойствие', 'Без туристически тълпи — никога'],
        },
        tips: {
          en: 'This is a living village, not a museum — be respectful. The road in is narrow but paved. Great spot for a final picnic lunch under a tree. Take photos of the architecture but ask before photographing people.',
          bg: 'Това е живо село, не музей — бъдете уважителни. Пътят навътре е тесен, но асфалтиран. Страхотно място за последен пикник под дърво. Снимайте архитектурата, но питайте преди да снимате хора.',
        },
        kidFriendly: true, dogFriendly: true,
        accessibility: { en: 'Partially — village paths are uneven', bg: 'Частично — селските пътеки са неравни' },
        bestTime: { en: 'Midday (11am-1pm)', bg: 'Обяд (11-13ч)' },
        duration: { en: '30-45 min', bg: '30-45 мин' },
      },
    },
    days: [
      {
        day: 1,
        date: '2026-05-20',
        title: { en: 'Southbound — Gorge, Fortress & Dam', bg: 'На юг — Каньон, крепост и язовир' },
        distance: '~170 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: { en: 'Depart Sofia south via E79 — flat, fast LPG driving', bg: 'Тръгване от София на юг по E79 — равен, бърз ЛПГ' }, icon: '🚐' },
          { time: '09:30', activity: { en: 'Dorkovo — park at Tsepina hill base. Small museum & spring water fountain', bg: 'Дорково — паркиране в основата на хълма Цепина. Малък музей и изворна вода' }, icon: '🏰', stopId: 'tsepina-fortress' },
          { time: '09:45', activity: { en: 'Climb Tsepina Fortress — short but steep on clay track. Dramatic conical peak, medieval ruins, extraordinary views over the Vacha valley', bg: 'Изкачване на Цепина — кратко, но стръмно по глина. Драматичен коничен връх, средновековни руини, изключителна гледка към долината на Въча' }, icon: '🥾', stopId: 'tsepina-fortress' },
          { time: '11:00', activity: { en: 'Back down — explore old stone houses in the village, relaxed lunch at a mehana', bg: 'Надолу — разглеждане на стари каменни къщи в селото, спокоен обяд в механа' }, icon: '🍽️' },
          { time: '12:00', activity: { en: 'Enter the Vacha Gorge — narrow limestone canyon, sheer walls, tunnels cut into the cliff face. Drive slowly, windows down', bg: 'Влизане във Въчинското ждрело — тесен варовиков каньон, отвесни стени, тунели в скалита. Бавно караван, прозорците отворени' }, icon: '🏞️', stopId: 'vacha-dam' },
          { time: '13:00', activity: { en: 'Vacha Dam viewpoint — one of Bulgaria\'s most dramatic engineering feats. Picnic on the rocks, let everyone stretch', bg: 'Гледка от язовир Въча — едно от най-драматичните инженерни постижения на България. Пикник по камъните, разтягане' }, icon: '🌊', stopId: 'vacha-dam' },
          { time: '14:00', activity: { en: 'Climb to the plateau — road winds up through pine forest. Temperature drops noticeably. Clement nap window', bg: 'Изкачване на платото — пътят се извива нагоре през борова гора. Температурата пада забележимо. Прозорец за сън на Клемент' }, icon: '🚐' },
          { time: '15:30', activity: { en: 'Find a flat clearing well off the road above 1200m. Pine trees, total silence. Set up camp', bg: 'Намиране на равна поляна далеч от пъта над 1200м. Борови дървета, пълна тишина. Поставяне на лагер' }, icon: '⛺' },
          { time: '18:00', activity: { en: 'Dinner at camp, pop the top, stars', bg: 'Вечеря на лагер, отваряне на покрива, звезди' }, icon: '🌙' },
        ],
        notes: { en: 'The gorge road is narrow in places but entirely paved — fine for the T3 at a sensible pace. Wild camping on the plateau is legal and peaceful. Bring water from the village.', bg: 'Пътят през каньона е тесен на места, но изцяло асфалтиран — подходящ за Т3 с разумна скорост. Дивият къмпинг на платото е законен и спокоен. Носи вода от селото.' },
        gallery: []
      },
      {
        day: 2,
        date: '2026-05-21',
        title: { en: 'Northbound — Devin, Borino & Home', bg: 'На север — Девин, Борино и вкъщи' },
        distance: '~170 km',
        completed: false,
        schedule: [
          { time: '08:00', activity: { en: 'Breakfast at camp. Slow morning, Archie gets a proper run in the pines', bg: 'Закуска на лагер. Бавна сутрин, Арчи се разхожда на воля в боровете' }, icon: '☕' },
          { time: '10:00', activity: { en: 'Drive down toward Devin (~45 min). Descent gives completely different views of the Rhodopes', bg: 'Караван надолу към Девин (~45 мин). Спускането дава напълно различна гледка към Родопите' }, icon: '🚐' },
          { time: '10:45', activity: { en: 'Devin — real working spa town, not touristy. Coffee on the square, fill water bottles at the public spring, grab anything from the market', bg: 'Девин — истински работещ курорт, не туристически. Кафе на площада, пълнене на бутилки от обществения извора, пазаруване' }, icon: '☕', stopId: 'devin' },
          { time: '11:15', activity: { en: 'Borino — 20 min north on a narrow road climbing back into the trees. Classic high-Rhodope village at ~1000m — stone houses, walnut trees, old women in yards, complete quiet', bg: 'Борино — 20 мин на север по тесен път, изкачващ се обратно сред дърветата. Класическо високо родопско село на ~1000м — каменни къщи, орехови дървета, стари жени в дворовете, пълна тишина' }, icon: '🏘️', stopId: 'borino' },
          { time: '12:00', activity: { en: 'Final picnic lunch under a tree in Borino before the long drive home', bg: 'Последен пикник под дърво в Борино преди дългото караван вкъщи' }, icon: '🍽️' },
          { time: '13:00', activity: { en: 'Head north — road down to Velingrad, then Kostenets and E79. Plateau and pine forest, comfortable driving', bg: 'На север — път надолу до Велинград, после Костенец и E79. Плато и борова гора, комфортно караван' }, icon: '🚐' },
          { time: '16:30', activity: { en: 'Home! Well inside 19:00', bg: 'Вкъщи! Добре преди 19:00' }, icon: '🏠' },
        ],
        notes: { en: 'Borino is the kind of village that hasn\'t changed shape in 80 years. No tourist infrastructure — just authenticity. Total budget ~€80-100 for two days.', bg: 'Борино е такова село, което не е променило формата си от 80 години. Без туристическа инфраструктура — само автентичност. Общ бюджет ~€80-100 за два дни.' },
        gallery: []
      }
    ],
    packing: {
      en: ['Water shoes (for dam viewpoint rocks)', 'Proper hiking shoes (Tsepina climb is steep clay)', 'Swim gear (Devin has public pools if time allows)', 'Stroller (for Borino village walk)', 'Archie leash + portable bowl', 'Clement carrier', 'Cooler box + 20L water (no water on plateau)', 'Portable stove + gas', 'First aid kit', 'Headlamps', 'Power bank', 'Camera'],
      bg: ['Водоустойчиви обувки (за камъните при язовира)', 'Подходящи туристически обувки (изкачването на Цепина е стръмна глина)', 'Плувни принадлежности (Девин има обществени басейни ако има време)', 'Количка (за разходка в Борино)', 'Повод за Арчи + преносима купа', 'Раница за Клемент', 'Хладилник + 20л вода (няма вода на платото)', 'Преносима печка + газ', 'Аптека', 'Фенери', 'Външна батерия', 'Камера'],
    },
    budget: {
      fuel: '~40', food: '~35', camping: '~0 (wild camp)', misc: '~10',
      total: '~85', currency: 'EUR'
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

// Helper: get localized string from a field (handles both string and {en, bg} object)
function L(field) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && !Array.isArray(field)) {
    return field[currentLang] || field.en || '';
  }
  if (Array.isArray(field)) {
    return field.map(item => L(item)).join('');
  }
  return String(field);
}

// Helper: format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (currentLang === 'bg') {
    return d.toLocaleDateString('bg-BG', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper: get day of week
function getWeekday(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  if (currentLang === 'bg') {
    return d.toLocaleDateString('bg-BG', { weekday: 'short' });
  }
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

// Helper: get status label
function getStatusLabel(status) {
  return t(status) || status;
}
