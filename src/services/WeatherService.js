import { DateTime } from "luxon";


const Api_Key = 'ed6e793909a75ea25967dbba30256f77';

const Base_Url = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (infoType,searchParams) => {
    const url = new URL(Base_Url + infoType);
    url.search = new URLSearchParams({...searchParams , appid: Api_Key});

    return fetch(url).then((res) => res.json());
};

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

const formatToLocalTime = (secs,offset,format = "cccc, dd lll yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset , { zone: "utc"}).toFormat(format);  //current time in the api is when the data was fetched as dt: . it is in epoc time we will conv it into seconds .  and there is offset whicg will take care of the timezones

const formatCUrrent = (data) => {
    console.log("api rep" , data);
    const {
        coord : { lat , lon},
        main : {temp , feels_like , temp_min , temp_max , humidity},
        name,
        dt,
        sys: {country , sunrise , sunset},
        weather,
        wind: {speed},
        timezone
    } = data;

    const {main: details , icon} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt,timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise : formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset : formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon : iconUrl(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon
    }
};

const formatForecastWeather = (secs,offset,data) => {

    //hourly>

    const hourly = data.filter((f) => f.dt > secs).map((f) => ({
        temp : f.main.temp,
        title: formatToLocalTime(f.dt , offset , "hh:mm a"),
        icon: iconUrl(f.weather[0].icon),
        date : f.dt_txt,
    }));

    //daily >

    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
        temp : f.main.temp,
        title: formatToLocalTime(f.dt , offset , "ccc"),
        icon: iconUrl(f.weather[0].icon),
        date : f.dt_txt,
    }))

    return {hourly,daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCUrrent);

    const {dt,lat,lon,timezone} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast',{lat,lon,units : searchParams.units}).then((d) => formatForecastWeather(dt,timezone,d.list))

    return { ...formattedCurrentWeather , ...formattedForecastWeather};
};

export default getFormattedWeatherData;