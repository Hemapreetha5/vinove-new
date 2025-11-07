// --- Calculator ---
const calcBtn = document.getElementById("calculateBtn");
const resultsCard = document.getElementById("resultsCard");


calcBtn.addEventListener("click", () => {
  const cost = parseFloat(document.getElementById("projectCost").value) || 0;
  const timeSavings = parseFloat(document.getElementById("timeSavings").value) || 0;
  const hourlyCost = parseFloat(document.getElementById("hourlyCost").value) || 0;
  const employeeCount = parseInt(document.getElementById("employeeCount").value) || 0;
  const addedRevenue = parseFloat(document.getElementById("addedRevenue").value) || 0;
  const duration = parseInt(document.getElementById("durationMonths").value) || 12;

  // --- Calculations ---
  const monthlySavings = (timeSavings * hourlyCost * employeeCount) * 4; // ~4 weeks/month
  const monthlyRevenue = addedRevenue / 12;
  const totalMonthlyBenefit = monthlySavings + monthlyRevenue;
  const totalBenefit = totalMonthlyBenefit * duration;
  const netGain = totalBenefit - cost;
  const roiPercent = ((totalBenefit - cost) / cost) * 100;
  const paybackMonths = cost / totalMonthlyBenefit;

  const breakEvenDate = new Date();
  breakEvenDate.setMonth(breakEvenDate.getMonth() + Math.ceil(paybackMonths));

  // --- Update DOM ---
  document.getElementById("roiPercentage").textContent = roiPercent.toFixed(1) + "%";
  document.getElementById("netGain").textContent = "$" + netGain.toLocaleString();
  document.getElementById("paybackMonths").textContent = paybackMonths.toFixed(1) + " months";
  document.getElementById("monthlySavings").textContent = "$" + monthlySavings.toLocaleString();
  document.getElementById("totalBenefit").textContent = "$" + totalBenefit.toLocaleString();
  document.getElementById("breakEvenDate").textContent =
    breakEvenDate.toLocaleString("default", { month: "short", year: "numeric" });

  resultsCard.classList.remove("hidden");
});

// --- Modal ---
const unlockBtn = document.getElementById("unlockBtn");
const dialogOverlay = document.getElementById("dialogOverlay");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

// Open modal
unlockBtn.addEventListener("click", () => {
  dialogOverlay.classList.remove("hidden");
});

// Close modal on close button
closeDialog.addEventListener("click", () => {
  dialogOverlay.classList.add("hidden");
});

// Close modal if click outside dialog content
dialogOverlay.addEventListener("click", (e) => {
  if (!dialogContent.contains(e.target)) {
    dialogOverlay.classList.add("hidden");
  }
});

// --- Lead Form Submit ---
document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("lead-name").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  const consent = document.getElementById("consent").checked;

  if (!name || !email || !consent) {
    alert("Please fill all fields and accept consent.");
    return;
  }

  // You can also attach the ROI data here for email/PDF
  alert("Form submitted! PDF will be generated (mock).");
  overlay.classList.add("hidden");
  dialog.classList.add("hidden");
});


document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calculateBtn");
const resultsCard = document.getElementById("resultsCard");
const resultsContent = document.getElementById("resultsContent");
const closeResults = document.getElementById("closeResults");

calcBtn.addEventListener("click", () => {
  // calculations here...
  resultsCard.classList.remove("hidden");
});

// Close Results Modal
closeResults.addEventListener("click", () => {
  resultsCard.classList.add("hidden");
});

// Close if click outside
resultsCard.addEventListener("click", (e) => {
  if (!resultsContent.contains(e.target)) {
    resultsCard.classList.add("hidden");
  }
});


// --- Lead Form Modal ---
const unlockBtn = document.getElementById("unlockBtn");
const dialogOverlay = document.getElementById("dialogOverlay");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

unlockBtn.addEventListener("click", () => {
  dialogOverlay.classList.remove("hidden");
});

// Close Lead Form Modal
closeDialog.addEventListener("click", () => {
  dialogOverlay.classList.add("hidden");
});

dialogOverlay.addEventListener("click", (e) => {
  if (!dialogContent.contains(e.target)) {
    dialogOverlay.classList.add("hidden");
  }
});

});