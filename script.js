const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_RcjTCeOrRM0qFOm6YOlS6VqE7IOOXlUZf3_8u5JDxD85xSQa6cod58erBn7cnI4qrIJh7CXRVQQQ/pub?gid=0&single=true&output=csv";
async function loadData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();

  const rows = text.split("\n").map(row => row.split(","));
  const headers = rows.shift();

  const container = document.getElementById("scorecard");

  rows.forEach(row => {
    if (!row[0]) return;

    const div = document.createElement("div");
    div.className = "score-block";

    div.innerHTML = `
      <h2 class="score-title">${row[0]}</h2>

      <div class="metric-row">
        <div class="metric-label">KPI:</div>
        <div class="metric-value">${row[1]}</div>
      </div>

      <div class="metric-row">
        <div class="metric-label">Baseline:</div>
        <div class="metric-value">${row[2]}</div>
      </div>

      <div class="metric-row">
        <div class="metric-label">Current:</div>
        <div class="metric-value">${row[3]}</div>
      </div>

      <div class="metric-row">
        <div class="metric-label">Target:</div>
        <div class="metric-value">${row[4]}</div>
      </div>
    `;

    container.appendChild(div);
  });
}

loadData();
