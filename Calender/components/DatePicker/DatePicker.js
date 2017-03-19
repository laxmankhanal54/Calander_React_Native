import React, { Component } from 'react'
import MyDatePicker from 'react-native-datepicker'

export default class DatePicker extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <MyDatePicker
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format='MMMM Do YYYY, h:mm A'
        mode="datetime"
        date={this.props.date}
        onDateChange={this.props.onDateChange}
        style={this.props.style}
        placeholder={this.props.placeholder}
      /> 
    )
  }
}