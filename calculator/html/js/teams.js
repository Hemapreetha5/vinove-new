    const rolesList = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "QA Engineer", "UI/UX Designer", "Product Manager", "Tech Lead"];
    const certList = ["AWS Certified", "Google Cloud", "Azure Certified", "Kubernetes", "Scrum Master", "PMP"];

    const coefficients = {
      roles: {
        frontend_developer: { monthly: 3000 },
        backend_developer: { monthly: 3500 },
        fullstack_developer: { monthly: 4000 },
        devops_engineer: { monthly: 4500 },
        qa_engineer: { monthly: 2800 },
        ui_ux_designer: { monthly: 3200 },
        project_manager: { monthly: 5000 },
      },
      seniority: {
        junior: { multiplier: 0.8 },
        mid: { multiplier: 1 },
        senior: { multiplier: 1.5 },
      },
      locations: {
        india: { multiplier: 1 },
        eastern_europe: { multiplier: 1.5 },
        latin_america: { multiplier: 1.3 },
      },
      certifications: {
        aws: { premium: 0.1 },
        google_cloud: { premium: 0.1 },
        azure: { premium: 0.1 },
        kubernetes: { premium: 0.1 },
        scrum: { premium: 0.05 },
        pmp: { premium: 0.05 },
      },
      timeZones: {
        no_overlap: { premium: 0 },
        partial_overlap: { premium: 0.05 },
        full_overlap: { premium: 0.1 },
      },
      billing: {
        monthly: { discount: 0 },
        quarterly: { discount: 0.02 },
        yearly: { discount: 0.05 },
      }
    };

    const inputs = {
      roles: [],
      seniority: 'mid',
      fteCount: 3,
      duration: 6,
      location: 'india',
      billing: 'monthly',
      certifications: [],
      tzOverlap: 'partial_overlap'
    };

    const rolesContainer = document.getElementById('roles-container');
    rolesList.forEach(role => {
      const div = document.createElement('div');
      div.className = "flex items-center space-x-2";
      div.innerHTML = `
        <input type="checkbox" id="${role}" class="checkbox">
        <label for="${role}" class="text-sm">${role}</label>
      `;
      rolesContainer.appendChild(div);

      div.querySelector('input').addEventListener('change', (e) => {
        if(e.target.checked) inputs.roles.push(role);
        else inputs.roles = inputs.roles.filter(r => r !== role);
      });
    });

    const certContainer = document.getElementById('certifications-container');
    certList.forEach(cert => {
      const div = document.createElement('div');
      div.className = "flex items-center space-x-2";
      div.innerHTML = `
        <input type="checkbox" id="${cert}" class="checkbox">
        <label for="${cert}" class="text-sm">${cert}</label>
      `;
      certContainer.appendChild(div);

      div.querySelector('input').addEventListener('change', (e) => {
        if(e.target.checked) inputs.certifications.push(cert);
        else inputs.certifications = inputs.certifications.filter(c => c !== cert);
      });
    });

    document.getElementById('seniority').addEventListener('change', e => inputs.seniority = e.target.value);
    document.getElementById('location').addEventListener('change', e => inputs.location = e.target.value);
    document.getElementById('billing').addEventListener('change', e => inputs.billing = e.target.value);
    document.getElementById('tzOverlap').addEventListener('change', e => inputs.tzOverlap = e.target.value);
    document.getElementById('fteCount').addEventListener('input', e => inputs.fteCount = parseInt(e.target.value) || 1);
    document.getElementById('duration').addEventListener('input', e => inputs.duration = parseInt(e.target.value) || 1);

function calculateCosts() {
  if(inputs.roles.length === 0) return { monthlyEstimate:0, projectCost:0, blendedRate:0 };

  let totalMonthlyCost = 0;

  const roleMapping = {
    "Frontend Developer": "frontend_developer",
    "Backend Developer": "backend_developer",
    "Full Stack Developer": "fullstack_developer",
    "DevOps Engineer": "devops_engineer",
    "QA Engineer": "qa_engineer",
    "UI/UX Designer": "ui_ux_designer",
    "Product Manager": "project_manager",
    "Tech Lead": "project_manager"
  };

  inputs.roles.forEach(roleKey => {
    const mappedRole = roleMapping[roleKey];
    if(!mappedRole || !coefficients.roles[mappedRole]) return;

    let roleCost = coefficients.roles[mappedRole].monthly;

    roleCost *= coefficients.seniority[inputs.seniority]?.multiplier || 1;
    roleCost *= coefficients.locations[inputs.location]?.multiplier || 1;

    const certMap = {
      "AWS Certified":"aws",
      "Google Cloud":"google_cloud",
      "Azure Certified":"azure",
      "Kubernetes":"kubernetes",
      "Scrum Master":"scrum",
      "PMP":"pmp"
    };
    inputs.certifications.forEach(cert => {
      const mappedCert = certMap[cert];
      if(mappedCert && coefficients.certifications[mappedCert]) {
        roleCost *= (1 + coefficients.certifications[mappedCert].premium);
      }
    });

    roleCost *= (1 + coefficients.timeZones[inputs.tzOverlap]?.premium || 0);

    totalMonthlyCost += roleCost;
  });

  totalMonthlyCost *= (1 - (coefficients.billing[inputs.billing]?.discount || 0));

  const avgRolesCost = totalMonthlyCost / inputs.roles.length;
  const monthlyEstimate = avgRolesCost * inputs.fteCount;
  const projectCost = monthlyEstimate * inputs.duration;
  const blendedRate = monthlyEstimate / inputs.fteCount / 160;

  return { monthlyEstimate, projectCost, blendedRate };
}

    document.getElementById('calculateBtn').addEventListener('click', () => {
      if(inputs.roles.length === 0){
        alert("Please select at least one role");
        return;
      }
      const { monthlyEstimate, projectCost, blendedRate } = calculateCosts();

      document.getElementById('monthlyEstimate').textContent = `$${monthlyEstimate.toLocaleString()}/month`;
      document.getElementById('projectCost').textContent = `$${projectCost.toLocaleString()} total project cost`;
      document.getElementById('blendedRate').textContent = `Blended rate: $${blendedRate.toFixed(0)}/hour`;

      document.getElementById('results').classList.remove('hidden');
    });
const inputsVal = { fteCount: 3, duration: 6 }; 

  document.getElementById('team-size-value').innerText = `${inputsVal.fteCount} FTEs`;
  document.getElementById('duration-value').innerText = `${inputsVal.duration} months`;


  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('leadModal');

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  const leadData = { name: '', email: '', consent: false };
  const nameInput = document.getElementById('lead-name');
  const emailInput = document.getElementById('lead-email');
  const consentInput = document.getElementById('consent');
  const submitBtn = document.getElementById('submitLeadBtn');

  nameInput.addEventListener('input', (e) => leadData.name = e.target.value);
  emailInput.addEventListener('input', (e) => leadData.email = e.target.value);
  consentInput.addEventListener('change', (e) => leadData.consent = e.target.checked);

  submitBtn.addEventListener('click', () => {
    if (!leadData.name || !leadData.email || !leadData.consent) {
      alert("Please fill all fields and give consent.");
      return;
    }
    console.log("Lead Data Submitted:", leadData);
    alert("Thank you! Your estimate will be sent shortly.");
    modal.classList.add('hidden');
  });