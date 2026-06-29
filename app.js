// Global Application State Core
const state = {
  currentUser: null, // Holds logged-in user profile
  activeView: 'student-dashboard',
  selectedOpportunityId: null,
  activeModalTab: 'about',
  activeHostTab: 'ongoing',
  rsvps: [], // Registered opportunity IDs
  opportunities: [
    {
      id: 'opp-1',
      title: "Innerve'26: National Hackathon",
      society: "ACM IGDTUW Student Chapter",
      category: "Hackathon",
      timeline: "36 Hours",
      dates: "Oct 12, 2026",
      prizes: "₹1,50,000 Cash Pool & Swags",
      about: "Innerve is the annual tech fest of IGDTUW! Our national hackathon pushes boundaries in AI, Blockchain, Web3, and Open Source. Join 500+ developers for a grueling 36 hours of code, food, and innovation. Elite mentorship provided by Microsoft, Google and top MNCs.",
      contactEmail: "innerve.acm@igdtuw.ac.in",
      restrictIGDTUWOnly: true,
      registrations: 382,
      trending: true,
      winners: "",
      status: 'ongoing' // past, ongoing, future
    },
    {
      id: 'opp-2',
      title: "Hypnotics Dance Face-Off",
      society: "Hypnotics Dance Society",
      category: "Cultural Performance",
      timeline: "4 Hours, Arena Hall",
      dates: "Nov 01, 2026",
      prizes: "₹25,000 + Winner Trophy",
      about: "Lace up your sneakers! Hypnotics is back with the state-wide collegiate dance battles. Represent your institute in our Solo or Group faceoff categories. Guest judges from industry choreographers will evaluate technique, flow, and stage presence.",
      contactEmail: "hypnotics.dance@igdtuw.ac.in",
      restrictIGDTUWOnly: false,
      registrations: 194,
      trending: true,
      winners: "",
      status: 'ongoing'
    },
    {
      id: 'opp-3',
      title: "IEEE Women in Tech coding challenge",
      society: "IEEE IGDTUW Student Branch",
      category: "Coding Trial",
      timeline: "3 Hours, Virtual Labs",
      dates: "Oct 20, 2026",
      prizes: "₹50,000 + Internship vouchers",
      about: "Celebrate women in computing with IEEE! A highly competitive algorithms trial containing optimization problems, mathematical constraints, and interactive coding patterns. Fully automated evaluation on mock test suites.",
      contactEmail: "ieee.board@igdtuw.ac.in",
      restrictIGDTUWOnly: true,
      registrations: 284,
      trending: true,
      winners: "",
      status: 'ongoing'
    },
    {
      id: 'opp-4',
      title: "Inception Fine Arts Marathon",
      society: "Inception Art Society",
      category: "Creative Contest",
      timeline: "1 Day, Audi lobby",
      dates: "Oct 30, 2026",
      prizes: "₹15,000 Painting Supplies",
      about: "Showcase your brush strokes. Express your creativity on canvas or virtual sketchboards in our themed canvas sprint. Theme: Women Tech Frontiers.",
      contactEmail: "inception.arts@igdtuw.ac.in",
      restrictIGDTUWOnly: false,
      registrations: 84,
      trending: false,
      winners: "",
      status: 'ongoing'
    },
    {
      id: 'opp-5',
      title: "Bhavya Drama Stage Play trial",
      society: "Bhavya Dramatics Society",
      category: "Cultural Performance",
      timeline: "3 Hours, Seminar Hall",
      dates: "Nov 05, 2026",
      prizes: "Certificates & Curated Goodies",
      about: "Auditions for the next multi-city street play. Test your emotions, dialogue delivery, projection, and acting stamina with Bhavya's mentors.",
      contactEmail: "bhavya.drama@igdtuw.ac.in",
      restrictIGDTUWOnly: true,
      registrations: 62,
      trending: false,
      winners: "",
      status: 'ongoing'
    },
    {
      id: 'opp-6',
      title: "Tarannum Melody & Classical Singing",
      society: "Tarannum Music Society",
      category: "Cultural Performance",
      timeline: "4 Hours",
      dates: "Jul 15, 2026",
      prizes: "₹10,000 Cash Prize",
      about: "Annual solo classical vocal tournament. Find the sweetest vocal chord inside IGDTUW.",
      contactEmail: "tarannum.singing@igdtuw.ac.in",
      restrictIGDTUWOnly: false,
      registrations: 110,
      trending: false,
      winners: "Pragati Verma (IT-2nd Yr)",
      status: 'past'
    },
    {
      id: 'opp-7',
      title: "Summer Web3 Dev Camp (Upcoming)",
      society: "Lean In IGDTUW Circle",
      category: "Coding Trial",
      timeline: "1 Week, Online Hubs",
      dates: "Dec 10, 2026",
      prizes: "Crypto Grants & Badges",
      about: "Get hand-holding into smart contract design, solidity arrays, and interactive dapps. Curated by industry developers from Polygon.",
      contactEmail: "leanin.chapter@igdtuw.ac.in",
      restrictIGDTUWOnly: true,
      registrations: 0,
      trending: false,
      winners: "",
      status: 'future'
    }
  ]
};

