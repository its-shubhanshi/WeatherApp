"use strict";
let error = document.querySelector(".error");
let inputvalue = document.querySelector("#cityname");
const apik = "3ecdbe5631dd2901c9ad03098c2ac3a7";
document.querySelector(".btn").addEventListener("click", checkWeather);
let weatherInfo = document.querySelector(".weatherInfo");
function convertion(val) {
  return (val - 273).toFixed(2);
}

async function checkWeather() {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputvalue.value +
      "&appid=" +
      apik
  );
  const data = await res.json();
  if (res.status == 404) {
    error.innerText = "Please enter valid city";
    weatherInfo.style.display = "none";
  } else if (res.status == 400) {
    error.innerText = "Please enter city";
    weatherInfo.style.display = "none";
  } else {
    console.log(data);
    console.log(data.name);
    error.innerText = "";
    var descrip = data["weather"]["0"]["description"];
    var tempature = data["main"]["temp"];
    var wndspd = data["wind"]["speed"];
    weatherInfo.style.display = "block";
    weatherInfo.innerHTML = `
          <h2 class="cityTitle">Weather of <span>  ${data.name} </span></h2>
          <p>Sky Conditions : <span>${descrip}</span></p>
          <p>Temperature : <span>${convertion(tempature)} C</span></p>
          <p>Wind Speed : <span>${wndspd}  km/h</span> </p>
        

    `;
  }
}
