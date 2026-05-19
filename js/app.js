// App router and page rendering
const app = {
  currentPage: 'dashboard',
  currentTripId: null,
  currentStopId: null,

  init() {
    this.parseUrl();
    window.addEventListener('popstate', () => this.parseUrl());
  },

  parseUrl() {
    const path = window.location.pathname;
    // Match /trip/:tripId/stop/:stopId
    const stopMatch = path.match(/^\/trip\/([a-z0-9-]+)\/stop\/([a-z0-9-]+)\/?$/);
    if (stopMatch) {
      this.currentPage = 'stop';
      this.currentTripId = stopMatch[1];
      this.currentStopId = stopMatch[2];
    } else {
      // Match /trip/:tripId
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
    window.scrollTo(0, 0);
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
        requestAnimationFrame(() => this.initMap(this.currentTripId));
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
          <h1>Family Travels</h1>
          <p class="subtitle">Dino, Joshi, Bourya, Clement & Archie — on the road in the VW T3</p>
        </header>
        <section class="trips-grid">
          ${trips.map(trip => `
            <a href="/trip/${trip.id}" class="trip-card" onclick="app.navigate('trip', {id: '${trip.id}'}); return false;">
              <div class="trip-card-cover">
                ${trip.coverImage
                  ? `<img src="${trip.coverImage}" alt="${trip.title}" loading="lazy">`
                  : `<div class="trip-card-placeholder"><span>${trip.title.charAt(0)}</span></div>`
                }
                <span class="trip-status status-${trip.status}">${getStatusLabel(trip.status)}</span>
              </div>
              <div class="trip-card-body">
                <h2>${trip.title}</h2>
                <p class="trip-meta">
                  <span>📅 ${formatDate(trip.dates.start)} — ${formatDate(trip.dates.end)}</span>
                  <span>📍 ${trip.distance}</span>
                </p>
                <p class="trip-summary">${trip.summary}</p>
                <div class="trip-highlights">
                  ${trip.highlights.slice(0, 4).map(h => `<span class="highlight-tag">${h}</span>`).join('')}
                </div>
              </div>
            </a>
          `).join('')}
        </section>
        <footer class="site-footer">
          <p>VW T3 Westfalia Syncro · Bulgaria & beyond · Est. 2025</p>
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
          <h2 style="color:var(--ink);margin-bottom:8px;">Trip not found</h2>
          <p style="color:var(--muted);margin-bottom:24px;">This trip doesn't exist or has been removed.</p>
          <a href="/" onclick="app.navigate('dashboard'); return false;" class="back-link">← All trips</a>
        </div>
      `;
    }

    return `
      <div class="page-trip">
        <nav class="trip-nav">
          <a href="/" onclick="app.navigate('dashboard'); return false;" class="back-link">← All trips</a>
        </nav>
        <header class="trip-header">
          <span class="trip-status status-${trip.status}">${getStatusLabel(trip.status)}</span>
          <h1>${trip.title}</h1>
          <p class="trip-meta">
            <span>📅 ${formatDate(trip.dates.start)} — ${formatDate(trip.dates.end)}</span>
            <span>📍 ${trip.distance}</span>
            <span>🚐 ${trip.vehicle}</span>
          </p>
          <p class="trip-summary">${trip.summary}</p>
        </header>
        <div class="trip-map" id="trip-map"></div>
        <section class="trip-days">
          <h2>Day by Day</h2>
          ${trip.days.map(day => `
            <details class="day-card" ${day.day === 1 ? 'open' : ''}>
              <summary class="day-header">
                <div class="day-title-block">
                  <span class="day-number">Day ${day.day}</span>
                  <span class="day-date">${formatDate(day.date)}</span>
                </div>
                <div class="day-info">
                  <span class="day-title">${day.title}</span>
                  <span class="day-distance">${day.distance}</span>
                </div>
                <span class="day-toggle">▾</span>
              </summary>
              <div class="day-content">
                <ul class="schedule">
                  ${day.schedule.map((item, idx) => `
                    <li class="schedule-item${item.stopId ? ' has-stop' : ''}" ${item.stopId ? `data-stop-id="${item.stopId}" data-trip-id="${trip.id}"` : ''}>
                      <span class="schedule-time">${item.time}</span>
                      <span class="schedule-icon">${item.icon}</span>
                      <span class="schedule-activity">${item.activity}</span>
                      ${item.stopId ? '<span class="stop-link-icon">→</span>' : ''}
                    </li>
                  `).join('')}
                </ul>
                ${day.notes ? `<p class="day-notes">💡 ${day.notes}</p>` : ''}
                ${day.gallery && day.gallery.length > 0 ? this.renderGallery(day.gallery) : ''}
              </div>
            </details>
          `).join('')}
        </section>

        ${trip.packing ? `
          <details class="trip-packing" open>
            <summary class="packing-header">
              <h2>Packing List</h2>
              <span class="day-toggle">▾</span>
            </summary>
            <ul class="packing-list">
              ${trip.packing.map((item) => `
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
            <h2>Estimated Budget</h2>
            <div class="budget-grid">
              ${Object.entries(trip.budget).filter(([k]) => k !== 'currency' && k !== 'total').map(([k, v]) => `
                <div class="budget-item">
                  <span class="budget-label">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
                  <span class="budget-value">${v} ${trip.budget.currency}</span>
                </div>
              `).join('')}
              <div class="budget-item budget-total">
                <span class="budget-label">Total</span>
                <span class="budget-value">${trip.budget.total}</span>
              </div>
            </div>
          </section>
        ` : ''}

        <footer class="site-footer">
          <p>VW T3 Westfalia Syncro · Bulgaria & beyond · Est. 2025</p>
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
          <h2 style="color:var(--ink);margin-bottom:8px;">Stop not found</h2>
          <p style="color:var(--muted);margin-bottom:24px;">This stop doesn't exist or has been removed.</p>
          <a href="/trip/${tripId}" onclick="app.navigate('trip', {id: '${tripId}'}); return false;" class="back-link">← Back to trip</a>
        </div>
      `;
    }

    return `
      <div class="page-trip">
        <nav class="trip-nav">
          <a href="/trip/${tripId}" onclick="app.navigate('trip', {id: '${tripId}'}); return false;" class="back-link">← ${trip.title}</a>
        </nav>

        <header class="stop-header">
          ${stop.image ? `<img src="${stop.image}" alt="${stop.name}" class="stop-hero-image">` : ''}
          <h1>${stop.name}</h1>
          <p class="stop-subtitle">${stop.subtitle}</p>
        </header>

        <div class="stop-content">
          <p class="stop-description">${stop.description}</p>

          <div class="stop-meta-grid">
            ${stop.duration ? `
              <div class="stop-meta-item">
                <span class="stop-meta-icon">⏱️</span>
                <div>
                  <span class="stop-meta-label">Duration</span>
                  <span class="stop-meta-value">${stop.duration}</span>
                </div>
              </div>
            ` : ''}
            ${stop.bestTime ? `
              <div class="stop-meta-item">
                <span class="stop-meta-icon">🕐</span>
                <div>
                  <span class="stop-meta-label">Best time</span>
                  <span class="stop-meta-value">${stop.bestTime}</span>
                </div>
              </div>
            ` : ''}
            <div class="stop-meta-item">
              <span class="stop-meta-icon">${stop.kidFriendly ? '👶' : '🚫'}</span>
              <div>
                <span class="stop-meta-label">Kid-friendly</span>
                <span class="stop-meta-value">${stop.kidFriendly ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div class="stop-meta-item">
              <span class="stop-meta-icon">${stop.dogFriendly ? '🐕' : '🚫'}</span>
              <div>
                <span class="stop-meta-label">Dog-friendly</span>
                <span class="stop-meta-value">${stop.dogFriendly ? 'Yes' : 'No'}</span>
              </div>
            </div>
            ${stop.accessibility ? `
              <div class="stop-meta-item stop-meta-full">
                <span class="stop-meta-icon">♿</span>
                <div>
                  <span class="stop-meta-label">Accessibility</span>
                  <span class="stop-meta-value">${stop.accessibility}</span>
                </div>
              </div>
            ` : ''}
          </div>

          ${stop.highlights && stop.highlights.length > 0 ? `
            <section class="stop-section">
              <h2>Highlights</h2>
              <ul class="stop-highlights">
                ${stop.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </section>
          ` : ''}

          ${stop.tips ? `
            <section class="stop-section">
              <h2>Tips</h2>
              <p class="stop-tips">💡 ${stop.tips}</p>
            </section>
          ` : ''}

          <div class="stop-map" id="stop-map"></div>
        </div>

        <footer class="site-footer">
          <p>VW T3 Westfalia Syncro · Bulgaria & beyond · Est. 2025</p>
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

    const markerColors = { start: '#2d8a4e', end: '#d94f4f', camp: '#e67e22', highlight: '#8b5cf6', stop: '#3d2f1e' };
    trip.map.route.forEach((stop, i) => {
      const color = markerColors[stop.type] || '#3d2f1e';
      const size = (stop.type === 'start' || stop.type === 'end') ? 14 : 10;
      const icon = L.divIcon({ className: 'custom-marker marker-' + stop.type, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
      L.marker([stop.lat, stop.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;"><strong>${i + 1}. ${stop.name}</strong><br><span style="color:#6a6a6a;">${stop.label}</span></div>`);
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
      .bindPopup(`<div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;"><strong>${stop.name}</strong></div>`);
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

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') app.closeLightbox(); });
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
