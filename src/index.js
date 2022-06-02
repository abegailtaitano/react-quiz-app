import React from 'react'
import ReactDOM from 'react-dom'
import Quiz from './Quiz'
import axios from 'axios'

const api = axios.create({
  baseUrl: 'https://localhost:3000/quiz'
})

function App() {
  return (
    <div className='App'>
      <Quiz />
    </div>
  )
}


const rootElement = document.getElementById('root')
ReactDOM.render(<App></App>, rootElement)
