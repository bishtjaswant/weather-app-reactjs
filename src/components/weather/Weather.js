import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../styles/weather.css';

const Weather = () => {

    const [weather, setWeather] = useState({city:"Delhi"});

    const [userInfoGlobally, setUserInfoGlobally] = useState("");

    const [WeatherIcon, setWeatherIcon] = useState("");


    const inputHandler = (e) => {
     setWeather({[e.target.name]: e.target.value});
    }
    

    const getWeatherDataHandler = (e) => {
        console.log('weather :>> ', weather);
         fetchWeatherData();
    };

    const fetchWeatherData = async ( ) => {
        try {
            const { city } = weather;
            const api = '8f319042307929b55e68f009c64b1104';
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=matrix&appid=${api}`);
            // console.log(response);
            const {
                main: { temp , humidity , pressure },
                wind: { speed },
                sys: { country, sunset },
                name,
                // weather: [{ description, icon }],
            } = response.data;

            const { description, icon , main:mood } = response.data.weather[0];

            let  newWeatherIndex={
                temp, humidity, pressure, speed, sunset, country, name, description,mood, icon, weather
            };
       
            setUserInfoGlobally(newWeatherIndex);

          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
          fetchWeatherData();
          
          if ( userInfoGlobally.mood ) {
            switch (userInfoGlobally.mood) {
                case "Clouds":
                    setWeatherIcon("wi-day-cloudy");
                    break;
                    case "Haze":
                       setWeatherIcon("wi-fog");
                       break;
                       
                    case "Clear":
                       setWeatherIcon("wi-day-sunny");
                       break;
               
                default:
                    setWeatherIcon("wi-day-sunny");
                    break;
            }
          }
              
          
    }, [  userInfoGlobally?.mood]);
      
    let dateStr= new Date(userInfoGlobally?.sunset*1000).getHours()+":"+new Date(userInfoGlobally?.sunset*1000).getMinutes() + ":" + new Date(userInfoGlobally?.sunset*1000).getSeconds();

    return (
        <>
          <div className="wrap">
              <div className="search">
                  <input type="search" name="city"  onChange={inputHandler} className='searchTerm' id="search" placeholder='search city....' autoFocus />
                  <button onClick={getWeatherDataHandler} className="searchButton">search</button>
              </div>
          </div>
        
        <article  className='widget'>
            <div className="weatherIcon">
                <i className={`wi ${WeatherIcon}`}></i>
            </div>

            <div className="weatherInfo">
                <div className="temperature">
                    <span>{userInfoGlobally?.temp}&deg;</span>
                </div>
                <div className="description">
                    <div className="weatherCondition">sunny</div>
                    <div className="place">{userInfoGlobally?.name}, {userInfoGlobally?.country}</div>
                </div>
            </div>

            <div className="date"> {new Date().toLocaleString()} </div>
            <div className="extra-temp ">
                <div className="temp-info-minmax">
                    <div className="two-sided-section">
                        <p><i className="wi wi-sunset"></i></p>
                        <p className="extra-info-leftside">{dateStr} <br />  sunset</p>
                    </div>

                    <div className="two-sided-section">
                        <p><i className="wi wi-humidity"></i></p>
                        <p className="extra-info-leftside">{userInfoGlobally?.humidity} <br />  humidity</p>
                    </div>
                </div>
                <div className="weather-extra-info">
                    <div className="two-sided-section">
                        <p><i className="wi wi-sandstorm"></i></p>
                        <p className="extra-info-leftside">{userInfoGlobally?.speed} <br />  speed</p>
                    </div>
                    <div className="two-sided-section">
                        <p><i className="wi wi-flood"></i></p>
                        <p className="extra-info-leftside"> {userInfoGlobally?.pressure}  <br />  pressure</p>
                    </div>
                </div>

                
            </div>
        </article>
        </>      
    );
};

export default Weather;