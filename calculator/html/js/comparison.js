// Roles list
const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Tech Lead"
];

// Render roles
const rolesContainer = document.getElementById("rolesContainer");
roles.forEach(role => {
  const div = document.createElement("div");
  div.className = "flex items-center space-x-2";
  div.innerHTML = `
    <input type="checkbox" value="${role}" class="roleCheckbox" id="${role}">
    <label for="${role}" class="text-sm">${role}</label>
  `;
  rolesContainer.appendChild(div);
});

// Button click handler
document.getElementById("compareBtn").addEventListener("click", () => {
  const teamSize = parseInt(document.getElementById("teamSize").value) || 1;
  const duration = parseInt(document.getElementById("duration").value) || 3;
  const comparator = document.getElementById("comparator").value;

  const selectedRoles = [...document.querySelectorAll(".roleCheckbox:checked")].map(cb => cb.value);

  if (selectedRoles.length === 0) {
    alert("Please select at least one role.");
    return;
  }

  // Dummy calculations
  const baseCost = selectedRoles.length * 1000;
  const vcCost = baseCost * teamSize * duration;
  const compCost = vcCost * 1.6; // competitor higher
  const savings = compCost - vcCost;
  const savingsPct = Math.round((savings / compCost) * 100);

  // Dummy start times
  const vcStartTime = "2 weeks";
  const comparatorStartTime = "3 weeks";

  // Fill content
  document.getElementById("resultsContent").innerHTML = `
    <div class="space-y-4">
      <!-- Savings -->
      <div class="text-center bg-blue-50 p-6 rounded-lg relative z-0">
      <div class="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10"></div>
        <p class="text-3xl font-bold text-center">${savingsPct}% Savings</p>
        <p class="text-lg text-center text-gray-600">Save $${savings.toLocaleString()}</p>
        <p class="text-lg text-center text-gray-600">vs ${comparator.replace("_"," ")}</p>
      </div>

      <!-- ValueCoders -->
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium flex items-center gap-2">
            <svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3z"/>
            </svg>
            ValueCoders
          </span>
          <span class="font-bold">$${vcCost.toLocaleString()}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Time to start:</span>
          <span>${vcStartTime}</span>
        </div>
      </div>

      <!-- Comparator -->
      <div class="p-4 bg-gray-100 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium flex items-center gap-2">
            <svg class="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            ${comparator}
          </span>
          <span class="font-bold">$${compCost.toLocaleString()}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Time to start:</span>
          <span>${comparatorStartTime}</span>
        </div>
      </div>

      <!-- Monthly Savings -->
      <div class="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
        <span class="text-sm flex items-center gap-2">
          <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3z"/>
          </svg>
          Monthly Savings:
        </span>
        <span class="font-medium text-green-600">$${(savings / duration).toLocaleString()}</span>
      </div>
    </div>
  `;

  // Show results card
  document.getElementById("resultsCard").classList.remove("hidden");
});

// Detailed button handler
// Get popup elements
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");

// Show popup when "Get Detailed Comparison" is clicked
document.getElementById("detailedBtn").addEventListener("click", () => {
  popupOverlay.classList.remove("hidden");
});

// Close popup when close button is clicked
closePopup.addEventListener("click", () => {
  popupOverlay.classList.add("hidden");
});

// Close popup when clicking outside the popup content
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.add("hidden");
  }
});
