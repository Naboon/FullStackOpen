import React, { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const ListPersons = ({ persons }) =>
    persons.map(person => 
      <Person key={person.name} person={person} />)

/*const Filter = ({ persons }) => {
  
  return (
    <div>
      filter shown with
      <input 
    </div>
  )
}*/
  
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => 
      person.name === newName)) {
      return (
        window.alert(`${newName} is already added to phonebook`)
      )
    }

    const personObject = {name: newName, number: newNumber}
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) => 
    setFilter(event.target.value)

  const personsShown = (filter === '')
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
        value={filter}
        onChange={handleFilterChange}
      />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}  
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ListPersons persons={personsShown} />
    </div>
  )

}

export default App
