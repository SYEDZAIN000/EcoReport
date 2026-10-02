/* ============================================================
   EcoReport - shared JavaScript
   Every block checks whether its element exists, so this one
   file can safely be loaded on every page.
   ============================================================ */

/* ---------- 1. Photo preview + size check (report page) ---------- */
const photoInput = document.getElementById('photo');
const preview = document.getElementById('imagePreview');
const photoError = document.getElementById('photoError');

if (photoInput) {
  photoInput.addEventListener('change', function () {
    photoError.textContent = '';
    const file = this.files[0];
    if (!file) { preview.style.display = 'none'; return; }

    // 2 MB limit. Keep this in sync with upload_max_filesize in php.ini.
    if (file.size > 2 * 1024 * 1024) {
      photoError.textContent = 'That photo is larger than 2 MB. Choose a smaller one.';
      this.value = '';
      preview.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- 2. Character counter (report page) ---------- */
const description = document.getElementById('description');
const charCount = document.getElementById('charCount');

if (description && charCount) {
  description.addEventListener('input', () => {
    charCount.textContent = description.value.length;
  });
}

/* ---------- 3. Map with a draggable pin (report page) ---------- */
const mapEl = document.getElementById('map');
let marker;

if (mapEl && typeof L !== 'undefined') {
  const latField = document.getElementById('latitude');
  const lngField = document.getElementById('longitude');

  // Default view: Bengaluru. Change these numbers for another city.
  const map = L.map('map').setView([latField.value, lngField.value], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([latField.value, lngField.value], { draggable: true }).addTo(map);

  // Dragging the pin updates the hidden fields that PHP saves.
  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    latField.value = pos.lat.toFixed(6);
    lngField.value = pos.lng.toFixed(6);
  });

  // Clicking the map moves the pin there.
  map.on('click', e => {
    marker.setLatLng(e.latlng);
    latField.value = e.latlng.lat.toFixed(6);
    lngField.value = e.latlng.lng.toFixed(6);
  });

  /* ---------- 4. "Use my location" button ---------- */
  const locateBtn = document.getElementById('locateBtn');
  const addressError = document.getElementById('addressError');

  locateBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      addressError.textContent = 'This browser cannot find your location. Type the address instead.';
      return;
    }

    locateBtn.textContent = 'Finding you...';
    locateBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        latField.value = lat.toFixed(6);
        lngField.value = lng.toFixed(6);
        map.setView([lat, lng], 17);
        marker.setLatLng([lat, lng]);
        addressError.textContent = '';
        locateBtn.textContent = 'Use my location';
        locateBtn.disabled = false;
      },
      () => {
        addressError.textContent = 'Could not get your location. Allow location access or type the address.';
        locateBtn.textContent = 'Use my location';
        locateBtn.disabled = false;
      }
    );
  });
}

/* ---------- 5. Form validation (report, login, register) ----------
   This is only for quick feedback in the browser.
   The same checks MUST be repeated in PHP, or the form can be bypassed.
------------------------------------------------------------------- */
document.querySelectorAll('form[novalidate]').forEach(form => {
  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      const firstBad = form.querySelector(':invalid');
      if (firstBad) firstBad.focus();
    }
    form.classList.add('was-validated');
  });
});

/* ---------- 6. Matching passwords (register page) ---------- */
const pass = document.getElementById('password');
const confirmPass = document.getElementById('confirmPassword');

if (pass && confirmPass) {
  const check = () => {
    confirmPass.setCustomValidity(
      pass.value === confirmPass.value ? '' : 'Passwords do not match'
    );
  };
  pass.addEventListener('input', check);
  confirmPass.addEventListener('input', check);
}

/* ---------- 7. Search and filter the complaints table (admin page) ---------- */
const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const rows = document.querySelectorAll('#complaintsTable tbody tr');

function filterTable() {
  const term = (searchBox.value || '').toLowerCase();
  const cat = categoryFilter.value;
  const stat = statusFilter.value;
  let shown = 0;

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchesText = text.includes(term);
    const matchesCat = !cat || row.dataset.category === cat;
    const matchesStat = !stat || row.dataset.status === stat;
    const show = matchesText && matchesCat && matchesStat;
    row.style.display = show ? '' : 'none';
    if (show) shown++;
  });

  const empty = document.getElementById('emptyRow');
  if (empty) empty.style.display = shown === 0 ? '' : 'none';
}

if (searchBox && categoryFilter && statusFilter) {
  searchBox.addEventListener('input', filterTable);
  categoryFilter.addEventListener('change', filterTable);
  statusFilter.addEventListener('change', filterTable);
}

/* ---------- 8. Fill the status modal with the clicked row (admin page) ---------- */
document.querySelectorAll('.update-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('modalComplaintId').value = btn.dataset.id;
    document.getElementById('modalComplaintTitle').textContent = btn.dataset.title;
    document.getElementById('modalStatus').value = btn.dataset.status;
  });
});
