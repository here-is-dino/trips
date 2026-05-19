// App router and page rendering
const app = {
  currentPage: 'dashboard',
  currentTripId: null,
  currentStopId: null,
  weatherData: null,       // cached weather data for the trip
  hourlyWeatherData: null, // cached hourly weather data

  init() {
    this.parseUrl();
    window.addEventListener('popstate', () => this.parseUrl());
    this.updateTopBar();
  },

  parseUrl() {
    const path = window.location.pathname;
    const stopMatch = path.match(/^\/trip\/([a-z0-9-]+)\/stop\/([a-z0-9-]+)\/?$/);
    if (stopMatch) {
      this.currentPage = 'stop';
      this.currentTripId = stopMatch[1];
      this.currentStopId = stopMatch[2];
    } else {
      const tripMatch = path.match(/^\/trip\/([a-z0-9-]+)\/?$/);
      if (tripMatch) {
        this.currentPage = 'trip';
        this.currentTripId = tripMatch[1];
      } else {
        this.currentPage = 'dashboard';
        this.currentTripId = null;
      }
      this.currentStopId = null;
    }
    this.render();
    this.updateTopBar();
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    if (page === 'stop' && params.tripId && params.stopId) {
      this.currentTripId = params.tripId;
      this.currentStopId = params.stopId;
      window.history.pushState({}, '', `/trip/${params.tripId}/stop/${params.stopId}`);
    } else if (page === 'trip' && params.id) {
      this.currentTripId = params.id;
      this.currentStopId = null;
      window.history.pushState({}, '', `/trip/${params.id}`);
    } else {
      this.currentTripId = null;
      this.currentStopId = null;
      window.history.pushState({}, '', '/');
    }
    this.render();
    this.updateTopBar();
    window.scrollTo(0, 0);
  },

  // ── Top bar management ──────────────────────────────────
  updateTopBar() {
    const allTripsBtn = document.getElementById('all-trips-btn');
    const allTripsLabel = document.getElementById('all-trips-label');
    const langCurrent = document.getElementById('lang-current');
    const langOther = document.getElementById('lang-other');

    if (allTripsBtn) {
      allTripsBtn.style.display = this.currentPage !== 'dashboard' ? '' : 'none';
    }
    if (allTripsLabel) {
      allTripsLabel.textContent = t('allTrips');
    }
    if (langCurrent) {
      langCurrent.textContent = currentLang.toUpperCase();
    }
    if (langOther) {
      langOther.textContent = currentLang === 'en' ? 'BG' : 'EN';
    }
  },

  render() {
    const main = document.getElementById('main');
    if (!main) return;

    switch (this.currentPage) {
      case 'dashboard':
        main.innerHTML = this.renderDashboard();
        break;
      case 'trip':
        main.innerHTML = this.renderTrip(this.currentTripId);
        requestAnimationFrame(() => {
          this.initMap(this.currentTripId);
        });
        setTimeout(() => {
          const trip = getTrip(this.currentTripId);
          if (trip) this.fetchWeather(trip);
        }, 300);
        break;
      case 'stop':
        main.innerHTML = this.renderStop(this.currentTripId, this.currentStopId);
        requestAnimationFrame(() => this.initStopMap(this.currentTripId, this.currentStopId));
        break;
      default:
        main.innerHTML = this.renderDashboard();
    }
  },

  // ── Dashboard ───────────────────────────────────────────
  renderDashboard() {
    const trips = TRIPS;
    return `
      <div class="page-dashboard">
        <header class="site-header">
          <h1>${t('siteTitle')}</h1>
          <p class="subtitle">${t('siteSubtitle')}</p>
        </header>
        <section class="trips-grid">
          ${trips.map(trip => `
            <a href="/trip/${trip.id}" class="trip-card" onclick="app.navigate('trip', {id: '${trip.id}'}); return false;">
              <div class="trip-card-cover">
                ${trip.coverImage
                  ? `<img src="${trip.coverImage}" alt="${L(trip.title)}" loading="lazy">`
                  : `<div class="trip-card-placeholder"><span>${L(trip.title).charAt(0)}</span></div>`
                }
                <span class="trip-status status-${trip.status}">${getStatusLabel(trip.status)}</span>
              </div>
              <div class="trip-card-body">
                <h2>${L(trip.title)}</h2>
                <p class="trip-meta">
                  <span>📅 ${formatDate(trip.dates.start)} — ${formatDate(trip.dates.end)}</span>
                  <span>📍 ${trip.distance}</span>
                </p>
                <p class="trip-summary">${L(trip.summary)}</p>
                <div class="trip-highlights">
                  ${(currentLang === 'bg' ? trip.highlights.bg : trip.highlights.en).slice(0, 4).map(h => `<span class="highlight-tag">${h}</span>`).join('')}
                </div>
              </div>
            </a>
          `).join('')}
        </section>
        <footer class="site-footer">
          <p>${t('footer')}</p>
        </footer>
      </div>
    `;
  },

  // ── Trip Detail ─────────────────────────────────────────
  renderTrip(id) {
    const trip = getTrip(id);
    if (!trip) {
      return `
        <div class="page-trip" style="text-align:center;padding:80px 24px;">
          <h1 style="font-size:48px;margin-bottom:16px;">🗺️</h1>
          <h2 style="color:var(--ink);margin-bottom:8px;">${t('tripNotFound')}</h2>
          <p style="color:var(--muted);margin-bottom:24px;">${t('tripNotFoundMsg')}</p>
          <a href="/" onclick="app.navigate('dashboard'); return false;" class="back-link">← ${t('allTrips')}</a>
        </div>
      `;
    }

    const budgetEntries = Object.entries(trip.budget).filter(([k]) => k !== 'currency' && k !== 'total');

    return `
      <div class="page-trip">
        <header class="trip-header">
          ${trip.coverImage ? `<img src="${trip.coverImage}" alt="${L(trip.title)}" class="trip-hero-image">` : ''}
          <span class="trip-status status-${trip.status}">${getStatusLabel(trip.status)}</span>
          <h1>${L(trip.title)}</h1>
          <p class="trip-meta">
            <span>📅 ${formatDate(trip.dates.start)} — ${formatDate(trip.dates.end)}</span>
            <span>📍 ${trip.distance}</span>
            <span>🚐 ${trip.vehicle}</span>
          </p>
          <p class="trip-summary">${L(trip.summary)}</p>
        </header>
        <div class="trip-map" id="trip-map"></div>
        <div class="weather-widget" id="weather-widget">
          <div class="weather-loading">${currentLang === 'bg' ? 'Зареждане...' : 'Loading weather...'}</div>
        </div>
        <section class="trip-days">
          <h2>${t('dayByDay')}</h2>
          ${trip.days.map(day => {
            const dayWeather = this.getDayWeather(day.date);
            return `
            <details class="day-card" ${day.day === 1 ? 'open' : ''}>
              <summary class="day-header">
                <div class="day-title-block">
                  <span class="day-number">${t('dayByDay').split(' ')[0]} ${day.day}</span>
                  <span class="day-date">${formatDate(day.date)}</span>
                  <span class="day-weekday">${getWeekday(day.date)}</span>
                </div>
                <div class="day-info">
                  <span class="day-title">${L(day.title)}</span>
                  <span class="day-distance">${day.distance}</span>
                </div>
                <div class="day-weather ${dayWeather ? '' : 'loading'}"
                     data-date="${day.date}"
                     data-trip-id="${trip.id}"
                     onclick="app.openWeatherPopup('${day.date}', '${trip.id}', event)">
                  ${dayWeather
                    ? `<span class="day-weather-icon">${dayWeather.icon}</span><span class="day-weather-temp">${dayWeather.max}° / ${dayWeather.min}°</span>`
                    : `<span class="day-weather-icon">—</span>`
                  }
                </div>
                <span class="day-toggle">▾</span>
              </summary>
              <div class="day-content">
                <ul class="schedule">
                  ${day.schedule.map((item) => `
                    <li class="schedule-item${item.stopId ? ' has-stop' : ''}" ${item.stopId ? `data-stop-id="${item.stopId}" data-trip-id="${trip.id}"` : ''}>
                      <span class="schedule-time">${item.time}</span>
                      <span class="schedule-icon">${item.icon}</span>
                      <span class="schedule-activity">${L(item.activity)}</span>
                      ${item.stopId ? '<span class="stop-link-icon">→</span>' : ''}
                    </li>
                  `).join('')}
                </ul>
                ${day.notes ? `<p class="day-notes">💡 ${L(day.notes)}</p>` : ''}
                ${day.gallery && day.gallery.length > 0 ? this.renderGallery(day.gallery) : ''}
              </div>
            </details>
          `}).join('')}
        </section>

        ${trip.packing ? `
          <details class="trip-packing" open>
            <summary class="packing-header">
              <h2>${t('packingList')}</h2>
              <span class="day-toggle">▾</span>
            </summary>
            <ul class="packing-list">
              ${(currentLang === 'bg' ? trip.packing.bg : trip.packing.en).map((item) => `
                <li>
                  <label>
                    <input type="checkbox" onchange="this.closest('li').classList.toggle('checked', this.checked)">
                    ${item}
                  </label>
                </li>
              `).join('')}
            </ul>
          </details>
        ` : ''}

        ${trip.budget ? `
          <section class="trip-budget">
            <h2>${t('estimatedBudget')}</h2>
            <div class="budget-grid">
              ${budgetEntries.map(([k, v]) => `
                <div class="budget-item">
                  <span class="budget-label">${t(k) || k.charAt(0).toUpperCase() + k.slice(1)}</span>
                  <span class="budget-value">${v} ${trip.budget.currency}</span>
                </div>
              `).join('')}
              <div class="budget-item budget-total">
                <span class="budget-label">${t('total')}</span>
                <span class="budget-value">${trip.budget.total}</span>
              </div>
            </div>
          </section>
        ` : ''}

        <footer class="site-footer">
          <p>${t('footer')}</p>
        </footer>
      </div>
      <div class="lightbox" id="lightbox" onclick="app.closeLightbox()">
        <span class="lightbox-close">✕</span>
        <img src="" alt="" id="lightbox-img">
      </div>
    `;
  },

  // ── Stop Detail ─────────────────────────────────────────
  renderStop(tripId, stopId) {
    const trip = getTrip(tripId);
    const stop = getStop(tripId, stopId);
    if (!trip || !stop) {
      return `
        <div class="page-trip" style="text-align:center;padding:80px 24px;">
          <h1 style="font-size:48px;margin-bottom:16px;">📍</h1>
          <h2 style="color:var(--ink);margin-bottom:8px;">${t('stopNotFound')}</h2>
          <p style="color:var(--muted);margin-bottom:24px;">${t('stopNotFoundMsg')}</p>
          <a href="/trip/${tripId}" onclick="app.navigate('trip', {id: '${tripId}'}); return false;" class="back-link">← ${t('backToTrip', {trip: L(trip?.title || '')})}</a>
        </div>
      `;
    }

    return `
      <div class="page-trip">
        <nav class="trip-nav">
          <a href="/trip/${tripId}" onclick="app.navigate('trip', {id: '${tripId}'}); return false;" class="back-link">← ${L(trip.title)}</a>
        </nav>

        <header class="stop-header">
          ${stop.image ? `<img src="${stop.image}" alt="${L(stop.name)}" class="stop-hero-image">` : ''}
          <h1>${L(stop.name)}</h1>
          <p class="stop-subtitle">${L(stop.subtitle)}</p>
        </header>

        <div class="stop-content">
          <p class="stop-description">${L(stop.description)}</p>

          <div class="stop-meta-grid">
            ${stop.duration ? `
              <div class="stop-meta-item">
                <span class="stop-meta-icon">⏱️</span>
                <div>
                  <span class="stop-meta-label">${t('duration')}</span>
                  <span class="stop-meta-value">${L(stop.duration)}</span>
                </div>
              </div>
            ` : ''}
            ${stop.bestTime ? `
              <div class="stop-meta-item">
                <span class="stop-meta-icon">🕐</span>
                <div>
                  <span class="stop-meta-label">${t('bestTime')}</span>
                  <span class="stop-meta-value">${L(stop.bestTime)}</span>
                </div>
              </div>
            ` : ''}
            <div class="stop-meta-item">
              <span class="stop-meta-icon">${stop.kidFriendly ? '👶' : '🚫'}</span>
              <div>
                <span class="stop-meta-label">${t('kidFriendly')}</span>
                <span class="stop-meta-value">${stop.kidFriendly ? t('yes') : t('no')}</span>
              </div>
            </div>
            <div class="stop-meta-item">
              <span class="stop-meta-icon">${stop.dogFriendly ? '🐕' : '🚫'}</span>
              <div>
                <span class="stop-meta-label">${t('dogFriendly')}</span>
                <span class="stop-meta-value">${stop.dogFriendly ? t('yes') : t('no')}</span>
              </div>
            </div>
            ${stop.accessibility ? `
              <div class="stop-meta-item stop-meta-full">
                <span class="stop-meta-icon">♿</span>
                <div>
                  <span class="stop-meta-label">${t('accessibility')}</span>
                  <span class="stop-meta-value">${L(stop.accessibility)}</span>
                </div>
              </div>
            ` : ''}
          </div>

          ${stop.mapsUrl ? `
            <a href="${stop.mapsUrl}" target="_blank" rel="noopener" class="stop-maps-btn">
              📍 ${t('openInMaps')}
            </a>
          ` : ''}

          ${stop.highlights && ((currentLang === 'bg' ? stop.highlights.bg : stop.highlights.en) || []).length > 0 ? `
            <section class="stop-section">
              <h2>${t('highlights')}</h2>
              <ul class="stop-highlights">
                ${(currentLang === 'bg' ? stop.highlights.bg : stop.highlights.en).map(h => `<li>${h}</li>`).join('')}
              </ul>
            </section>
          ` : ''}

          ${stop.tips ? `
            <section class="stop-section">
              <h2>${t('tips')}</h2>
              <p class="stop-tips">💡 ${L(stop.tips)}</p>
            </section>
          ` : ''}

          <div class="stop-map" id="stop-map"></div>
        </div>

        <footer class="site-footer">
          <p>${t('footer')}</p>
        </footer>
      </div>
    `;
  },

  renderGallery(images) {
    if (!images || images.length === 0) return '';
    return `
      <div class="day-gallery">
        ${images.map(img => `
          <figure class="gallery-item" onclick="app.openLightbox('${img.src}')">
            <img src="${img.src}" alt="${img.caption || ''}" loading="lazy">
          </figure>
        `).join('')}
      </div>
    `;
  },

  // ── Leaflet Maps ────────────────────────────────────────
  initMap(id) {
    const trip = getTrip(id);
    if (!trip || !trip.map) return;
    const mapEl = document.getElementById('trip-map');
    if (!mapEl) return;
    if (typeof L === 'undefined') return;

    const routeCoords = trip.map.route.map(s => [s.lat, s.lng]);
    const map = L.map('trip-map', { scrollWheelZoom: false })
      .setView([trip.map.route[0].lat, trip.map.route[0].lng], trip.map.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 17,
    }).addTo(map);

    L.polyline(routeCoords, { color: '#3d2f1e', weight: 3, opacity: 0.8, dashArray: '8, 6' }).addTo(map);

    trip.map.route.forEach((stop, i) => {
      const color = { start: '#2d8a4e', end: '#d94f4f', camp: '#e67e22', highlight: '#8b5cf6', stop: '#3d2f1e' }[stop.type] || '#3d2f1e';
      const size = (stop.type === 'start' || stop.type === 'end') ? 14 : 10;
      const icon = L.divIcon({ className: 'custom-marker marker-' + stop.type, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
      L.marker([stop.lat, stop.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;"><strong>${i + 1}. ${L(stop.name)}</strong><br><span style="color:#6a6a6a;">${L(stop.label)}</span></div>`);
    });

    map.fitBounds(L.latLngBounds(routeCoords), { padding: [40, 40] });
  },

  // ── Stop Map ────────────────────────────────────────────
  initStopMap(tripId, stopId) {
    const stop = getStop(tripId, stopId);
    if (!stop || !stop.lat || !stop.lng) return;
    const mapEl = document.getElementById('stop-map');
    if (!mapEl) return;
    if (typeof L === 'undefined') return;

    const map = L.map('stop-map', { scrollWheelZoom: false })
      .setView([stop.lat, stop.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 17,
    }).addTo(map);

    const icon = L.divIcon({ className: 'custom-marker marker-highlight', iconSize: [14, 14], iconAnchor: [7, 7] });
    L.marker([stop.lat, stop.lng], { icon }).addTo(map)
      .bindPopup(`<div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;"><strong>${L(stop.name)}</strong></div>`);
  },

  // ── Weather ─────────────────────────────────────────────
  async fetchWeather(trip) {
    if (!trip.map || !trip.map.center) return;
    const [lat, lng] = trip.map.center;
    const widget = document.getElementById('weather-widget');
    if (!widget) {
      setTimeout(() => this.fetchWeather(trip), 200);
      return;
    }

    try {
      // Fetch both daily and hourly data
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode,precipitation_probability,windspeed_10m&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.daily) throw new Error('No data');

      this.weatherData = data.daily;
      this.hourlyWeatherData = data.hourly;
      this.weatherLocation = trip.region ? L(trip.region) : `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

      this.renderWeather(data.daily, widget);
      this.updateDayWeatherBadges();
    } catch (err) {
      if (widget) {
        widget.innerHTML = `<div class="weather-error">${currentLang === 'bg' ? 'Няма данни за времето' : 'Weather unavailable'}</div>`;
      }
    }
  },

  // Get weather for a specific day from cached data
  getDayWeather(dateStr) {
    if (!this.weatherData || !this.weatherData.time) return null;
    const idx = this.weatherData.time.indexOf(dateStr);
    if (idx === -1) return null;
    const code = this.weatherData.weathercode[idx];
    return {
      icon: wmoIcon(code),
      max: Math.round(this.weatherData.temperature_2m_max[idx]),
      min: Math.round(this.weatherData.temperature_2m_min[idx]),
      code: code,
    };
  },

  // Update all day weather badges after data loads
  updateDayWeatherBadges() {
    document.querySelectorAll('.day-weather').forEach(el => {
      const date = el.dataset.date;
      if (!date) return;
      const w = this.getDayWeather(date);
      if (w) {
        el.classList.remove('loading');
        el.innerHTML = `<span class="day-weather-icon">${w.icon}</span><span class="day-weather-temp">${w.max}° / ${w.min}°</span>`;
      }
    });
  },

  renderWeather(daily, widget) {
    const days = daily.time;
    const maxes = daily.temperature_2m_max;
    const mins = daily.temperature_2m_min;
    const codes = daily.weathercode;

    const dayNames = currentLang === 'bg'
      ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthNames = currentLang === 'bg'
      ? ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date().toISOString().split('T')[0];

    let html = `<div class="weather-grid">`;
    days.forEach((date, i) => {
      const d = new Date(date + 'T12:00:00');
      const isToday = date === today;
      const dayName = isToday
        ? (currentLang === 'bg' ? 'Днес' : 'Today')
        : dayNames[d.getDay()];
      const dateLabel = `${d.getDate()} ${monthNames[d.getMonth()]}`;
      const icon = wmoIcon(codes[i]);
      html += `
        <div class="weather-day${isToday ? ' weather-today' : ''}">
          <span class="weather-day-name">${dayName}</span>
          <span class="weather-date">${dateLabel}</span>
          <span class="weather-icon">${icon}</span>
          <span class="weather-temps">${Math.round(maxes[i])}° / ${Math.round(mins[i])}°</span>
        </div>
      `;
    });
    html += `</div>`;
    widget.innerHTML = html;
  },

  // ── Hourly Weather Popup ────────────────────────────────
  openWeatherPopup(dateStr, tripId, event) {
    if (event) event.stopPropagation();
    const trip = getTrip(tripId);
    const dayData = this.getDayWeather(dateStr);
    if (!dayData || !this.hourlyWeatherData) return;

    // Get hourly data for this day
    const hTime = this.hourlyWeatherData.time;
    const hTemp = this.hourlyWeatherData.temperature_2m;
    const hCode = this.hourlyWeatherData.weathercode;
    const hPrecip = this.hourlyWeatherData.precipitation_probability;
    const hWind = this.hourlyWeatherData.windspeed_10m;

    // Find indices for this date
    const dayIndices = [];
    hTime.forEach((t, i) => {
      if (t.startsWith(dateStr)) dayIndices.push(i);
    });

    // Build daily summary for the trip's days
    const dailyHtml = trip.days.map(day => {
      const w = this.getDayWeather(day.date);
      if (!w) return '';
      const dd = new Date(day.date + 'T12:00:00');
      const dayName = currentLang === 'bg'
        ? ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'][dd.getDay()]
        : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dd.getDay()];
      return `
        <div class="weather-popup-day">
          <div class="weather-popup-day-name">${dayName}</div>
          <div class="weather-popup-day-icon">${w.icon}</div>
          <div class="weather-popup-day-temps">${w.max}° / ${w.min}°</div>
        </div>
      `;
    }).join('');

    // Build hourly rows
    const hourlyHtml = dayIndices.map(i => {
      const timeStr = hTime[i].split('T')[1];
      const icon = wmoIcon(hCode[i]);
      return `
        <div class="weather-popup-hour">
          <div class="weather-popup-hour-time">${timeStr}</div>
          <div class="weather-popup-hour-icon">${icon}</div>
          <div class="weather-popup-hour-temp">${Math.round(hTemp[i])}°</div>
          <div class="weather-popup-hour-detail">
            <span>💧 ${hPrecip[i]}%</span>
            <span>💨 ${Math.round(hWind[i])} km/h</span>
          </div>
        </div>
      `;
    }).join('');

    const dateObj = new Date(dateStr + 'T12:00:00');
    const dateFormatted = dateObj.toLocaleDateString(currentLang === 'bg' ? 'bg-BG' : 'en-US', {
      weekday: 'long', day: 'numeric', month: 'long'
    });

    const locationName = this.weatherLocation || (trip.region ? L(trip.region) : '');

    const popupHtml = `
      <div class="weather-popup-overlay active" id="weather-popup-overlay" onclick="app.closeWeatherPopup(event)">
        <div class="weather-popup" onclick="event.stopPropagation()">
          <div class="weather-popup-header">
            <div>
              <div class="weather-popup-title">${dateFormatted}</div>
              <div class="weather-popup-location">📍 ${locationName}</div>
            </div>
            <button class="weather-popup-close" onclick="app.closeWeatherPopup()">✕</button>
          </div>
          <div class="weather-popup-daily">${dailyHtml}</div>
          <div class="weather-popup-hourly-title">${currentLang === 'bg' ? 'Почасово време' : 'Hourly forecast'}</div>
          <div class="weather-popup-hourly">${hourlyHtml}</div>
        </div>
      </div>
    `;

    // Remove existing popup if any
    const existing = document.getElementById('weather-popup-overlay');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', popupHtml);
  },

  closeWeatherPopup(event) {
    if (event && event.target !== event.currentTarget) return;
    const popup = document.getElementById('weather-popup-overlay');
    if (popup) popup.remove();
  },

  // ── Lightbox ────────────────────────────────────────────
  openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lb && img) { img.src = src; lb.classList.add('active'); }
  },
  closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
  },
};

// ── WMO weather code → emoji ─────────────────────────────
function wmoIcon(code) {
  const map = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️', 51: '🌦️', 53: '🌦️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '🌨️', 77: '🌨️',
    80: '🌦️', 81: '🌧️', 82: '🌧️',
    85: '🌨️', 86: '🌨️', 95: '⛈️', 96: '⛈️', 99: '⛈️',
  };
  return map[code] || '🌡️';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    app.closeLightbox();
    app.closeWeatherPopup();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  // Delegated click handler for stop links in schedule
  document.addEventListener('click', (e) => {
    const stopItem = e.target.closest('.schedule-item.has-stop');
    if (stopItem) {
      const tripId = stopItem.dataset.tripId;
      const stopId = stopItem.dataset.stopId;
      if (tripId && stopId) {
        app.navigate('stop', { tripId, stopId });
      }
    }
  });
});
