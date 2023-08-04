import React from 'react'
import { render } from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

export const endpoint = 'http://localhost:8000'

const root = document.getElementById('root')
render(<App />, root)