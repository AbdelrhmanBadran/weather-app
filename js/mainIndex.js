
let cityInput = document.getElementById('cityInput')


async function getWeatherData(city){
let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
if(result.status != 400 ){
let data = await result.json();
// console.log(data.current.condition.text);
// console.log(data.forecast.forecastday)
DisplayLiveDay(data.location , data.current)
DisplayNextDays(data.forecast.forecastday)

}

}

getWeatherData('Hehia')




cityInput.addEventListener('keyup' , (city)=>{
let cityName = city.target.value;
getWeatherData(cityName)
})

//             0            1            2          3           4            5 
let days = [ 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ];

let months = ["January","February","March" , "April" , "May" , "June" , "July","August","September","October","November","December"];

function DisplayLiveDay(cityLocation , cityCurrent ){
let date = new Date();
let cartoona = 
`

<div class="col-md-4 col-sm-12">
    <div class="main-day text-white">
        <div class="title hstack bg-dark bg-opacity-50  justify-content-between p-2">
            <p>${days[date.getDay()]}</p>
            <p>${date.getDate()} ${months[date.getMonth()]}</p>
        </div>
        <div class="weather-caption  mt-1 p-5">
            <p class = 'text-muted fw-bold '>${cityLocation.name} </p>
            <div class="icon d-flex justify-content-around">
            <h1 class='temp '>${cityCurrent.temp_c}<sup>o</sup>C</h1>

            <img src="https:${cityCurrent.condition.icon}" alt="" class ='icon-waether'>
            
            </div>
            <p class=' text-info' >${cityCurrent.condition.text}</p>
            <div class=' mt-5 d-flex justify-content-around'>
            <span>
            <img src='img/icon-wind.png' width='20px' class='me-1'>
            ${cityCurrent.wind_kph}kph
            
            </span>
            <span>
            <img src='img/icon-compass.png' width='20px' class='me-1'>
            ${cityCurrent.wind_dir}</span>
            <span>
            <img src='img/icon-umberella.png' width='20px' class='me-1'>

            ${cityCurrent.humidity}%</span>
            </div>
        </div>
        
    </div>
</div>
`
document.getElementById('result').innerHTML = cartoona
}

function DisplayNextDays(cityForecast){
let date = new Date();
cartoona = ''
for (let index = 1; index < (cityForecast.length); index++) {
    let dayWeek =( date.getDay() + index )
console.log(index);
if(dayWeek > 6 ){
    dayWeek = index - 1

}
// console.log(dayWeek);

// console.log(days[dayWeek]);

cartoona +=
`
<div class="col-md-4 col-sm-12">
    <div class="main-day caption${index} text-white">
        <div class="title text-center p-2 header${index} ">
            <p>${days[dayWeek]}</p>
        </div>
        <div class=" d-flex flex-column align-items-center justify-content-center mt-5">
            <img src="https:${cityForecast[index].day.condition.icon}" alt="" class ='icon-waether'>
            <h1 class=''>${cityForecast[index].day.maxtemp_c}<sup>o</sup>C</h1>
            <p class=''>${cityForecast[index].day.mintemp_c}<sup>o</sup>C</p>
            <p class=' text-info' >${cityForecast[index].day.condition.text}</p>
        </div>
        
    </div>
</div>


`


}

document.getElementById('result').innerHTML += cartoona;

}

