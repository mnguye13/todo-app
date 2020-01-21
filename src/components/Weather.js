import React, {useState} from 'react';
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import './Weather.css';

const Api_key = "9a17f2ed6c0c296ca8d6070af0f493f1";

function Weather(){
    const [location,setLocation] = useState("");
    const [isError, setError] = useState(false);
    const [data,setData] = useState([{
        temperature: undefined,
        feels_like: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        datetime: undefined,
        wind: undefined,
        error: undefined
    }]);


    async function getWeather(){
        console.log(Api_key);
        try{
            const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID='+Api_key);
            const response =  await api_call.json();
            console.log(response);
            console.log(response.main.temp);
            console.log(response.main.humidity);
            console.log(response.name);
            console.log(response.sys.country);

            setData({
                temperature: Math.round((response.main.temp-273.15)*(9/5)+32),
                feels_like: Math.round((response.main.feels_like-273.15)*(9/5)+32),
                city: response.name, 
                country: response.sys.country,
                humidity: response.main.humidity,
                description: response.weather[0].description,
                wind: response.wind.speed
            });
            setError(false);
        } catch (error){
            console.error(error);
            setError(true);
        }

        

    }

    return(
        <div>
            <h3>Get weather info</h3>
            <div className="bp3-input-group"  style={{width:'10%', margin: 'auto'}} >
            <span className="bp3-icon bp3-icon-search"></span>
                <input 
                    className="bp3-input" 
                    value={location}
                    placeholder = "Enter city name"
                    onChange = {(e)=>setLocation(e.target.value)}/>
    
                <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" onClick = {()=>getWeather()} ></button>
            </div>
            <div className="weatherBox">
                <p>City: {data.city}, {data.country} </p>
                <p>Temp: {data.temperature}<span>&#176;</span>F</p>
                <p>Feel Like: {data.feels_like}<span>&#176;</span>F</p>
                <p>Humidity: {data.humidity}</p>
                <p>Wind: {data.wind} mph</p>
                <p>Description: {data.description}</p>
            </div>

            {isError && <p style = {{color: 'red'}} >City not found</p>}
            
        </div>
    )

}

export default Weather;