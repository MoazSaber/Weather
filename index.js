//Today Documents
let today_location=document.getElementById('today_location')
let today_temp=document.getElementById('today_temp')
let today_condition_img=document.getElementById('today_condition_img')
let today_condition_text=document.getElementById('today_condition_text')
let humidity=document.getElementById('humidity')
let wind=document.getElementById('wind')
let wind_direction=document.getElementById('wind_direction')
let today_date_day_name=document.getElementById('today_date_day_name')
let today_date_day_number=document.getElementById('today_date_day_number')
let today_date_month=document.getElementById('today_date_month')
let country=document.getElementById('country')
// tomorrows documents
next_day_name =document.getElementsByClassName('next_day_name ')
let next_max_temp=document.getElementsByClassName('next_max_temp')
let next_condition_img=document.getElementsByClassName('next_condition_img')
let next_min_temp=document.getElementsByClassName('next_min_temp')
let nextText=document.getElementsByClassName('next_condition_text fs-6 text-light-blue')
 

// search
let search=document.getElementById('search')
// fetch
async function WeatherDataApi(city) {
    let  weatherAPI =   await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${city}&days=3`)
    let weatherAPIJson  = await weatherAPI.json()
    return weatherAPIJson
 }


// TodayFunction
function TodayFunction(data) {
today_location.innerHTML= data.location.name
today_temp.innerHTML=data.current.temp_c
today_condition_img.setAttribute("src","https:"+data.current.condition.icon)
today_condition_text.innerHTML=data.current.condition.text
humidity.innerHTML=data.current.humidity+"%"
wind.innerHTML=data.current.wind_kph+"km/h"
wind_direction.innerHTML=data.current.wind_dir
let dateToday =new Date(data.forecast.forecastday[0].date)
today_date_day_name.innerText=dateToday.toLocaleDateString("en-US",{weekday:"long"})
today_date_day_number.innerText=dateToday.getDate()
today_date_month.innerText=dateToday.toLocaleDateString("en-US",{month:"long"})
country.innerText=data.location.country
}
//nextDaysFunction

function NextDays(data){
    let forecastDay=data.forecast.forecastday
    
    for(let i=0;i<2;i++){
        next_max_temp[i].innerHTML=forecastDay[i+1].day.maxtemp_c
        next_min_temp[i].innerHTML=forecastDay[i+1].day.mintemp_c
        next_condition_img[i].setAttribute('src', "https:"+ forecastDay[i+1].day.condition.icon)
        nextText[i].innerHTML=forecastDay[i+1].day.condition.text
        let dateToday =new Date(data.forecast.forecastday[i+1].date)
        next_day_name[i].innerHTML=dateToday.toLocaleDateString("en-US",{weekday:"long"})

    }
    
}


 //displayApp
 async function displayApp(gettingSearch="egypt") {
    let weatherData= await WeatherDataApi(gettingSearch)
    if(!weatherData.error){
         TodayFunction(weatherData)
    NextDays(weatherData)
    }
   
 }
 displayApp();

search.addEventListener('input',function () {
    displayApp(search.value)
    
})