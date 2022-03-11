const getForcastInfo    = async (lat,lon)=>{
    const baseUrl       = 'https://api.openweathermap.org/data/2.5/onecall';
    const query         = `?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=413c751c2ae137159aa05df6985d5975&units=metric`
    const forcastInfo   = await fetch(baseUrl+query);
    const data          = await forcastInfo.json();
    return data;
}

