const api = {
  key: "Enter your openweathermap API-KEY",
  base: "https://api.openweathermap.org/data/2.5/weather?q="
}

const search = document.querySelector(".search")
const btn = document.querySelector(".btn")

btn.addEventListener('click', getInput)

function getInput(event) {
  event.preventDefault();
  const error = document.querySelector('.error')

  if (event.type == 'click') {
    if (search.value === '') {
      return error.textContent = "Please enter city name"

    } else {
      error.textContent = ""
      getData(search.value)
    }
  }
}

// fetching data from API

function getData(city) {

  fetch(`${api.base}${city}&units=metric&appid=${api.key}`)
    .then(response => {
      return response.json()
    }
    )
    .then(handleData)

}

// handling response

function handleData(response) {
  if (response.cod === "404") {
    const error = document.querySelector('.error')
    error.textContent = "Invalid city name. Please enter a valid city."
    search.value = ""


  } else {

    const city = document.querySelector(".city")

    city.innerText = `${response.name}, ${response.sys.country}`
    city.style.fontSize = "26px"
    const date = new Date()
    const dateElement = document.querySelector('.date')
    dateElement.innerText = displayDate(date)

    const temp = document.querySelector(".temp")
    temp.innerHTML = `Temp : ${Math.round(response.main.temp)} <span>&#8451;</span>`

    const weather = document.querySelector(".weather")
    weather.innerText = `Weather : ${response.weather[0].main}`

    const tempRange = document.querySelector(".temp_range")
    tempRange.innerHTML = `Temp Range : ${Math.round(response.main.temp_min)} <span>&#8451;</span> / ${Math.round(response.main.temp_max)} <span>&#8451;</span>`


    const weatherIcon = document.querySelector('.weather_icon')

    const iconURL = "https://api.openweathermap.org/img/w/"

    weatherIcon.src = `${iconURL}${response.weather[0].icon}.png`

    search.value = ''
  }
}

function displayDate(date) {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let day = DAYS[date.getDay()]
  let month = MONTHS[date.getMonth()]
  let d = date.getDate();
  let year = date.getFullYear()

  return `${day}, ${d} ${month} ${year} `
}