let apiKey = '364ea10a9dce84c7e6e88f4ed5d11db3';

let url = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`

axios.get(url).then(draw);

function findCity(event){
    event.preventDefault();
    let city = document.getElementById('cityFind').value;

    let c = city.toUpperCase().slice(0, 1) + city.slice(1, city.length);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${apiKey}&units=metric`

    axios.get(url).then(draw);

}

function getForecast(coord){
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
    
    axios.get(url).then(drawForecast);
}

function draw(response){
    console.log(response)

        document.getElementById('city').innerHTML = response.data.name;

        document.getElementById('bigTem').innerHTML = Math.round(response.data.main.temp);

        console.log(response.data.weather[0]);

        document.getElementById('recipitation').innerHTML = `${response.data.main.humidity}%`

        document.getElementById('main').innerHTML = `${response.data.weather[0].main}`

        document.getElementById('wind').innerHTML = `${Math.round(response.data.wind.speed)} km/h`

        document.querySelector('img').setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

        getForecast(response.data.coord);
}

document.getElementById('button').addEventListener('click', findCity);

let input = document.getElementById("cityFind");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

function getDay(info){
    let data = new Date(info*1000); 
    let day = data.getDay();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

    return days[day];

}

function drawForecast(response){
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let div = document.querySelector('#forecast'); 
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

    let inner = `<div class="row">`
    forecast.forEach(function(day, index){
        if(index<5){
        inner += `<div class="col card text-center">
                    
        <h4>${getDay(day.dt)}</h4>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="forecast-image">
        <div class="forecast-temp">
            <span class="temp-max">${Math.round(day.temp.max)}° | </span>
            <span class="temp-min"> ${Math.round(day.temp.min)}°</span>
        </div>

       </div>`
        }
    });

    inner += `</div>`

    div.innerHTML = inner;
}

function setDate(date){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday']; 
    document.getElementById('date').innerHTML = `${days[date.getDay()]}, ${date.getHours()}:${date.getMinutes()}`
}

setDate(new Date());

drawForecast();