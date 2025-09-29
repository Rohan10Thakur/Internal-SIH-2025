// ---------- LOGIN/SIGNUP ----------
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

document.getElementById("login-tab").onclick = () => {
  loginForm.classList.remove("d-none");
  signupForm.classList.add("d-none");
};

document.getElementById("signup-tab").onclick = () => {
  signupForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
};

// Signup
signupForm.onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) return alert("Fill all fields");
  if (localStorage.getItem(email)) return alert("Email already exists");

  localStorage.setItem(email, JSON.stringify({ name, email, password, points: 0 }));
  alert("Signup successful! Please login");
  signupForm.reset();
  document.getElementById("login-tab").click();
};

// Login
loginForm.onsubmit = e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const user = JSON.parse(localStorage.getItem(email));
  if (!user || user.password !== password) return alert("Invalid login");

  localStorage.setItem("currentUser", JSON.stringify(user));
  loginForm.reset();
  document.getElementById("login-page").classList.add("d-none");
  document.getElementById("app").classList.remove("d-none");
  loadUser();
};

// Load User Info
function loadUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profilePoints").textContent = user.points;
    document.getElementById("profileProgress").style.width = Math.min(user.points, 100) + "%";
    document.getElementById("profileLevel").textContent = Math.floor(user.points / 100) + 1;
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// Navigation
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// ---------- UPLOAD & WIN ----------
document.getElementById("uploadForm").onsubmit = e => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  user.points += 20;
  localStorage.setItem("currentUser", JSON.stringify(user));
  loadUser();
  alert("✅ Photo submitted! +20 points");
  e.target.reset();
}

// ---------- COMPLAINT ----------
document.getElementById("complaintForm").onsubmit = e => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  user.points += 10;
  localStorage.setItem("currentUser", JSON.stringify(user));
  loadUser();
  alert("✅ Complaint submitted successfully! +10 points");
  e.target.reset();
}
