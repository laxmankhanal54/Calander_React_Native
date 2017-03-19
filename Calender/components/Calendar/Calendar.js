import React, { Component } from 'react'
import MyCalendar from 'react-native-calendar';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class Calendar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <MyCalendar
        eventDates={this.props.eventDates}
        events={this.props.events}
        scrollEnabled = {true}
        showControls = {true}
        dayHeadings={customDayHeadings}
        monthNames={customMonthNames}
        showEventIndicators={true}
        titleFormat={'MMMM YYYY'}
        prevButtonText={'Prev'}
        nextButtonText={'Next'}
        onDateSelect={this.props.onDateSelect}
        onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
        onTouchNext={(e) => console.log('onTouchNext: ', e)}
        onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
        onSwipeNext={(e) => console.log('onSwipeNext', e)}
        weekStart={0} 
      />
    )
  }

}


