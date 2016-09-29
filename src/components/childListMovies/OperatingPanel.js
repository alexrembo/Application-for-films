import React, { Component } from 'react'

export default class OperatingPanel extends Component {
  render() {
  const { showAddForm, showDeleteForm, searchMovie, searchActor, loadFile ,sort, saveFile } = this.props; 
  return <div>
  <div className='button'>
      <button type='button' className='btn btn-primary add' onClick={showAddForm}>Add new movie</button>
      <button type='button' className='btn btn-danger sort' onClick={showDeleteForm}>Delete movie</button>
      <button type='button' className='btn btn-success sort' onClick={sort}>Sort</button>
      <button type='button' className='btn btn-info sort' onClick={saveFile}>Save file</button>
      </div>
      <div className='input'>
        <input id='loadFile' type='file' className='form-control' accept='text/plain' onChange={loadFile}></input>
        <input id='searchMovie' className='form-control' name='search' type='text' placeholder='Enter name of movie' onChange={searchMovie}></input>
        <input id='searchActor' className='form-control' name='search' type='text' placeholder='Enter name of actor' onChange={searchActor}></input>  
      </div>
    </div>
  }
}
