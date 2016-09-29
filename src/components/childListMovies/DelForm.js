import React, { Component } from 'react'

export default class DelForm extends Component {
  render() {
  const { visibleDelForm, del } = this.props; 
  return <div className='col-xs-6 col-xs-offset-2 col-md-7 col-md-offset-5 funcDel'>
    <form className={'form-inline ' + (visibleDelForm ? '': 'none')} role='form' method='POST' id='formDelete' action='javascript:void(null);' onSubmit={del}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input id='title' className='form-control' name='title' type='text' placeholder='Enter Title' required></input>
        <button type='submit' className='btn btn-default'>Delete</button>
      </div>
    </form>
    </div>
	}
}