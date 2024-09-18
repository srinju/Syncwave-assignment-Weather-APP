import { useEffect, useState } from "react"
import Forecast from "./components/Forecast"
import Inputs from "./components/Inputs"
import TempAndDetails from "./components/TempAndDetails"
import TmeLoacation from "./components/TmeLoacation"
import TopButtons from "./components/TopButtons"
import getFormattedWeatherData from "./services/WeatherService"
import Spinner from "./components/Spinner"

const App = () => {

  const [query,setQuery] = useState(localStorage.getItem("lastCity"));
  const [units,setUnits] = useState('metric');
  const [weather,setweather] = useState(null);
  const [loading,setLoading] = useState(false);

  const getWeather = async() => {
    setLoading(true);
    try {
      await getFormattedWeatherData({ ...query , units}).then( data => {
        setweather(data);
        localStorage.setItem('lastCity',query.q);
      })
    }catch(error) {
      console.error("error while fetching data!!" , error); //error handling while fetching data
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  },[query,units]);

  useEffect(() => { //when the component is getting mounted i am setting the setquery as the saved city
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setQuery({ q: savedCity });
    }
  }, []);

  return (
    <div className="rounded-xl mx-auto max-w-4xl py-5 my-8 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-slate-800 to-slate-600">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      
      {loading && <Spinner />} {/* Show spinner while loading */}
      {!loading && weather && (
        <>
          <TmeLoacation weather={weather} />
          <TempAndDetails weather={weather} />
          <Forecast title="5 Day Forecast" data={weather.daily} />
        </>
      )}
    </div>
  )
}

export default App