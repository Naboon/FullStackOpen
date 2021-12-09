import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'


const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])

    const handleFilterChange = (event) =>
        setFilter(event.target.value)
  
    const FilteredCountries= (filter === '')
        ? countries
        : countries.filter(country =>
                country.name.common.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
              <Filter filter={filter} handleFilterChange={handleFilterChange} />
              <ListCountries countries={FilteredCountries} />
        </div>
    );
}

export default App
