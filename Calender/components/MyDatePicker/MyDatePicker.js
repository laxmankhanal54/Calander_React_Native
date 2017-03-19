import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <DatePicker
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format='MMMM Do YYYY, h:mm A'
        mode="datetime"
        date={this.props.date}
        onDateChange={this.props.onDateChange}
        placeholder={this.props.placeholder}
        style={this.props.style}
      /> 
    )
  }
}