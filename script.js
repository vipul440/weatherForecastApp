const apiKey = "bcc3045b00200c06716127884c6ae323";
const  apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const bgImage = document.querySelector(".bg-img");
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
    }else{
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            bgImage.style.backgroundImage = "url('images/bg-img/cloud.jpg')";
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
            bgImage.style.backgroundImage = "url('images/bg-img/clear.jpg')";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
            bgImage.style.backgroundImage = "url('images/bg-img/rain.jpg')";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            bgImage.style.backgroundImage = "url('images/bg-img/drizzle.jpg')";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
            bgImage.style.backgroundImage = "url('images/bg-img/mist.jpg')";
        }
        // document.querySelector(".weather-details").style.display = "block";
        // document.querySelector(".error").style.display = "none";
        
    }
}
                
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    GetInfo(searchBox.value);
})

// -------------------for 7 day --
function GetInfo(city){
    // var newName = document.getElementById("cityInput");
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=17d2e136f075be6bd1018a8d5c3a16e7')
    .then(response => response.json())
    .then(data => {
        for(i = 0; i < 7; i++){
            document.getElementById("day"+(i+1)+"Min").innerHTML = "Min:" +Math.round(Number(data.list[i].main.temp_min-273.15).toFixed(1))+"&#8451";
        }
        for(i = 0; i < 7; i++){
            document.getElementById("day"+(i+1)+"Max").innerHTML = "Max:" +Math.round(Number(data.list[i].main.temp_max-273.15).toFixed(1))+"&#8451";
        }
        for(i = 0; i < 7; i++){
            document.getElementById("img"+(i+1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
        }
        console.log(data)
    })
    .catch(err => alert("Something went wrong"))
    
}

var d = new Date();
var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

function CheckDay(day){
    if(day +d.getDay() > 6){
        return day + d.getDay()-7;
    }else{
        return day + d.getDay();
    }
}
for(i =0;i<7;i++){
    document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}