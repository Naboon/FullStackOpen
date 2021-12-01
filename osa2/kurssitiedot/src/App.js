import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>
    </div>
  )
}

/*const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises +
          props.parts.parts[2].exercises}
      </p>
    </div>
  )
}*/

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App