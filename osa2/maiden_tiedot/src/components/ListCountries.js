import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Display only the common name of a given country
const CountryName = ({ country }) => {
    const [showInfo, setShowInfo] = useState(false)
    const handleClick = () => setShowInfo(true)

    if (showInfo) {
        return <CountryInfo country={country} />
    }

    return (
        <div>
            {country.name.common}
            <button onClick={() => handleClick(country)}>
                show
            </button>
        </div>
    )
}

const CountryInfo = ({ country }) => {
// Display the common name, languages and the flag of a given country
// as well as current weather of the capital.
    const [weather, setWeather] = useState('')

    const capital = country.capital[0]
    // Weather API parameters
    const api_key = process.env.REACT_APP_API_KEY
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`

    useEffect(() => {
        axios
            .get(api_url)
            .then(response => {
                setWeather({
                    temp: response.data.current.temp_c,
                    icon: response.data.current.condition.icon,
                    wind_mph: response.data.current.wind_mph,
                    wind_dir: response.data.current.wind_dir
                })
                
            })
    }, [api_url])

    let langs = Object.values(country.languages)
    
    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>
                capital {country.capital} <br />
                population {country.population}
            </p>

            <h2>Spoken languages</h2>
            
            <ul>
                {langs.map(lang =>
                    <li key={lang}>
                        {lang}
                    </li>
                )}
            </ul>

            <img src={country.flags.png}
                 alt="Flag" />

            <h2>Weather in {country.capital[0]}</h2>

            <b>temperature:</b> {weather.temp} Celsius <br />

            <img src={weather.icon}
                 alt="Weather icon" />
            
            <br />

            <b>wind:</b> {weather.wind_mph} mph direction {weather.wind_dir}
        </div>
    )
}
/*<img src={weather.icon}
                 alt="Weather icon" />

            <b>wind:</b> {weather.wind_mph} direction {wind_dir}*/

const ListCountries = ({ countries }) => {
// List all the countries that are given and show different information depending
// on the amount of countries
   
    if (countries.length === 1) {
        return (
            <CountryInfo country={countries[0]} />
        )


    } else if (countries.length <= 10) {
        // sort country names alphabetically
        countries.sort(function(a, b) {
            let nameA = a.name.common.toUpperCase()
            let nameB = b.name.common.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }

            return 0
        })

        return countries.map(country =>
            <CountryName key={country.cca2} country={country} />)
    } else {
        return <div>Too many matches, specify another filter</div>
    }
}

export default ListCountries
