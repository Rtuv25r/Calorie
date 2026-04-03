let foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];

function calculate() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let activity = document.getElementById("activity").value;

  let bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  let calories = bmr * activity;

  let protein = (calories * 0.3) / 4;
  let carbs = (calories * 0.4) / 4;
  let fats = (calories * 0.3) / 9;

  document.getElementById("result").innerHTML = `
    <p>BMR: ${Math.round(bmr)}</p>
    <p>Calories: ${Math.round(calories)}</p>
    <p>Protein: ${Math.round(protein)}g</p>
    <p>Carbs: ${Math.round(carbs)}g</p>
    <p>Fats: ${Math.round(fats)}g</p>
  `;
}

function addFood() {
  let food = document.getElementById("food").value;
  let calories = document.getElementById("foodCalories").value;

  if (!food || !calories) return;

  foodLog.push({ food, calories: Number(calories) });
  localStorage.setItem("foodLog", JSON.stringify(foodLog));

  document.getElementById("food").value = "";
  document.getElementById("foodCalories").value = "";

  renderLog();
}

function renderLog() {
  let logDiv = document.getElementById("log");
  logDiv.innerHTML = "";

  let total = 0;

  foodLog.forEach(item => {
    total += item.calories;
    logDiv.innerHTML += `<p>${item.food} - ${item.calories} kcal</p>`;
  });

  document.getElementById("total").innerText = "Total: " + total + " kcal";
}

renderLog();