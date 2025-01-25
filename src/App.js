import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const api_key = '166e7a6545bf44b996585358252301';
  const handleChange = (e) => {
    
    setSearchText(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setData([]);
    setIsLoading(true);
    try {
      
      if(searchText){
      const result = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${searchText}`);
      console.log(result.data)
      setData([result.data]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`error : ${error}`);
      alert(`Failed to fetch weather data`);

    }
    finally { 

      console.log(data)
    }

  }


  return (
    <div style={{
       
      alignItems: "center",
      alignContent: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
       
    }} >
      <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <form onSubmit={(e) => handleSearch(e)}>
          <input type='text' placeholder='Enter City Name' name="search" style={{ margin: "5px", padding: "10px" }} onChange={(e)=>handleChange(e)} /> 
          <button type='submit' name='Search' style={{ margin: "5px", padding: "10px", backgroundColor:"#5cb377" , border:"0px", borderRadius:"5px",cursor:"pointer" }}>Search</button>
        </form>
      </div>
      {isLoading && <> <p>Loading data…....</p></>}
      {!isLoading && data.length>0 && 
      <div className='weather-cards' >
        <div className='weather-card'>
          <h4>Temperature</h4>
          <label>{data[0].current.temp_c} C</label>
        </div>
        <div className='weather-card'>
          <h4>Humidity</h4>
          <label>{data[0].current.humidity} %</label>
        </div>
        <div className='weather-card'>
          <h4>Condition</h4>
          <label>{data[0].current.condition.text}</label>
        </div>
        <div className='weather-card'>
          <h4>Wind speed</h4>
          <label>{data[0].current.wind_kph} kph</label>
        </div>
      </div>
    }
    </div>
  );
}

export default App;
