export function getForecast(location) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.position.lat}&longitude=${location.position.long}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto`,
        )
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                reject(response.json())
            }
        })
        .then(data => {
            resolve(transformData(data))
        })
    })
}

export function getCurrentWeather(location) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.position.lat}&longitude=${location.position.long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=ms`,
        )
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                reject(response.json())
            }
        })
        .then(currentData => {
            resolve(currentDataTrans(currentData))
        })
    })
}

function transformData(raw) {
    let weatherData = {}
    weatherData.position = { lat: raw.latitude, long: raw.longitude }
    weatherData.timezone = { offset: raw.utc_offset_seconds, name: raw.timezone, short: raw.timezone_abbreviation, }

    weatherData.weather = []
    for (let i = 0; i < raw.daily.time.length; i++) {

        let data = {
            date: raw.daily.time[i],
            code: raw.daily.weather_code[i],
            temp: {
                max: raw.daily.temperature_2m_max[i],
                min: raw.daily.temperature_2m_min[i],
                units: raw.daily_units.temperature_2m_max,
            },
    
            precipitation: {
                sum: raw.daily.precipitation_sum[i],
                probability: raw.daily.precipitation_probability_max[i],
                unit: raw.daily_units.precipitation_sum,
            },
            wind: {
                direction: raw.daily.wind_direction_10m_dominant[i],
                speed: raw.daily.wind_speed_10m_max[i],
                gusts: raw.daily.wind_gusts_10m_max[i],
                units: raw.daily_units.wind_speed_10m_max,
            },
        }
        weatherData.weather.push(data)
    }
    return weatherData
}


function currentDataTrans(raw) {
    let weatherData = {};

    weatherData.position = {
        lat: raw.location.lat,
        long: raw.location.lon,
    };

        weatherData.timezone = {
            name: raw.location.tz_id,
            localtime: raw.location.localtime,
        };

            weatherData.current = {
                locationName: raw.location.name,
                temperature: {
                    value: raw.current.temp_c,
                    unit: "C",
                },
                condition: {
                    code: raw.current.condition.code,
                    description: raw.current.condition.text,
                },
                wind: {
                    speed: raw.current.wind_kph,
                    unit: "m/h",
                    direction: raw.current.wind_dir,
                },
                humidity: raw.current.humidity,
                pressure: {
                    value: raw.current.pressure_mb,
                    unit: "mb",
                },
            };

    return weatherData;
}