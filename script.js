const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_RcjTCeOrRM0qFOm6YOlS6VqE7IOOXlUZf3_8u5JDxD85xSQa6cod58erBn7cnI4qrIJh7CXRVQQQ/pub?gid=0&single=true&output=csv";

async function loadData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();

  const rows = text.split("\n").map(row => row.split(","));
  const headers = rows.shift(); // First row is header

  const container = document.getElementById("scorecard");

  rows.forEach(row => {
    if (!row[0]) return; // skip blanks

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${row[0]}</h2>
      <div class="metric"><strong>KPI:</strong><span>${row[1]}</span></div>
      <div class="metric"><strong>Baseline:</strong><span>${row[2]}</span></div>
      <div class="metric"><strong>Current:</strong><span>${row[3]}</span></div>
      <div class="metric"><strong>Target:</strong><span>${row[4]}</span></div>
    `;

    container.appendChild(card);
  });
}

loadData();
