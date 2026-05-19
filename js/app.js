// App router and page rendering
const app = {
  currentPage: 'dashboard',
  currentTripId: null,

  init() {
    // Parse URL on load
    this.parseUrl();
    // Listen for browser back/forward
    window.addEventListener('popstate', () => this.parseUrl());
  },

  parseUrl() {
    const path = window.location.pathname;
    const match = path.match(/^\/trip\/([a-z0-9-]+)\/?$/);
    if (match) {
      this.currentPage = 'trip';
      this.currentTripId = match[1];
    } else {
      this.currentPage = 'dashboard';
      this.currentTripId = null;
    }
    this.render();
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    if (page === 'trip' && params.id) {
      this.currentTripId = params.id;
      window.history.pushState({}, '', `/trip/${params.id}`);
    } else {
      this.currentTripId = null;
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
      default:
        main.innerHTML = this.renderDashboard();
    }
  },

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
                  ${day.schedule.map(item => `
                    <li class="schedule-item">
                      <span class="schedule-time">${item.time}</span>
                      <span class="schedule-icon">${item.icon}</span>
                      <span class="schedule-activity">${item.activity}</span>
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
          <section class="trip-packing">
            <h2>Packing List</h2>
            <ul class="packing-list">
              ${trip.packing.map((item, i) => `
                <li>
                  <label>
                    <input type="checkbox" onchange="this.closest('li').classList.toggle('checked', this.checked)">
                    ${item}
                  </label>
                </li>
              `).join('')}
            </ul>
          </section>
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

      <!-- Lightbox -->
      <div class="lightbox" id="lightbox" onclick="app.closeLightbox()">
        <span class="lightbox-close">✕</span>
        <img src="" alt="" id="lightbox-img">
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

  // ── Leaflet Map ─────────────────────────────────────────
  initMap(id) {
    const trip = getTrip(id);
    if (!trip || !trip.map) return;

    const mapEl = document.getElementById('trip-map');
    if (!mapEl) return;

    if (typeof L === 'undefined') {
      mapEl.innerHTML = `
        <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);font-size:14px;text-align:center;padding:24px;">
          <p style="font-size:24px;margin-bottom:8px;">🗺️</p>
          <p>Map loading failed — check your internet connection</p>
        </div>
      `;
      return;
    }

    const routeCoords = trip.map.route.map(s => [s.lat, s.lng]);

    const map = L.map('trip-map', {
      scrollWheelZoom: false,
    }).setView([trip.map.route[0].lat, trip.map.route[0].lng], trip.map.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 17,
    }).addTo(map);

    L.polyline(routeCoords, {
      color: '#3d2f1e',
      weight: 3,
      opacity: 0.8,
      dashArray: '8, 6',
    }).addTo(map);

    const markerColors = {
      start: '#2d8a4e',
      end: '#d94f4f',
      camp: '#e67e22',
      highlight: '#8b5cf6',
      stop: '#3d2f1e',
    };

    trip.map.route.forEach((stop, i) => {
      const color = markerColors[stop.type] || '#3d2f1e';
      const size = (stop.type === 'start' || stop.type === 'end') ? 14 : 10;

      const icon = L.divIcon({
        className: 'custom-marker marker-' + stop.type,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;">
          <strong>${i + 1}. ${stop.name}</strong><br>
          <span style="color:#6a6a6a;">${stop.label}</span>
        </div>
      `);
    });

    const bounds = L.latLngBounds(routeCoords);
    map.fitBounds(bounds, { padding: [40, 40] });
  },

  // ── Lightbox ────────────────────────────────────────────
  openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lb && img) {
      img.src = src;
      lb.classList.add('active');
    }
  },

  closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
  },
};

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') app.closeLightbox();
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => app.init());
