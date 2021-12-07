import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListPersons from './components/ListPersons'
import PersonForm from './components/PersonsForm'
import Filter from './components/Filter'

  
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>add a new</h2>
      
      <PersonForm addPerson={
        addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <ListPersons persons={personsShown} />
    </div>
  )
}

export default App
