const apiKey = "bcc3045b00200c06716127884c6ae323";
const  apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const bgImage = document.querySelector(".weather-img");
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-details").style.display = "none";
    }else{
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            bgImage.src="images/bg-img/cloud.jpg";
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
            bgImage.src="images/bg-img/clear.jpg";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
            bgImage.src="images/bg-img/rain.jpg";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            bgImage.src="images/bg-img/drizzle.jpg";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
            bgImage.src="images/bg-img/mist.jpg";
        }
        document.querySelector(".weather-details").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
                
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    GetInfo();
})

// -------------------for 7 day --
function GetInfo(){
    const newName = document.getElementById("cityInput");

    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
    .then(response => response.json())
    .then(data => {
        for(i=0;i<7;i++){
            document.getElementById("day"+(i+1)+"Min").innerHTML = "Min:" +Number(data.list[i].main.temp_min-273.15).toFixed(1)+"°";
        }
        for(i=0;i<7;i++){
            document.getElementById("day"+(i+1)+"Max").innerHTML = "Max:" +Number(data.list[i].main.temp_max-273.15).toFixed(1)+"°";
        }
        for(i=0;i<7;i++){
            document.getElementById("img"+(i+1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
        }
        console.log(data)
    })
    // .catch(err => alert("Something went wrong"))
}

// function DefaultScreen(){
//     document.getElementById("cityInput").defaultValue = "London";
//     GetInfo();
// }
const d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

function CheckDay(day){
    if(day +d.getDay() > 6){
        return day +d.getDay()-7;
    }else{
        return day +d.getDay();
    }
}
for(i =0;i<7;i++){
    document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}