let users = []; // store registered users
let currentUser = null;

// Show sections
function showSignup() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("signupSection").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
}

// Sign Up
function signup() {
  let num = document.getElementById("signupStudentNumber").value;
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let pass = document.getElementById("signupPassword").value;

  if (num === "" || name === "" || email === "" || pass === "") {
    alert("Please complete all fields!");
    return;
  }

  users.push({ studentNumber: num, name: name, email: email, password: pass });
  alert("Registration successful! Please login.");
  showLogin();
}

// Login
function login() {
  let num = document.getElementById("studentNumberLogin").value;
  let pass = document.getElementById("passwordLogin").value;

  let user = users.find(u => u.studentNumber === num && u.password === pass);

  if (!user) {
    alert("Invalid student number or password!");
    return;
  }

  currentUser = user;
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  // Load profile data
  document.getElementById("studentNumber").value = user.studentNumber;
  document.getElementById("studentName").value = user.name;
  document.getElementById("studentEmail").value = user.email;
}

function logout() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  currentUser = null;
}

// Show Section
function showSection(id) {
  let sections = ["profile", "courses", "ledger", "announcements"];
  sections.forEach(sec => document.getElementById(sec).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Profile
function saveProfile() {
  if (currentUser) {
    currentUser.name = document.getElementById("studentName").value;
    currentUser.email = document.getElementById("studentEmail").value;
    document.getElementById("profileMsg").textContent =
      `Profile saved for ${currentUser.name} (${currentUser.email}) ✅`;
  }
}

// Courses
function addCourse() {
  let course = document.getElementById("courseName").value.trim();
  let subject = document.getElementById("subjectName").value.trim();
  let units = document.getElementById("courseUnits").value.trim();

  if (course === "" || subject === "" || units === "") {
    alert("Please fill all course details!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = `${course} - ${subject} (${units} units)`;
  document.getElementById("courseList").appendChild(li);

  document.getElementById("courseName").value = "";
  document.getElementById("subjectName").value = "";
  document.getElementById("courseUnits").value = "";
}

// Ledger
let balance = 0;

function addTransaction() {
  let desc = document.getElementById("transactionDesc").value.trim();
  let amount = parseFloat(document.getElementById("transactionAmount").value);
  let category = document.getElementById("transactionCategory").value;

  if (desc === "" || isNaN(amount)) {
    alert("Please enter description and valid amount!");
    return;
  }

  let li = document.createElement("li");
  li.classList.add("ledger-item");

  let details = document.createElement("div");
  details.classList.add("ledger-details");
  details.innerHTML = `<b>${desc}: ₱${amount}</b><span class="ledger-category">Category: ${category}</span>`;

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function () {
    balance -= amount;
    document.getElementById("ledgerBalance").textContent = balance;
    li.remove();
  };

  li.appendChild(details);
  li.appendChild(delBtn);
  document.getElementById("ledgerList").appendChild(li);

  balance += amount;
  document.getElementById("ledgerBalance").textContent = balance;

  document.getElementById("transactionDesc").value = "";
  document.getElementById("transactionAmount").value = "";
  document.getElementById("transactionCategory").value = "Tuition";
}

// Tuition Category
function updateTuitionCategory() {
  let type = document.getElementById("tuitionType").value;
  document.getElementById("tuitionDisplay").textContent =
    `Current Tuition Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
}
