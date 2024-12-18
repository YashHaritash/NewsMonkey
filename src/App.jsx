import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

// const API = "https://newsapi.org/v2/top-headlines?country=us&apiKey=57f1029c0d784b5f82b7b64937b17043"

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={5}/>
      </div>
    )
  }
}
