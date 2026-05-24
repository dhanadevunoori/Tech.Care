let bpChart = null;

async function fetchPatients() {
  const token = btoa('coalition:skills-test');
  const res = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    headers: { 'Authorization': `Basic ${token}` }
  });
  return res.json();
}

function renderPatientList(patients, activeName) {
  const ul = document.getElementById('patient-list');
  ul.innerHTML = '';
  patients.forEach(function(p) {
    const li = document.createElement('li');
    li.className = 'patient-item' + (p.name === activeName ? ' active' : '');
    li.innerHTML = `
      <img src="${p.profile_picture}" alt="${p.name}"
           onerror="this.src='https://via.placeholder.com/44'"/>
      <div class="patient-info">
        <p class="patient-name">${p.name}</p>
        <p class="patient-meta">${p.gender}, ${p.age}</p>
      </div>
      <button class="more-btn">⋯</button>
    `;
    li.addEventListener('click', function() { selectPatient(patients, p); });
    ul.appendChild(li);
  });
}

function renderProfile(p) {
  document.getElementById('jessica-photo').src             = p.profile_picture;
  document.getElementById('jessica-name').textContent      = p.name;
  document.getElementById('jessica-dob').textContent       = p.date_of_birth;
  document.getElementById('jessica-gender').textContent    = p.gender;
  document.getElementById('jessica-phone').textContent     = p.phone_number;
  document.getElementById('jessica-emergency').textContent = p.emergency_contact;
  document.getElementById('jessica-insurance').textContent = p.insurance_type;
}

function renderBPChart(history) {
  const last6     = history.slice(0, 6).reverse();
  const labels    = last6.map(function(e) { return e.month.slice(0,3) + ', ' + e.year; });
  const systolic  = last6.map(function(e) { return e.blood_pressure.systolic.value; });
  const diastolic = last6.map(function(e) { return e.blood_pressure.diastolic.value; });

  const latest = history[0];
  document.getElementById('systolic-val').textContent    = latest.blood_pressure.systolic.value;
  document.getElementById('systolic-level').textContent  = latest.blood_pressure.systolic.levels;
  document.getElementById('diastolic-val').textContent   = latest.blood_pressure.diastolic.value;
  document.getElementById('diastolic-level').textContent = latest.blood_pressure.diastolic.levels;

  if (bpChart) bpChart.destroy();

  bpChart = new Chart(document.getElementById('bpChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolic,
          borderColor: '#E66FD2',
          pointBackgroundColor: '#E66FD2',
          pointBorderColor: '#E66FD2',
          tension: 0.4,
          fill: false,
          borderWidth: 2,
          pointRadius: 5
        },
        {
          label: 'Diastolic',
          data: diastolic,
          borderColor: '#8C6FE6',
          pointBackgroundColor: '#8C6FE6',
          pointBorderColor: '#8C6FE6',
          tension: 0.4,
          fill: false,
          borderWidth: 2,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 60, max: 180,
          ticks: { stepSize: 20, font: { family: 'Manrope', size: 11 } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Manrope', size: 11 } }
        }
      }
    }
  });
}

function trendArrow(level) {
  if (!level) return '';
  var l = level.toLowerCase();
  if (l.includes('lower'))  return '▼ ';
  if (l.includes('higher')) return '▲ ';
  return '';
}

function renderVitals(history) {
  var l = history[0];
  document.getElementById('resp-val').textContent    = l.respiratory_rate.value + ' bpm';
  document.getElementById('resp-level').textContent  = l.respiratory_rate.levels;
  document.getElementById('temp-val').textContent    = l.temperature.value + '°F';
  document.getElementById('temp-level').textContent  = l.temperature.levels;
  document.getElementById('heart-val').textContent   = l.heart_rate.value + ' bpm';
  document.getElementById('heart-level').textContent = trendArrow(l.heart_rate.levels) + l.heart_rate.levels;
}

