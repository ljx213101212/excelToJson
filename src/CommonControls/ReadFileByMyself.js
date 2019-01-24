import React, { Component } from 'react';
class ReadExcel extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }
  
      render() {
        return (
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
       )
      }
}

export default ReadExcel;