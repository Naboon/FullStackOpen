import React from 'react'

const Person = ({ person, handleRemove }) => {
    return (
      <div>
        {person.name} {person.number}
        <button type="submit" onClick={() => handleRemove(person.id, person.name)}>delete</button>
      </div>
    )
  }

const ListPersons = ({ persons, handleRemove }) =>
    persons.map(person => 
      <Person key={person.name} person={person}  handleRemove={handleRemove}/>)

export default ListPersons