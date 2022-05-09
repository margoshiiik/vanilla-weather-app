let apiKey = '364ea10a9dce84c7e6e88f4ed5d11db3';

function findCity(event){
    event.preventDefault();
    let city = document.getElementById('cityFind').value;

    let c = city.toUpperCase().slice(0, 1) + city.slice(1, city.length);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${apiKey}&units=metric`

    axios.get(url).then(function(response){
        document.getElementById('city').innerHTML = c;

        document.getElementById('bigTem').innerHTML = Math.round(response.data.main.temp);

        console.log(response.data.weather[0]);

        document.getElementById('recipitation').innerHTML = `${response.data.main.humidity}%`

        document.getElementById('main').innerHTML = `${response.data.weather[0].main}`

        document.getElementById('wind').innerHTML = `${Math.round(response.data.wind.speed)}km`

    })
}

document.getElementById('button').addEventListener('click', findCity);

let input = document.getElementById("cityFind");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
  }
});


document.getElementById('cel').addEventListener('click', function(event){
    event.preventDefault();
    let city = document.getElementById('city').innerHTML.toLowerCase();
    let t = weather[`${city}`].temp;

    console.log(t);

    document.getElementById('bigTem').innerHTML = Math.round(t);
})

document.getElementById('far').addEventListener('click', function(event){
    event.preventDefault();
    let city = document.getElementById('city').innerHTML.toLowerCase();
    console.log(city);
    console.log(weather[`${city}`])

    let temperature = weather[`${city}`].temp * 1.8 + 32; 

    console.log(temperature);

    document.querySelector('#bigTem').innerHTML = `${Math.round(temperature)} `;
})





function setDate(date){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday']; 
    document.getElementById('date').innerHTML = `${days[date.getDay()]}, ${date.getHours()}:${date.getMinutes()}`
}

setDate(new Date());