(function(){
  const coefficients = {
    projectTypes: {
      mvp: { multiplier: 1, timeline: 8 },
      full_product: { multiplier: 1.8, timeline: 20 },
      enterprise: { multiplier: 3, timeline: 32 }
    },
    complexity: {
      simple: { multiplier: 0.8 },
      moderate: { multiplier: 1 },
      complex: { multiplier: 1.6 },
      enterprise: { multiplier: 2.5 }
    },
    designLevels: {
      basic: { multiplier: 0.9 },
      standard: { multiplier: 1 },
      premium: { multiplier: 1.4 },
      custom: { multiplier: 1.8 }
    },
    stages: {
      idea: { multiplier: 0.9 },
      prototype: { multiplier: 1 },
      development: { multiplier: 1.1 },
      launch: { multiplier: 1.2 }
    },
    platforms: {
      ios: { cost: 15000 },
      android: { cost: 15000 },
      web: { cost: 12000 },
      desktop: { cost: 10000 }
    },
    features: {
      user_auth: { cost: 5000 },
      payment: { cost: 7000 },
      admin_panel: { cost: 8000 },
      api_integration: { cost: 6000 },
      real_time: { cost: 12000 },
      analytics: { cost: 4000 },
      notifications: { cost: 3000 },
      search: { cost: 3500 }
    },
    integrations: {
      crm: { cost: 3000 },
      erp: { cost: 8000 },
      payment_gateway: { cost: 2000 },
      social_media: { cost: 1000 },
      analytics_tools: { cost: 1500 },
      email_service: { cost: 800 }
    }
  };
  const qs = (sel, ctx=document) => Array.from((ctx||document).querySelectorAll(sel));
  const $ = (sel) => document.querySelector(sel);
  function getCheckedValues(groupName) {
    return qs(`input[data-group=\"${groupName}\"]`).filter(i=>i.checked).map(i=>i.value);
  }
  function getInputs() {
    return {
      projectType: $('#projectType').value,
      platforms: getCheckedValues('platform'),
      stage: $('#stage').value,
      complexity: $('#complexity').value,
      features: getCheckedValues('feature'),
      integrations: getCheckedValues('integration'),
      designLevel: $('#designLevel').value,
      timeline: $('#timeline').value
    };
  }

  function calculateCost(inputs, isPreview=false){
    if(!inputs.projectType || !inputs.complexity || !inputs.designLevel) return {minCost:0,maxCost:0,timeline:0,breakdown:[],phases:[]};

    const projectType = coefficients.projectTypes[inputs.projectType]||{multiplier:1,timeline:12};
    const complexity = coefficients.complexity[inputs.complexity]||{multiplier:1};
    const design = coefficients.designLevels[inputs.designLevel]||{multiplier:1};
    const stage = coefficients.stages[inputs.stage]||{multiplier:1};

    let baseCost = 50000 * projectType.multiplier * complexity.multiplier * design.multiplier * stage.multiplier;

    let platformCost = 0; inputs.platforms.forEach(p=>{ const d = coefficients.platforms[p]; if(d) platformCost += d.cost; });
    let featureCost = 0; inputs.features.forEach(f=>{ const d = coefficients.features[f]; if(d) featureCost += d.cost; });
    let integrationCost = 0; inputs.integrations.forEach(i=>{ const d = coefficients.integrations[i]; if(d) integrationCost += d.cost; });

    const totalCost = Math.round(baseCost + platformCost + featureCost + integrationCost);
    const timeline = projectType.timeline;

    if(isPreview) return {minCost: Math.round(totalCost*0.8), maxCost: Math.round(totalCost*1.3), timeline, breakdown:[], phases:[] };

    const breakdown = [
      {name: 'Base Development', value: Math.round(baseCost)},
      {name: 'Platform Development', value: platformCost},
      {name: 'Features', value: featureCost},
      {name: 'Integrations', value: integrationCost}
    ].filter(it=>it.value>0);

    const phases = [
      {name: 'Discovery & Planning', percentage:15, cost: Math.round(totalCost*0.15)},
      {name: 'Design & Prototyping', percentage:25, cost: Math.round(totalCost*0.25)},
      {name: 'Development', percentage:45, cost: Math.round(totalCost*0.45)},
      {name: 'Testing & Launch', percentage:15, cost: Math.round(totalCost*0.15)}
    ];

    return {minCost: totalCost, maxCost: totalCost, timeline, breakdown, phases};
  }
  const getPreviewBtn = $('#getPreview');
  const getFullEstimateBtn = $('#getFullEstimate');
  const previewCard = $('#previewCard');
  const initialCard = $('#initialCard');
  const leadModal = $('#leadModal');
  const unlockSubmit = $('#unlockSubmit');
  const closeModal = $('#closeModal');
  const previewCost = $('#costRange');
  const timelineText = $('#timelineText');
  const totalInvestment = $('#totalInvestment');
  const totalTimeline = $('#totalTimeline');
  const breakdownList = $('#breakdownList');
  const phasesList = $('#phasesList');
  const fullResultsCard = $('#fullResultsCard');
  const requestProfiles = $('#requestProfiles');
  const resetUnlock = $('#resetUnlock');
  function checkFormValidity(){
  const inputs = getInputs();
  const valid = inputs.projectType 
             && inputs.platforms.length > 0 
             && inputs.stage 
             && inputs.complexity 
             && inputs.designLevel;  // ✅ now required
  getPreviewBtn.disabled = !valid;
  }
  qs('select').forEach(s=> s.addEventListener('change', checkFormValidity));
  qs('input[type=checkbox]').forEach(c=> c.addEventListener('change', checkFormValidity));
  getPreviewBtn.addEventListener('click', ()=>{
    const inputs = getInputs();
    const costData = calculateCost(inputs, true);
    previewCost.textContent = `$${costData.minCost.toLocaleString()} - $${costData.maxCost.toLocaleString()}`;
    timelineText.textContent = `Timeline: ~${costData.timeline} weeks`;
    initialCard.classList.add('hidden');
    previewCard.classList.remove('hidden');
  });
  getFullEstimateBtn.addEventListener('click', ()=>{
    const token = localStorage.getItem('startup_unlocked');
    if(token){ showFullResults(); return; }
    leadModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', ()=>{ leadModal.classList.add('hidden'); document.body.style.overflow=''; });
  unlockSubmit.addEventListener('click', ()=>{
    const name = $('#leadName').value.trim();
    const email = $('#leadEmail').value.trim();
    const consent = $('#leadConsent').checked;
    if(!name || !email){ alert('Please provide name and email'); return; }

    const inputs = getInputs();
    const costData = calculateCost(inputs, false);
    const insights = {
      recommendations: [
        { category: 'Product', priority: 'high', recommendation: 'Start with core MVP features', impact: 'High', timeline: '0-3 months', cost_implication: 'Low' }
      ],
      strategic_framework: {
        business_case: 'Validate product-market fit quickly with an MVP',
        risk_factors: ['Unclear user need', 'Underestimating engineering effort'],
        success_metrics: ['Activation rate', 'Retention']
      },
      competitive_analysis: { market_position: 'Niche', competitive_moats: ['Domain expertise'], time_to_market_importance: 'High' }
    };

    const report = {
      title: 'Startup Development Cost Estimate',
      name, email, inputs, results: costData, insights, generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `startup-estimate-${name.replace(/\s+/g,'-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    localStorage.setItem('startup_unlocked', btoa(email + '|' + Date.now()));

    leadModal.classList.add('hidden'); document.body.style.overflow='';
    showFullResults();
    alert('Full estimate unlocked and report downloaded.');
  });

  function showFullResults(){
    const inputs = getInputs();
    const costData = calculateCost(inputs, false);
    totalInvestment.textContent = `$${costData.minCost.toLocaleString()}`;
    totalTimeline.textContent = `${costData.timeline} weeks`;

    breakdownList.innerHTML = costData.breakdown.map(b=>`<li class=\"flex justify-between\"><span>${b.name}</span><span>$${b.value.toLocaleString()}</span></li>`).join('');
    phasesList.innerHTML = costData.phases.map(p=>`<li class=\"flex justify-between\"><span>${p.name} <small class=\"text-xs text-slate-500\">(${p.percentage}%)</small></span><strong>$${p.cost.toLocaleString()}</strong></li>`).join('');

    previewCard.classList.add('hidden');
    initialCard.classList.add('hidden');
    fullResultsCard.classList.remove('hidden');
  }

  requestProfiles.addEventListener('click', ()=>{
    window.open('mailto:business@valuecoders.com?subject=Request for Sample Developer Profiles&body=Hi, I would like to request 3 sample developer profiles for my startup project.','_blank');
  });

  resetUnlock.addEventListener('click', ()=>{
    localStorage.removeItem('startup_unlocked');
    fullResultsCard.classList.add('hidden');
    initialCard.classList.remove('hidden');
    alert('Unlock reset. Fill form and unlock again.');
  });

  if(localStorage.getItem('startup_unlocked')){
    // do nothing until user fills form and clicks preview/get full
  }

})();


document.addEventListener("DOMContentLoaded", () => {
  const getPreviewBtn = document.getElementById("getPreview");
  const resultsPopup = document.getElementById("resultsPopup");
  const closeResults = document.getElementById("closeResults");

  if (getPreviewBtn && resultsPopup) {
    getPreviewBtn.addEventListener("click", () => {
      resultsPopup.classList.remove("hidden");
    });
  }

  if (closeResults && resultsPopup) {
    closeResults.addEventListener("click", () => {
      resultsPopup.classList.add("hidden");
    });
  }

  // Close popup when clicking overlay
  const overlays = document.querySelectorAll(".modal-overlay");
  overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
      if (resultsPopup) {
        resultsPopup.classList.add("hidden");
      }
    });
  });
});