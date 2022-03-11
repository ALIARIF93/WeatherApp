const getCurrentInfo = async (cityName)=>{
    const baseUrl    = 'https://api.openweathermap.org/data/2.5/weather';
    const query      = `?q=${cityName}&appid=413c751c2ae137159aa05df6985d5975&units=metric`
    const cityInfo   = await fetch(baseUrl+query);
    const data       = await cityInfo.json();
    return data;
}

