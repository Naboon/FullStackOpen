import React from 'react'

// Display only the common name of a given country
const CountryName = ({ country }) => {
    return (
        <div>
            {country.name.common}
        </div>
    )
}

const CountryInfo = ({ country }) => {
// Display the common name, languages and the flag of a given country
    let langs = Object.values(country.languages)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital} <br />
                population {country.population}
            </p>
            <h2>languages</h2>
            <ul>
                {langs.map(lang =>
                    <li key={lang}>
                        {lang}
                    </li>
                )}
            </ul>
            <img src={country.flags.png}
                 alt="Flag" />
        </div>
    )
}

const ListCountries = ({ countries }) => {
// List all the countries that are given and show different information depending
// on the amount of countries
   
    if (countries.length === 1) {
        return (
            <CountryInfo country={countries[0]} />
        )


    } else if (countries.length <= 10) {
        // sort countries alphabetically
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