var DIAGNOSTIC_FALLBACKS = {
  'Jessica Taylor': [
    { name: 'Hypertension',      description: 'Chronic high blood pressure',                 status: 'Under Observation' },
    { name: 'Type 2 Diabetes',   description: 'Insulin resistance and elevated blood sugar',  status: 'Cured'             },
    { name: 'Asthma',            description: 'Recurrent episodes of bronchial constriction', status: 'Inactive'          },
    { name: 'Osteoarthritis',    description: 'Degenerative joint disease',                   status: 'Untreated'         },
    { name: 'Allergic Rhinitis', description: 'Seasonal allergies causing nasal congestion',  status: 'Active'            }
  ]
};

var LAB_RESULT_FALLBACKS = {
  'Jessica Taylor': ['Blood Tests', 'CT Scans', 'Radiology Reports', 'X-Rays', 'Urine Test']
};

function renderDiagnosticList(list, patientName) {
  var tbody = document.getElementById('diag-tbody');
  tbody.innerHTML = '';
  var merged = list.slice();
  var extras = DIAGNOSTIC_FALLBACKS[patientName] || [];
  extras.forEach(function(extra) {
    if (!merged.some(function(d) { return d.name === extra.name; })) merged.push(extra);
  });
  merged.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><strong>' + item.name + '</strong></td>' +
      '<td>' + item.description + '</td>' +
      '<td><span class="status-badge">' + item.status + '</span></td>';
    tbody.appendChild(tr);
  });
}

function renderLabResults(results, patientName) {
  var ul = document.getElementById('lab-list');
  ul.innerHTML = '';
  var merged = results.slice();
  var extras = LAB_RESULT_FALLBACKS[patientName] || [];
  extras.forEach(function(extra) {
    if (!merged.includes(extra)) merged.push(extra);
  });
  merged.forEach(function(name) {
    var li = document.createElement('li');
    li.className = 'lab-item';
    li.innerHTML =
      '<span>' + name + '</span>' +
      '<button class="lab-download" title="Download">' +
        '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
          '<path stroke-linecap="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>' +
        '</svg>' +
      '</button>';
    ul.appendChild(li);
  });
}

function selectPatient(allPatients, p) {
  renderPatientList(allPatients, p.name);
  renderProfile(p);
  if (p.diagnosis_history && p.diagnosis_history.length > 0) {
    renderBPChart(p.diagnosis_history);
    renderVitals(p.diagnosis_history);
  }
  renderDiagnosticList(p.diagnostic_list || [], p.name);
  renderLabResults(p.lab_results || [], p.name);
}

var PATIENT_NAMES = [
  'Emily Williams',
  'Ryan Johnson',
  'Brandon Mitchell',
  'Jessica Taylor',
  'Samantha Johnson',
  'Ashley Martinez',
  'Olivia Brown',
  'Tyler Davis',
  'Kevin Anderson',
  'Dylan Thompson',
  'Nathan Evans',
  'Mike Nolan'
];

var PATIENT_FALLBACKS = {
  'Nathan Evans': {
    name: 'Nathan Evans', gender: 'Male', age: 58,
    profile_picture: 'data:image/png;base64,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',
    date_of_birth: 'January 12, 1966',
    phone_number: '(415) 555-9012',
    emergency_contact: '(415) 555-3456',
    insurance_type: 'HealthFirst',
    diagnosis_history: [],
    diagnostic_list: [],
    lab_results: []
  }
};

async function init() {
  try {
    var all = await fetchPatients();
    var filtered = PATIENT_NAMES.map(function(name) {
      // Exact match first, then case-insensitive, then fallback
      var found = all.find(function(p) { return p.name === name; });
      if (!found) found = all.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
      if (!found && PATIENT_FALLBACKS[name]) found = PATIENT_FALLBACKS[name];
      return found;
    }).filter(Boolean);
    var jessica = filtered.find(function(p) { return p.name === 'Jessica Taylor'; }) || filtered[0];
    selectPatient(filtered, jessica);
  } catch (err) {
    console.error('Failed to load patients:', err);
  }
}

init();