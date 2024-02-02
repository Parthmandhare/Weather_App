import { useState } from 'react';
import './App.css';
import Tilt from "react-parallax-tilt";

import clear_icon from "./Assets/clear.png"
import cloud_icon from "./Assets/cloud.png"
import drizzle_icon from "./Assets/drizzle.png"
import rain_icon from "./Assets/rain.png"
import snow_icon from "./Assets/snow.png"
import wind_icon from "./Assets/wind.png"
import humidity_icon from "./Assets/humidity.png"
import wind_black from "./Assets/wind-black.png"
import moon from "./Assets/moon (1).png"

function App() {

  const[input, setInput]= useState("");
  const[city, setCity] =useState("");
  // const[country, se] =useState("");

  const[wIcon, setWicon] = useState(cloud_icon);

  const[week1Icon, setWeek1icon] = useState(cloud_icon);
  const[week2Icon, setWeek2icon] = useState(cloud_icon);
  const[week3Icon, setWeek3icon] = useState(cloud_icon);
  const[week4Icon, setWeek4icon] = useState(cloud_icon);
  const[week5Icon, setWeek5icon] = useState(cloud_icon);
  const[week6Icon, setWeek6icon] = useState(cloud_icon);
  const[week7Icon, setWeek7icon] = useState(cloud_icon);

  const[temp, setTemp] = useState("");
  const[desc, setDesc] = useState("");
  const[feelsLike, setFeelsLike] = useState("");
  const[wind, setWind] = useState("");
  const[clouds, setClouds] = useState("");
  const[humidity, setHumidity] = useState("");
  const[country, setCountry] =useState("");
  const[date, setDate] = useState("");
  const[Mini_temp, setMini_temp] = useState("");
  const[Max_temp, setMax_temp] = useState("");

  const[week1_data, setWeek1_data] = useState({});
  const[week2_data, setWeek2_data] = useState({});
  const[week3_data, setWeek3_data] = useState({});
  const[week4_data, setWeek4_data] = useState({});
  const[week5_data, setWeek5_data] = useState({});
  const[week6_data, setWeek6_data] = useState({});
  const[week7_data, setWeek7_data] = useState({});


  const [isInputEmpty, setIsInputEmpty] = useState(true);

 const setWeekImg = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear_icon;
      case "02d":
      case "02n":
        return cloud_icon;
      case "03d":
      case "03n":
        return drizzle_icon;
      case "04d":
      case "04n":
        return rain_icon;
      case "09d":
      case "09n":
        return rain_icon;
      case "010d":
      case "010n":
        return rain_icon;
      case "013d":
      case "013n":
        return snow_icon;
      default:
        return clear_icon;
    }
 };

  const getData = async() =>{
      try {
        const today = new Date();
        console.log(today.getDate());
        
        setDate(today.getDate());
            let api_key = "09d668571c4437b8415fc4fa9ee75548";
            let city = "London"
        
          
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=09d668571c4437b8415fc4fa9ee75548`;
        
          
        const response = await fetch(url);
          const data = await response.json();
          console.log(data);
        
        
          setCity(data.name)
          setTemp(data.main.temp);
          setDesc(data.weather[0].main);
          setFeelsLike(data.main.feels_like);
          setWind(data.wind.speed)
          setClouds(data.clouds.all);
          setHumidity(data.main.humidity);
          setCountry(data.sys.country)
          // setCity(data.name)
          setMini_temp(data.main.temp_min);
          setMax_temp(data.main.temp_max);
        
          if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clear_icon);
          }
          else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWicon(cloud_icon);
          }
          else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzle_icon);
          }
          else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWicon(drizzle_icon);
          }
          else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWicon(rain_icon);
          }
          else if (data.weather[0].icon === "010d" || data.weather[0].icon === "010n"){
            setWicon(rain_icon);
          }
          else if (data.weather[0].icon === "013d" || data.weather[0].icon === "013n"){
            setWicon(snow_icon);
          }
          else{
            setWicon(clear_icon);
          }
        
            getWeeklyData();
            setIsInputEmpty(false);
      } catch (error) {
         alert('City not found. Please enter a valid city name.');
         setIsInputEmpty(true);
      }

 
  }

  const  getWeeklyData = async()=>{
    const today = new Date();
 setDate(today.getDate());
//  const api_key = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
//  const city = "Nagpur";

 // Step 1: Get latitude and longitude of the city
 const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=09d668571c4437b8415fc4fa9ee75548`;
 const geoResponse = await fetch(geoUrl);
 const geoData = await geoResponse.json();
 console.log(geoData);
 const lat = geoData[0].lat;
 const lon = geoData[0].lon;

 let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=5ac971624319176aa65bc2a93615a2ba`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  // setCity(data.)

  setWeek1_data({
    temp: data.daily[0].temp.max,
    desc: data.daily[0].weather[0].main,
    clouds: data.daily[0].clouds,
    wind: data.daily[0].wind_speed,
    humidity: data.daily[0].humidity,
    icon: data.daily[0].weather[0].icon
  })
  setWeek2_data({
    temp: data.daily[1].temp.max,
    desc: data.daily[1].weather[0].main,
    clouds: data.daily[1].clouds,
    wind: data.daily[1].wind_speed,
    humidity: data.daily[1].humidity,
    icon: data.daily[1].weather[0].icon
  })
  setWeek3_data({
    temp: data.daily[2].temp.max,
    desc: data.daily[2].weather[0].main,
    clouds: data.daily[2].clouds,
    wind: data.daily[2].wind_speed,
    humidity: data.daily[2].humidity,
    icon: data.daily[2].weather[0].icon
  })
  setWeek4_data({
    temp: data.daily[3].temp.max,
    desc: data.daily[3].weather[0].main,
    clouds: data.daily[3].clouds,
    wind: data.daily[3].wind_speed,
    humidity: data.daily[3].humidity,
    icon: data.daily[3].weather[0].icon
  })
  setWeek5_data({
    temp: data.daily[4].temp.max,
    desc: data.daily[4].weather[0].main,
    clouds: data.daily[4].clouds,
    wind: data.daily[4].wind_speed,
    humidity: data.daily[4].humidity,
    icon: data.daily[4].weather[0].icon
  })
  setWeek6_data({
    temp: data.daily[5].temp.max,
    desc: data.daily[5].weather[0].main,
    clouds: data.daily[5].clouds,
    wind: data.daily[5].wind_speed,
    humidity: data.daily[5].humidity,
    icon: data.daily[5].weather[0].icon
  })
  setWeek7_data({
    temp: data.daily[6].temp.max,
    desc: data.daily[6].weather[0].main,
    clouds: data.daily[6].clouds,
    wind: data.daily[6].wind_speed,
    humidity: data.daily[6].humidity,
    icon: data.daily[6].weather[0].icon
  })
  setWeek1icon(setWeekImg(week1_data.icon));
  setWeek2icon(setWeekImg(week2_data.icon));
  setWeek3icon(setWeekImg(week3_data.icon));
  setWeek4icon(setWeekImg(week4_data.icon));
  setWeek5icon(setWeekImg(week5_data.icon));
  setWeek6icon(setWeekImg(week6_data.icon));
  setWeek7icon(setWeekImg(week7_data.icon));

  // // setWeekImg(setWeek1_data.icon, setWeek1icon);
  // setWeekImg(setWeek2_data.icon, setWeek2icon);
  // setWeekImg(setWeek3_data.icon, setWeek3icon);
  // setWeekImg(setWeek4_data.icon, setWeek4icon);
  // setWeekImg(setWeek5_data.icon, setWeek5icon);
  // setWeekImg(setWeek6_data.icon, setWeek6icon);
  // setWeekImg(setWeek7_data.icon, setWeek7icon);

  }
  return (
   <>
   {/* <TiltComponent></TiltComponent> */}
   
    <div className='section'>
      <div className='section1'>
        <div className='search_bar'>
          
            <input type="text" placeholder='Enter Your City Name Here!' value={input} onChange={(e)=>{setInput(e.target.value)}} className='search_bar_field'/>
             <button onClick={getData} className='search_bar_button'>Search</button>
          
        </div>
      </div>
      <div className='section2'>

      {isInputEmpty ? (
        <div className='banner'>
        <img src={moon} alt="" className='moon_img'/>
        <p className='headline'>Explore current weather data and 6-day forecast of more than 200,000 cities!</p> </div>) : (
      <>
        <div className='sec_right'>

<img src={wIcon} alt="not found" className='WImg'/>
{/* left side */}
<div className='current_weather'>
<h2>CURRENT WEATHER</h2>

<div className='current_weather_box'>
 <div className='current_weather_1'>
  <h3>{city}, {country}</h3>
  <h4>Today {date} Feb</h4>
 </div>
 <div className='current_weather_2'>
  <h3>{temp}°C</h3>
  <h4>{desc}</h4>
 </div>
 <div className='current_weather_3'>
  <h3>Min Temperature</h3>
  <h4>{Mini_temp}°C</h4>
 </div>
 <div className='current_weather_4'>
  <h3>Max Temperature</h3>
  <h4>{Max_temp}°C</h4>
 </div>
</div>
</div>

<div className='air_conditions'>
  <h2>Air Conditions</h2>

<div className='air_conditions_box'>
 <div className='air_conditions_1'>
  <h3>Real Feel</h3>
  <h4>{feelsLike}°C</h4>
 </div>
 <div className='air_conditions_2'>
  <h3>Wind</h3>
  <h4>{wind} m/s</h4>
 </div>
 <div className='air_conditions_3'>
  <h3>Clouds</h3>
  <h4>{clouds} %</h4>
 </div>
 <div className='air_conditions_4'>
  <h3>Humidity</h3>
  <h4>{humidity}%</h4>
 </div>
</div>
</div>

</div>

<div className='week_weather'>
{/* right side */}
<h2 className='week_weather_title'> WEEKLY FORECAST </h2>

<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Sunday</div>
    <div className='week_desc'>
      <img src={week1Icon} alt="" className='Weel_img'/>
      <div>{week1_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week1_data.temp} °C</div>
    <div>{week1_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week1_data.wind} m/s</div>
    <div>{week1_data.humidity} %</div>
</div>

</div>

<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Monday</div>
    <div className='week_desc'>
      <img src={week2Icon} alt="" className='Weel_img'/>
      <div>{week2_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week2_data.temp} °C</div>
    <div>{week2_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week2_data.wind} m/s</div>
    <div>{week2_data.humidity} %</div>
</div>

</div>
<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Tuesday</div>
    <div className='week_desc'>
      <img src={week3Icon} alt="" className='Weel_img'/>
      <div>{week3_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week3_data.temp} °C</div>
    <div>{week3_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week3_data.wind} m/s</div>
    <div>{week3_data.humidity} %</div>
</div>

</div>
<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Wednesday</div>
    <div className='week_desc'>
      <img src={week4Icon} alt="" className='Weel_img'/>
      <div>{week4_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week4_data.temp} °C</div>
    <div>{week4_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week4_data.wind} m/s</div>
    <div>{week4_data.humidity} %</div>
</div>

</div>
<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Thrusday</div>
    <div className='week_desc'>
      <img src={week5Icon} alt="" className='Weel_img'/>
      <div>{week5_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week5_data.temp} °C</div>
    <div>{week5_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week5_data.wind} m/s</div>
    <div>{week5_data.humidity} %</div>
</div>

</div>
<div className='days'>
  <div className='days_f1'>
    <div className='day_name'> Friday</div>
    <div className='week_desc'>
      <img src={week6Icon} alt="" className='Weel_img'/>
      <div>{week6_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week6_data.temp} °C</div>
    <div>{week6_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week6_data.wind} m/s</div>
    <div>{week6_data.humidity} %</div>
</div>

</div>
<div className='days'>
  <div className='days_f1'>
    <div className='day_name'>Saturday</div>
    <div className='week_desc'>
      <img src={week7Icon} alt="" className='Weel_img'/>
      <div>{week7_data.desc}</div>
    </div>
  </div>

  <div className='days_f1'>
    <div>{week7_data.temp} °C</div>
    <div>{week7_data.clouds} %</div>
 </div>
  <div className='days_f1'>
    <div>{week7_data.wind} m/s</div>
    <div>{week7_data.humidity} %</div>
</div>

</div>


</div>
      </>
    )}
     </div>
    </div>
    
   </>
  );
}

export default App;
