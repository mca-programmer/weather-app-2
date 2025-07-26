const apiKey ="5bba92dc1ad24434462db7275313f5ee"; // ← এখানে আপনার OpenWeatherMap API key বসান
const weatherList = document.getElementById("weatherList");
const cityCount = document.getElementById("cityCount");

let addedCities = [];

async function addCity() {
  const input = document.getElementById("cityInput");
  const city = input.value.trim();

  if (!city) return;
  if (addedCities.includes(city.toLowerCase())) {
    alert("এই শহরটি আগেই যোগ করা হয়েছে!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"5bba92dc1ad24434462db7275313f5ee"}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("শহর খুঁজে পাওয়া যায়নি!");
      return;
    }

    addedCities.push(city.toLowerCase());
    updateCityCount();

    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${name}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${temp}°C</strong> - ${description}</p>
    `;
    weatherList.appendChild(card);
    input.value = "";

  } catch (error) {
    alert("ডেটা আনতে সমস্যা হয়েছে।");
  }
}

function updateCityCount() {
  cityCount.textContent = `Cities: ${addedCities.length}`;
}

function clearCities() {
  weatherList.innerHTML = "";
  addedCities = [];
  updateCityCount();
}
