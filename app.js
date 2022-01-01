// const API = fetch("https://api.openweathermap.org/data/2.5/forecast?q=decin&appid=b9d778d198687ccfe0c0975797d6ac3b")

const formCity = document.querySelector("#form");
const citySelected = document.querySelector("#input-city");
const resultText = document.querySelector("#result-text");
const jokeOfDay = document.querySelector("#jokeday");

function fetchInfo(city) {
  const cleanedCity = city.trim().toLowerCase();
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cleanedCity}&units=metric&appid=b9d778d198687ccfe0c0975797d6ac3b`
  )
    .then((response) => response.json())
    .then((data) => {
      const dataArray = data.list;
      dataArray.forEach((item) => {
        const capCity = city.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
        resultText.textContent = `The current weather in ${capCity} is ${item.main.temp} °C.`;
      });
    })
    .catch(() => {
      resultText.textContent = `Your city does not exists or you made a mistake. Please try again :)`;
    });
}

function jokeDay() {
  return fetch("https://api.jokes.one/jod")
    .then((response) => response.json())
    .then((data) => {
      const jokeArray = data.contents.jokes;
      jokeArray.forEach((item) => {
        // console.log(item.joke);
        jokeOfDay.textContent = `${item.joke.text}`;
        jokeOfDay.insertAdjacentHTML(
          "beforebegin",
          `<h3 id="joke-title">Joke of the Day</h3>`
        );
      });
    });
}

formCity.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    fetchInfo(citySelected.value);
    jokeDay();
  },
  { once: true }
);
