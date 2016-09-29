import React, { Component } from 'react'

export default class AddForm extends Component {
  render() {
  const { visibleAddForm, add } = this.props; 
  return <div className='col-xs-6 col-xs-offset-2 col-md-7 col-md-offset-3 funcAdd'>
    <form className={'form-inline ' + (visibleAddForm ? '': 'none')} role='form' method='POST' id='formAdd' action='javascript:void(null);' onSubmit={add}>
     <div className='form-group'>
      <label htmlFor='title'>Title</label>
        <input id='title' className='form-control' name='title' type='text' placeholder='Enter Title' required></input>
        <label htmlFor='year'>Year</label>
        <input id='year' className='form-control' name='year' type='text' placeholder='Year' pattern='19\d{2}|20\d{2}' required></input>
        <label htmlFor='format'>Format</label>
        <input id='format' className='form-control' name='format' type='text' placeholder='DVD or VHS' pattern='DVD|VHS|Blu-Ray'></input>
        <label htmlFor='stars'>Stars</label>
        <input id='stars' className='form-control' name='stars' type='text' placeholder='Enter with a comma' pattern='[\wа-яA-Я\,\s]+'></input>
        <button type='submit' className='btn btn-default'>Save</button>
      </div>
    </form>
  </div>
	}
}