import React, { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}> {text}</button>
    
const Display = ({ text, number, endText }) => 
  <div>{text} {number} {endText}</div>

const Average = ({ good, neutral, bad }) =>
  (good - bad) / (good + neutral + bad)

const PositivePortion = ({ good, neutral, bad }) =>
  100 * good / (good + neutral + bad)

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
      <Display text='good' number={good} endText='' />
      <Display text='neutral' number={neutral} endText='' />
      <Display text='bad' number={bad} endText='' />
      <Display text='all' number={good + neutral + bad} endText='' />
      <Display text='average' number={<Average good={good}
        neutral={neutral} bad={bad} />} endText='' />
      <Display text='positive' number={<PositivePortion good={good}
        neutral={neutral} bad={bad} />} endText='%' />
    </div>
  )
}

export default App
