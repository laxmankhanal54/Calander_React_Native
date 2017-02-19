import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  render(){
    return (
      <DatePicker
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format='MMMM Do YYYY, h:mm A'
        mode="datetime"
        date={this.state.endDate}
        onDateChange={(date) => {this.setState({endDate: date})}}
        style={[styles.date_picker, {paddingLeft: 30}]}
        placeholder = {'Pick End Date'}
      /> 
    )
  }
}