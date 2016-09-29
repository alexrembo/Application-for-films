import React, { Component } from 'react'
import { Link } from 'react-router'
import './style.scss'

export default class App extends Component {
  render() {
    //our heading will be visible from any page 
    //by clicking on it, you can return to the home page
    const { children } = this.props
    return <div>
      <h1><Link onlyActiveOnIndex={true} to='/movies'>Alex Films</Link></h1>
      <div className='content'>
        {children} 
      </div>
    </div>
  }
}


