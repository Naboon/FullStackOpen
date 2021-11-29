import React, { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}> {text}</button>
    
const Display = ({ text, counter }) => 
  <div>{text} {counter}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} 
        text='good' />
      <Button handleClick={neutralFeedback} 
        text='neutral' />
      <Button handleClick={badFeedback} 
        text='bad' />
      <h1>statistics</h1>
      <Display text='good' counter={good} />
      <Display text='neutral' counter={neutral} />
      <Display text='bad' counter={bad} />
    </div>
  )
}

export default App
