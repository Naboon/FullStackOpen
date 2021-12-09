import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
// Filter countries according to the text input

  return (
    <div>
      <label htmlFor="filter">find countries</label>
      <input id="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}
    
export default Filter
