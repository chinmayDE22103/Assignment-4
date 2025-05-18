// Variables
let users = [];
const API_KEY = "f0bd32a744533844fd85d508daa0c0da"; // Updated to Default API key

// BMI Calculator
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (weight && height) {
    const bmi = weight / (height * height);
    document.getElementById(
      "bmiResult"
    ).textContent = `Your BMI is: ${bmi.toFixed(2)}`;
  } else {
    alert("Please enter both weight and height!");
  }
}

// Temperature Converter
function convertTemperature() {
  const celsius = parseFloat(document.getElementById("celsius").value);

  if (!isNaN(celsius)) {
    const fahrenheit = (celsius * 9) / 5 + 32;
    document.getElementById(
      "tempResult"
    ).textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
  } else {
    alert("Please enter a valid temperature!");
  }
}

// Dynamic User Table
function addUser() {
  const name = prompt("Enter user name:");
  const email = prompt("Enter user email:");

  if (name && email) {
    users.push({ name, email });
    updateUserTable();
  }
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    updateUserTable();
  }
}

function updateUserTable() {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = user.name;
    row.insertCell(1).textContent = user.email;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteUser(index);
    row.insertCell(2).appendChild(deleteButton);
  });
}

// Form Validation
function validateName() {
  const name = document.getElementById("name").value;
  const nameError = document.getElementById("nameError");
  const nameRegex = /^[a-zA-Z\s]{2,30}$/;

  if (!nameRegex.test(name)) {
    nameError.textContent =
      "Name should contain only letters and be 2-30 characters long";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validatePhone() {
  const phone = document.getElementById("phone").value;
  const phoneError = document.getElementById("phoneError");
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phone)) {
    phoneError.textContent = "Phone number should be 10 digits";
    return false;
  }
  phoneError.textContent = "";
  return true;
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    passwordError.textContent =
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
    return false;
  }
  passwordError.textContent = "";
  return true;
}

function handleRegistration(event) {
  event.preventDefault();

  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validatePassword()
  ) {
    alert("Registration successful!");
    event.target.reset();
  }
}

// Weather API
async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherResult = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (response.ok) {
      weatherResult.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
    } else {
      weatherResult.textContent = "City not found";
    }
  } catch (error) {
    weatherResult.textContent = error;
  }
}

// Date and Random Number
function updateDateTime() {
  const dateTime = new Date();
  document.getElementById("currentDateTime").textContent =
    dateTime.toLocaleString();
}

function generateRandomNumber() {
  const random = Math.floor(Math.random() * 100) + 1;
  document.getElementById(
    "randomNumber"
  ).textContent = `Random number: ${random}`;
}

// Initialize
setInterval(updateDateTime, 1000);
updateDateTime();
