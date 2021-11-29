import React, { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}> {text}</button>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  
  return (
    <>
    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div>
      average {(good - bad) / (good + neutral + bad)}
    </div>
    <div>
      positive {100 * good / (good + neutral + bad)} %
    </div>
    </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
