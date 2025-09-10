// ----- State -----
const inputs = {
  projectType: "b2c_saas",
  modules: [],
  userBase: "1k",
  uiComplexity: "standard",
  hosting: "cloud",
  compliance: [],
  integrations: [] // ✅ added new state
};

// Dummy coefficients (replace with real from getSaasCoefficients)
const coefficients = {
  baseCost: 10000,
  projectTypes: {
    b2c_saas: { baseMultiplier: 1.2, baseWeeks: 10 },
    b2b_saas: { baseMultiplier: 1.4, baseWeeks: 12 },
    marketplace: { baseMultiplier: 1.6, baseWeeks: 14 },
    fintech: { baseMultiplier: 1.8, baseWeeks: 16 },
    healthtech: { baseMultiplier: 2.0, baseWeeks: 18 },
    edtech: { baseMultiplier: 1.5, baseWeeks: 12 }
  },
  uiComplexity: {
    simple: { multiplier: 1 },
    standard: { multiplier: 1.2 },
    advanced: { multiplier: 1.5 },
    custom: { multiplier: 2 }
  },
  hosting: {
    cloud: { monthlyBase: 500, scalingFactor: 1 },
    managed: { monthlyBase: 800, scalingFactor: 1.2 },
    "on-premise": { monthlyBase: 1000, scalingFactor: 1.5 }
  },
  userBases: {
    "1k": { infraMultiplier: 1 },
    "10k": { infraMultiplier: 2 },
    "100k": { infraMultiplier: 4 },
    "1m": { infraMultiplier: 6 },
    "10m": { infraMultiplier: 10 }
  }
};

const modulesList = [
  "User Management",
  "Billing & Subscriptions",
  "Analytics Dashboard",
  "API Management",
  "Multi-tenancy",
  "Notifications",
  "File Storage",
  "Real-time Updates",
  "Mobile App",
  "Admin Panel"
];
const complianceList = ["GDPR", "SOC 2", "HIPAA", "ISO 27001", "PCI DSS", "SOX"];
const integrationsList = [ // ✅ added
  "Payment Gateways",
  "CRM Systems",
  "Email Services",
  "SMS/WhatsApp",
  "Social Login",
  "Analytics Tools",
  "Cloud Storage",
  "AI/ML APIs"
];

// Populate checkboxes
const modulesDiv = document.getElementById("modules");
modulesList.forEach(m => {
  const id = m.replace(/\s+/g, "_");
  modulesDiv.innerHTML += `
    <label class="flex items-center space-x-2">
      <input type="checkbox" value="${m}" class="moduleCheckbox">
      <span>${m}</span>
    </label>`;
});

const complianceDiv = document.getElementById("compliance");
complianceList.forEach(c => {
  const id = c.replace(/\s+/g, "_");
  complianceDiv.innerHTML += `
    <label class="flex items-center space-x-2">
      <input type="checkbox" value="${c}" class="complianceCheckbox">
      <span>${c}</span>
    </label>`;
});

// ✅ Populate integrations
const integrationsDiv = document.getElementById("integrations");
integrationsList.forEach(i => {
  const id = i.replace(/\s+/g, "_");
  integrationsDiv.innerHTML += `
    <label class="flex items-center space-x-2">
      <input type="checkbox" value="${i}" class="integrationCheckbox">
      <span>${i}</span>
    </label>`;
});

// Calculation
function calculateCosts() {
  const coeff = coefficients.projectTypes[inputs.projectType];
  let totalDevCost = coefficients.baseCost * coeff.baseMultiplier;
  let weeks = coeff.baseWeeks;

  // add multipliers
  totalDevCost *= coefficients.uiComplexity[inputs.uiComplexity].multiplier;

  const infra =
    coefficients.hosting[inputs.hosting].monthlyBase *
    coefficients.userBases[inputs.userBase].infraMultiplier *
    coefficients.hosting[inputs.hosting].scalingFactor;

  return { totalDevCost, weeks, infra };
}

// Events
document.getElementById("projectType").addEventListener("change", e => inputs.projectType = e.target.value);
document.getElementById("userBase").addEventListener("change", e => inputs.userBase = e.target.value);
document.getElementById("uiComplexity").addEventListener("change", e => inputs.uiComplexity = e.target.value);
document.getElementById("hosting").addEventListener("change", e => inputs.hosting = e.target.value);

document.getElementById("modules").addEventListener("change", e => {
  if (e.target.checked) inputs.modules.push(e.target.value);
  else inputs.modules = inputs.modules.filter(m => m !== e.target.value);
});

document.getElementById("compliance").addEventListener("change", e => {
  if (e.target.checked) inputs.compliance.push(e.target.value);
  else inputs.compliance = inputs.compliance.filter(c => c !== e.target.value);
});

// ✅ Integrations event
document.getElementById("integrations").addEventListener("change", e => {
  if (e.target.checked) inputs.integrations.push(e.target.value);
  else inputs.integrations = inputs.integrations.filter(i => i !== e.target.value);
});

document.getElementById("calculateBtn").addEventListener("click", () => {
  const modules = document.querySelectorAll("#modules input[type='checkbox']:checked");

  if (modules.length === 0) {
    alert("Please select at least one Core Module before calculating.");
    return; // stop calculation
  }

  const { totalDevCost, weeks, infra } = calculateCosts();
  document.getElementById("totalCost").textContent = `$${totalDevCost.toLocaleString()}`;
  document.getElementById("infraCost").textContent = `$${infra}`;
  document.getElementById("timeline").textContent = `${weeks} weeks`;
  document.getElementById("tco1").textContent = `$${(totalDevCost + infra * 12).toLocaleString()}`;
  document.getElementById("tco3").textContent = `$${(totalDevCost + infra * 36).toLocaleString()}`;

  document.getElementById("results").classList.remove("hidden");
});

// Popup handling (same as before)...
const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("closeDialog");
const overlay = document.getElementById("dialogOverlay");
const dialog = document.getElementById("dialogContent");
const form = document.getElementById("leadForm");

// Open popup
openBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  dialog.classList.remove("hidden");
});

// Close popup
function closeDialog() {
  overlay.classList.add("hidden");
  dialog.classList.add("hidden");
}

closeBtn.addEventListener("click", closeDialog);
overlay.addEventListener("click", closeDialog);

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("lead-name").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  const consent = document.getElementById("consent").checked;

  if (!name || !email || !consent) {
    alert("Please fill all fields and accept consent.");
    return;
  }

  // Example: Send data to backend
  console.log({
    name,
    email,
    consent,
    selections: inputs // ✅ now includes integrations
  });

  alert("Form submitted successfully! 🎉");
  closeDialog();
});
