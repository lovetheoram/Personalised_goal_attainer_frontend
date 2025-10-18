// const API_BASE = 'http://localhost:8000'; // Change to your backend URL
const API_BASE= 'https://lovetheoram.pythonanywhere.com'
function getAuthHeaders(authRequired=true) {
  const token = localStorage.getItem('token');
  if (authRequired && token)
  {
    return {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  }
    
      return  { 'Content-Type': 'application/json' };
}

// ===================== Authentication =====================
export async function signup(data) {
  const res = await fetch(`${API_BASE}/auth/signup/`, {
    method: 'POST',
    headers: getAuthHeaders(false),
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: getAuthHeaders(false),
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_BASE}/auth/profile/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

export async function updateProfile(data) {
  const res = await fetch(`${API_BASE}/auth/profile/`, {
    method: 'PATCH',
    headers: getAuthHeaders(true),
    body: JSON.stringify(data),
  });
  return await res.json();
}

// ===================== Progress =====================
export async function getUserProgress() {
  const res = await fetch(`${API_BASE}/progress/user-progress/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

export async function getFullProgress() {
  const res = await fetch(`${API_BASE}/progress/user-progress/full_progress/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

export async function getWeakConcepts() {
  const res = await fetch(`${API_BASE}/progress/user-progress/weak_concepts/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

// ===================== Daily Targets =====================
export async function getDailyTargets() {
  const res = await fetch(`${API_BASE}/target/daily_targets/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

export async function generateDailyTargets(data) {
  const res = await fetch(`${API_BASE}/target/daily_targets/generate/`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(data), // expects { study_date, budget, exam_date }
  });
  return await res.json();
}



// ===================== Quiz =====================
export async function startQuiz() {
  const res = await fetch(`${API_BASE}/quiz/concept-quiz/start/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}

export async function submitQuiz(data) {
  const res = await fetch(`${API_BASE}/quiz/concept-quiz/submit/`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(data),
  });
  return await res.json();
}

// ===================== Achievements =====================
export async function checkAchievements() {
  const res = await fetch(`${API_BASE}/achievements/check_achievements/`, {
    headers: getAuthHeaders(true),
  });
  return await res.json();
}


// GET full tree with cache-busting
export async function getProgressTree() {
  const res = await fetch(`${API_BASE}/progress/user-progress/tree/`, {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // ensures fresh data
  });
  return await res.json();
}

// GET concept details with cache-busting
export async function getConceptDetail(conceptId) {
  const res = await fetch(`${API_BASE}/progress/user-progress/concept_detail/?concept_id=${conceptId}`, {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // ensures fresh data
  });
  return await res.json();
}