// Routing System between Views
window.switchView = function(viewName) {
  // Deactivate all views
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
  
  // Remove navigation active styles
  document.getElementById('btn-nav-student').classList.remove('active');
  document.getElementById('btn-nav-host').classList.remove('active');

  // Setup Target Active View
  state.activeView = viewName;
  const targetEl = document.getElementById('view-' + viewName);
  if (targetEl) {
    targetEl.classList.add('active');
  }

  // Sync Navigation Buttons styles
  if (viewName === 'student-dashboard') {
    document.getElementById('btn-nav-student').classList.add('active');
  } else if (viewName === 'host-dashboard') {
    document.getElementById('btn-nav-host').classList.add('active');
  }

  // Smooth scroll back to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Auth forms switching UI toggle
window.toggleAuthForm = function(formType) {
  document.getElementById('auth-tab-student').classList.remove('active');
  document.getElementById('auth-tab-host').classList.remove('active');
  document.getElementById('student-signup-form').style.display = 'none';
  document.getElementById('host-signup-form').style.display = 'none';

  if (formType === 'student') {
    document.getElementById('auth-tab-student').classList.add('active');
    document.getElementById('student-signup-form').style.display = 'block';
  } else {
    document.getElementById('auth-tab-host').classList.add('active');
    document.getElementById('host-signup-form').style.display = 'block';
  }
}

// Modal view tab switching
window.switchModalTab = function(tabName) {
  state.activeModalTab = tabName;
  document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.modal-tab-content').forEach(content => content.classList.remove('active'));

  document.getElementById('modal-tab-' + tabName).classList.add('active');
  document.getElementById('modal-content-' + tabName).classList.add('active');
}

// Host dashboard tabs switching
window.switchHostTab = function(tabName) {
  state.activeHostTab = tabName;
  document.querySelectorAll('.host-tab-nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.host-events-tab-content').forEach(content => content.style.display = 'none');

  document.getElementById('host-tab-' + tabName).classList.add('active');
  document.getElementById('host-list-' + tabName).style.display = 'block';
}

// Toast alerts helper engine
window.showToast = function(message, type = 'success') {
  const root = document.getElementById('toast-root');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconCheck = `<svg class="toast-icon success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
  const iconErr = `<svg class="toast-icon error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

  toast.innerHTML = `
    ${type === 'success' ? iconCheck : iconErr}
    <span>${message}</span>
  `;
  root.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Handle Mock Authentication for Students
window.handleStudentSignup = function(e) {
  e.preventDefault();
  const name = document.getElementById('stud-name').value;
  const email = document.getElementById('stud-email').value;
  const branch = document.getElementById('stud-branch').value;
  const year = document.getElementById('stud-year').value;

  state.currentUser = {
    name,
    email,
    branch,
    year,
    role: 'student'
  };

  showToast(`Email verified and Authenticated successfully as ${name}!`, 'success');
  updateNavProfile();
  renderAllOpportunities();
  switchView('student-dashboard');
}

// Handle Mock Authentication for Society Hosts
window.handleHostSignup = function(e) {
  e.preventDefault();
  const name = document.getElementById('host-name').value;
  const society = document.getElementById('host-society').value;
  const email = document.getElementById('host-email').value;

  // Tight validation constraint on host email
  if (!email.endsWith('@igdtuw.ac.in')) {
    showToast('Access Denied. Institutional domain "@igdtuw.ac.in" is mandatory for hosting privileges.', 'error');
    return;
  }

  state.currentUser = {
    name,
    society,
    email,
    role: 'host'
  };

  showToast(`Authenticated successfully as Official Host for ${society}!`, 'success');
  updateNavProfile();
  renderHostDashboard();
  switchView('host-dashboard');
}

// Sign out function
window.handleSignOut = function() {
  state.currentUser = null;
  state.rsvps = [];
  showToast('Successfully signed out.', 'success');
  updateNavProfile();
  renderAllOpportunities();
  renderRsvps();
  switchView('student-dashboard');
}

// Update Top Navigation Profile Section
function updateNavProfile() {
  const container = document.getElementById('nav-auth-section');
  if (state.currentUser) {
    const initials = state.currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap: 1rem;">
        <div class="user-profile-nav tooltip" data-tooltip="Grad: ${state.currentUser.year || 'Host'}" onclick="handleSignOut()">
          <div class="user-avatar">${initials}</div>
          <div class="user-name-text">${state.currentUser.name}</div>
          <span style="font-size:0.75rem; color: #ef4444; font-weight:700;">(Logout)</span>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button class="nav-btn auth-btn" onclick="switchView('auth-page')">Sign In / Sign Up</button>
    `;
  }
}

// Eligibility check utility
function evaluateEligibility(opportunity) {
  if (!opportunity.restrictIGDTUWOnly) {
    return { eligible: true, message: "Open Match", desc: "No email domain constraints apply. Accessible to everyone." };
  }
  if (!state.currentUser) {
    return { eligible: false, message: "Authentication Required", desc: "Please login with your institutional @igdtuw.ac.in email to verify eligibility." };
  }
  if (state.currentUser.role === 'host') {
    return { eligible: true, message: "Host Privilege active", desc: "You are logged in as a host profile." };
  }
  if (state.currentUser.email && state.currentUser.email.endsWith('@igdtuw.ac.in')) {
    return { eligible: true, message: "Eligible to register", desc: "Your institutional domain @igdtuw.ac.in email was validated." };
  }
  return { eligible: false, message: "Restricted Domain", desc: "Only students with verified @igdtuw.ac.in emails can register for this event." };
}

// Launch details Modal for opportunities
window.triggerDetailModal = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  state.selectedOpportunityId = oppId;
  state.activeModalTab = 'about';

  // Set content
  document.getElementById('modal-category').innerText = opp.category;
  document.getElementById('modal-title').innerText = opp.title;
  document.getElementById('modal-society').innerText = opp.society;
  document.getElementById('modal-about-text').innerText = opp.about;
  document.getElementById('modal-duration').innerText = opp.timeline;
  document.getElementById('modal-eligibility-desc').innerText = opp.restrictIGDTUWOnly ? "Strictly @igdtuw.ac.in only" : "All domains welcome";
  document.getElementById('modal-prizes-text').innerText = opp.prizes;
  document.getElementById('modal-deadline').innerText = opp.dates;
  document.getElementById('modal-contact-email').innerText = opp.contactEmail;

  // Evaluate Eligibility
  const assessment = evaluateEligibility(opp);
  const banner = document.getElementById('modal-eligibility-banner');
  const title = document.getElementById('eligibility-banner-title');
  const desc = document.getElementById('eligibility-banner-desc');
  const actionBtn = document.getElementById('btn-modal-action');

  if (assessment.eligible) {
    banner.className = "eligibility-check-banner eligible";
    title.innerText = assessment.message;
    desc.innerText = assessment.desc;
    
    // Change action button state
    const isRegistered = state.rsvps.includes(oppId);
    if (isRegistered) {
      actionBtn.innerText = "Already Registered (RSVP Confirmed)";
      actionBtn.style.backgroundColor = "#cbd5e1";
      actionBtn.style.color = "#475569";
      actionBtn.disabled = true;
    } else {
      actionBtn.innerText = "Confirm RSVP / Register";
      actionBtn.style.backgroundColor = "var(--primary)";
      actionBtn.style.color = "white";
      actionBtn.disabled = false;
    }
  } else {
    banner.className = "eligibility-check-banner ineligible";
    title.innerText = assessment.message;
    desc.innerText = assessment.desc;
    
    actionBtn.innerText = "Restricted Eligibility";
    actionBtn.style.backgroundColor = "#cbd5e1";
    actionBtn.style.color = "#475569";
    actionBtn.disabled = true;
  }

  // Set Active state to tabs
  switchModalTab('about');

  // Open Modal
  document.getElementById('detail-modal').classList.add('active');
}

window.hideDetailModal = function() {
  document.getElementById('detail-modal').classList.remove('active');
}

window.closeDetailModal = function(e) {
  if (e.target.id === 'detail-modal') {
    hideDetailModal();
  }
}

// Handles the core action of clicking Register / RSVP inside modal
window.handleModalRegistration = function() {
  if (!state.currentUser) {
    hideDetailModal();
    switchView('auth-page');
    showToast("Please sign in or create an account first to RSVP.", "error");
    return;
  }

  const oppId = state.selectedOpportunityId;
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const eligibility = evaluateEligibility(opp);
  if (!eligibility.eligible) {
    showToast("You are not eligible to register for this event.", "error");
    return;
  }

  if (!state.rsvps.includes(oppId)) {
    state.rsvps.push(oppId);
    opp.registrations += 1;
    showToast(`Successfully registered for ${opp.title}! Details sent to ${state.currentUser.email}`, 'success');
    
    // Refresh UI state
    renderAllOpportunities();
    renderRsvps();
    hideDetailModal();
  }
}

// Direct registration from grid list cards
window.handleDirectRegistration = function(oppId, event) {
  event.stopPropagation();
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  if (!state.currentUser) {
    switchView('auth-page');
    showToast("Please sign in or create an account first to RSVP.", "error");
    return;
  }

  const eligibility = evaluateEligibility(opp);
  if (!eligibility.eligible) {
    showToast("Registration Restricted. Institutional domain '@igdtuw.ac.in' is required.", "error");
    return;
  }

  if (state.rsvps.includes(oppId)) {
    showToast("You have already RSVP'd to this event.", "success");
    return;
  }

  state.rsvps.push(oppId);
  opp.registrations += 1;
  showToast(`Successfully registered for ${opp.title}!`, 'success');
  
  renderAllOpportunities();
  renderRsvps();
}

// Helper to generate stars or customized SVG icons for categories
function getCategoryIcon(category) {
  switch(category) {
    case "Hackathon":
      return `<svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`;
    case "Coding Trial":
      return `<svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case "Cultural Performance":
      return `<svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    default:
      return `<svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>`;
  }
}

// Render Student/Public Dashboard Opportunities
function renderAllOpportunities() {
  const trendingGrid = document.getElementById('trending-grid-root');
  const allGrid = document.getElementById('opportunities-grid-root');
  if (!trendingGrid || !allGrid) return;
  
  let trendingHtml = '';
  let allHtml = '';

  let totalCount = 0;
  let totalRegs = 0;

  state.opportunities.forEach(opp => {
    if (opp.status === 'ongoing' || opp.status === 'future') {
      totalCount++;
    }
    totalRegs += opp.registrations;

    const isReg = state.rsvps.includes(opp.id);
    const actionBtnLabel = isReg ? "Registered ✓" : "Register Now";
    const actionBtnStyle = isReg ? "background-color: #cbd5e1; color: #475569; pointer-events: none;" : "";
    const elBadgeClass = opp.restrictIGDTUWOnly ? "" : "open";
    const elBadgeLabel = opp.restrictIGDTUWOnly ? "IGDTUW Only" : "Open to All";

    const cardHtml = `
      <div class="card" onclick="triggerDetailModal('${opp.id}')">
        <div class="card-banner">
          <div class="card-banner-pattern"></div>
          <span class="category-badge">${opp.category}</span>
          <span class="eligibility-badge ${elBadgeClass}">${elBadgeLabel}</span>
        </div>
        <div class="card-body">
          <span class="card-society">${opp.society}</span>
          <h3 class="card-title">${opp.title}</h3>
          
          <div class="card-meta-list">
            <div class="card-meta-item">
              ${getCategoryIcon(opp.category)}
              <span>Duration: <b>${opp.timeline}</b></span>
            </div>
            <div class="card-meta-item">
              <svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>Deadline: <b>${opp.dates}</b></span>
            </div>
            <div class="card-meta-item">
              <svg class="card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>Prizes: <b style="color:var(--primary);">${opp.prizes}</b></span>
            </div>
          </div>

          <div class="card-footer">
            <div class="registrations-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span><b>${opp.registrations}</b> RSVP'd</span>
            </div>
            <button class="btn-card-action" style="${actionBtnStyle}" onclick="handleDirectRegistration('${opp.id}', event)">
              ${actionBtnLabel}
            </button>
          </div>
        </div>
      </div>
    `;

    if (opp.trending && opp.status === 'ongoing') {
      trendingHtml += cardHtml;
    }
    allHtml += cardHtml;
  });

  trendingGrid.innerHTML = trendingHtml;
  allGrid.innerHTML = allHtml;

  // Update counters
  const totalOppsEl = document.getElementById('stat-total-opps');
  const activeRegsEl = document.getElementById('stat-active-registrations');
  if (totalOppsEl) totalOppsEl.innerText = `${totalCount}+`;
  if (activeRegsEl) activeRegsEl.innerText = `${totalRegs}`;
}

// Render registered events into sidebar
function renderRsvps() {
  const root = document.getElementById('rsvp-list-root');
  const badge = document.getElementById('rsvp-count-badge');
  if (!root) return;
  if (badge) badge.innerText = state.rsvps.length;

  if (state.rsvps.length === 0) {
    root.innerHTML = `
      <div class="rsvp-empty">
        Sign in and register for opportunities to populate your personal RSVP tracker dashboard.
      </div>
    `;
    return;
  }

  let html = '';
  state.rsvps.forEach(oppId => {
    const opp = state.opportunities.find(o => o.id === oppId);
    if (!opp) return;

    html += `
      <div class="rsvp-item" onclick="triggerDetailModal('${opp.id}')" style="cursor:pointer;">
        <div class="rsvp-icon">${opp.category[0]}</div>
        <div class="rsvp-details">
          <div class="rsvp-event-name">${opp.title}</div>
          <div class="rsvp-event-society">${opp.society}</div>
        </div>
      </div>
    `;
  });
  root.innerHTML = html;
}

// Host: Handle event creation
window.handleCreateEvent = function(e) {
  e.preventDefault();
  
  const title = document.getElementById('evt-title').value;
  const society = document.getElementById('evt-society').value;
  const category = document.getElementById('evt-category').value;
  const timeline = document.getElementById('evt-timeline').value;
  const dates = document.getElementById('evt-dates').value;
  const prizes = document.getElementById('evt-prizes').value;
  const contactEmail = document.getElementById('evt-email').value;
  const about = document.getElementById('evt-about').value;
  const restrictIGDTUWOnly = document.getElementById('evt-restrict').checked;

  const newEvent = {
    id: `opp-${state.opportunities.length + 1}`,
    title,
    society,
    category,
    timeline,
    dates,
    prizes,
    about,
    contactEmail,
    restrictIGDTUWOnly,
    registrations: 0,
    trending: false,
    winners: "",
    status: 'ongoing' // Newly created are directly live ongoing
  };

  state.opportunities.unshift(newEvent);
  showToast(`Published Live Opportunity: ${title}`, 'success');
  
  // Reset Form
  document.getElementById('create-event-form').reset();
  
  // Render
  renderAllOpportunities();
  renderHostDashboard();
}

// Submit winners for past events
window.handleDeclareWinner = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const input = document.getElementById(`winner-input-${oppId}`);
  if (!input || !input.value.trim()) {
    showToast('Please enter a valid winner name/team', 'error');
    return;
  }

  opp.winners = input.value.trim();
  showToast(`Declared Event Victors for ${opp.title}: ${opp.winners}`, 'success');
  renderHostDashboard();
}

// Mock participants array for the ongoing roster panel
const mockStudents = [
  { name: "Sanya Gupta", branch: "CSE", year: "3rd Yr", email: "sanya@igdtuw.ac.in" },
  { name: "Kirti Aggarwal", branch: "IT", year: "4th Yr", email: "kirti@igdtuw.ac.in" },
  { name: "Ananya Sharma", branch: "ECE", year: "2nd Yr", email: "ananya@igdtuw.ac.in" },
  { name: "Riya Sen", branch: "MAE", year: "1st Yr", email: "riya@igdtuw.ac.in" },
  { name: "Mehak Preet", branch: "CSE", year: "2nd Yr", email: "mehak@igdtuw.ac.in" }
];

// Host Dashboard Rendering Engine
function renderHostDashboard() {
  const ongoingGrid = document.getElementById('host-ongoing-grid-root');
  const futureGrid = document.getElementById('host-future-grid-root');
  const pastGrid = document.getElementById('host-past-grid-root');
  if (!ongoingGrid || !futureGrid || !pastGrid) return;

  let ongoingHtml = '';
  let futureHtml = '';
  let pastHtml = '';

  state.opportunities.forEach(opp => {
    // Construct basic card properties
    const criteriaLabel = opp.restrictIGDTUWOnly ? "Strictly @igdtuw.ac.in" : "Open Domain";
    const criteriaClass = opp.restrictIGDTUWOnly ? "color:#dc2626;" : "color:var(--primary);";

    if (opp.status === 'ongoing') {
      // Generate a custom mock roster for ongoing cards
      let rosterHtml = '';
      const participantsCount = opp.registrations > 5 ? 5 : opp.registrations;
      
      for(let i = 0; i < participantsCount; i++) {
        const ms = mockStudents[i % mockStudents.length];
        rosterHtml += `
          <div class="roster-item">
            <span class="roster-name">${ms.name}</span>
            <span class="roster-meta">${ms.branch} (${ms.year}) • ${ms.email}</span>
          </div>
        `;
      }

      if (participantsCount === 0) {
        rosterHtml = `<div class="rsvp-empty" style="padding: 1rem;">No participants have registered yet.</div>`;
      }

      ongoingHtml += `
        <div class="host-event-card">
          <div class="host-card-top">
            <div class="host-card-info">
              <h4 class="host-card-title">${opp.title}</h4>
              <span class="host-card-society">${opp.society} • Category: ${opp.category}</span>
              <div class="host-card-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                Deadline: <b>${opp.dates}</b> | Criteria: <b style="${criteriaClass}">${criteriaLabel}</b>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="rsvp-badge" style="font-size: 0.9rem; padding: 0.25rem 0.75rem;">${opp.registrations} Registrants</span>
            </div>
          </div>

          <!-- Live Registrants Roster -->
          <div>
            <div class="meta-box-label" style="margin-bottom: 0.5rem;">Registered Students Roster (${opp.registrations} Total)</div>
            <div class="roster-list-box">
              ${rosterHtml}
            </div>
          </div>

          <div class="host-card-actions" style="flex-direction: row; justify-content: flex-end; gap: 0.5rem;">
            <button class="nav-btn" style="border: 1px solid var(--border-color); font-size: 0.8rem;" onclick="toggleEventCriteria('${opp.id}')">Toggle Criteria Restriction</button>
            <button class="btn-card-action" style="font-size: 0.8rem; background-color:#ef4444;" onclick="archiveEvent('${opp.id}')">Archive/Move to Past</button>
          </div>
        </div>
      `;
    } else if (opp.status === 'future') {
      futureHtml += `
        <div class="host-event-card">
          <div class="host-card-top">
            <div class="host-card-info">
              <h4 class="host-card-title">${opp.title}</h4>
              <span class="host-card-society">${opp.society} • ${opp.category}</span>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Draft mode. Ready to publish when scheduled.</p>
            </div>
          </div>
          <div class="host-card-actions" style="flex-direction: row; justify-content: flex-end;">
            <button class="btn-card-action" onclick="publishDraft('${opp.id}')">Publish Live Immediately</button>
          </div>
        </div>
      `;
    } else if (opp.status === 'past') {
      const winnerDisplay = opp.winners 
        ? `<div style="font-size:0.9rem; color: var(--text-dark); background-color: var(--primary-light); padding:0.625rem 0.875rem; border-radius:var(--radius-sm); border: 1px solid var(--primary-border);">
             🏆 Winner Announced: <b>${opp.winners}</b>
           </div>`
        : `
          <div class="winner-input-wrapper">
            <input class="form-input" style="padding: 0.5rem;" id="winner-input-${opp.id}" type="text" placeholder="e.g. Priyanshi Gupta, ECE-3rd Yr" />
            <button class="btn-card-action" onclick="handleDeclareWinner('${opp.id}')">Save Winner</button>
          </div>
        `;

      pastHtml += `
        <div class="host-event-card">
          <div class="host-card-top">
            <div class="host-card-info">
              <h4 class="host-card-title">${opp.title}</h4>
              <span class="host-card-society">${opp.society}</span>
            </div>
          </div>
          
          <div>
            <div class="meta-box-label" style="margin-bottom: 0.375rem;">Victors & Champions</div>
            ${winnerDisplay}
          </div>
        </div>
      `;
    }
  });

  ongoingGrid.innerHTML = ongoingHtml || `<div class="rsvp-empty">No active ongoing events listed for your profile. Create one using the launch panel.</div>`;
  futureGrid.innerHTML = futureHtml || `<div class="rsvp-empty">No future drafts configured. Use the launch form to generate live ones.</div>`;
  pastGrid.innerHTML = pastHtml || `<div class="rsvp-empty">No past events recorded in archives.</div>`;
}

// Archive / Move event to past
window.archiveEvent = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  opp.status = 'past';
  showToast(`Archived event ${opp.title} and moved it to Past Archives.`, 'success');
  renderAllOpportunities();
  renderHostDashboard();
}

// Publish event draft live
window.publishDraft = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  opp.status = 'ongoing';
  showToast(`Successfully published ${opp.title} as live opportunity!`, 'success');
  renderAllOpportunities();
  renderHostDashboard();
}

// Toggle criteria rules live
window.toggleEventCriteria = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  opp.restrictIGDTUWOnly = !opp.restrictIGDTUWOnly;
  showToast(`Updated Registration rules for ${opp.title}. Restrictions are now ${opp.restrictIGDTUWOnly ? 'ENABLED' : 'DISABLED'}.`, 'success');
  
  renderAllOpportunities();
  renderHostDashboard();
}

// Initialize application on window load
window.addEventListener('DOMContentLoaded', () => {
  renderAllOpportunities();
  renderRsvps();
  renderHostDashboard();
});
