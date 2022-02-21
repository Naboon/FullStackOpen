import React, { useEffect, useState } from 'react'
import phoneBookService from './services/persons'
import ListPersons from './components/ListPersons'
import PersonForm from './components/PersonsForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

  
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => 
      person.name === newName)) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace
        the old number with a new one?`)) {
        
        const knownPerson = persons.find(person =>
          person.name === newName)

        return changeNumber(knownPerson.id, newNumber)
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
      
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    phoneBookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const changeNumber = (id, newNumber) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }

    phoneBookService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person: returnedPerson))
            setErrorMessage(`Updated number for ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
  }

  const handleRemove = (id, name) => {
    
    if (window.confirm(`Delete ${name}?`)) {
      phoneBookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setErrorMessage(`Removed ${name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('person not found in the database')
          setPersons(persons.filter(n => n.id !== id))
        })
      }
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
      <Notification message={errorMessage} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>add a new</h2>
      
      <PersonForm addPerson={
        addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <ListPersons persons={
        personsShown}
        handleRemove={handleRemove} />
    </div>
  )
}

export default App
