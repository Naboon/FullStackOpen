import React, { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}> {text}</button>

const PrintAnecdote = ({ text, count }) => {
  return (
    <><div>{text}</div>
    <div>has {count} votes</div></>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [popular, setPopular] = useState(0)

  const setAnecdote = () => {
    // Valitsee satunnaisen anekdootin
    let i = Math.floor(Math.random() * anecdotes.length)
    
    // Vältetään saman anekdootin ilmaantuminen peräkkäin
    while (i === selected) {
      i = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(i)
  }

  const addVote = () => {
    // Lisää äänen taulukkoon ja laskee eniten ääniä saaneen anekdootin
    const voteArray = [...votes]
    voteArray[selected] += 1
    setVotes(voteArray)

    let max = voteArray[0]
    let maxI = 0

    for (let i = 1; i < voteArray.length; i++) {
      if (voteArray[i] > max) {
        maxI = i
        max = voteArray[i]
      }
    }
    setPopular(maxI)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <PrintAnecdote text={anecdotes[selected]} count={votes[selected]} />
      <div>
        <Button handleClick={addVote} text='vote' />
        <Button handleClick={setAnecdote} text='next anecdote' />
      </div>
      <h1>Anecdote with most votes</h1>
      <PrintAnecdote text={anecdotes[popular]} count={votes[popular]} />
    </div>
  )
}

export default App
