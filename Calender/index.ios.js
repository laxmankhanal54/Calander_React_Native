
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
  Button,
  Keyboard
} from 'react-native';

import Calendar from 'react-native-calendar';
import moment from 'moment';
// import DatePicker from 'react-native-datepicker';
import DatePicker from './components/MyDatePicker'

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const eventList = ['event 1', 'event 2', 'event 3', 'event 4', 'event 5'];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, 
    backgroundColor: '#f7f7f7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  seperator: {
    backgroundColor: '#000000',
    // marginTop: -55,
    height: 1
  },
  event_heading_container: {
    backgroundColor: '#48BBEC'
  },
  event_heading_text: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 17
  },
  row_container: {
    flexDirection: 'row',
    padding: 10
  },
  add_event_button:  {
    position: 'absolute',
    bottom: 20,
    left: 64,
    right: 64,
    backgroundColor: '#48BBEC',
  },
  add_event_Text: {
    fontSize: 17,
    padding: 5,
    textAlign: 'center'
  },
  button: {
    borderRadius: 5,
    flexGrow: 1,
    marginTop: 10,  marginBottom: 16, marginLeft: 16,  marginRight: 16,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#48BBEC'
  },
  button_Text: {
    color: '#ffffff',
    textAlign: 'center'
  },
  event_input: {
    padding: 6,
    height: 35,
    marginBottom: 10, marginLeft: 16, marginRight: 16,
    fontSize: 14,
    borderWidth: 1,
    flexGrow: 1,
    borderColor: '#48BBEC',
    borderRadius: 5,
  },
  event_text: {
    paddingTop: 10, paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  modal_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal_inner_container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 5,
  },
  date_picker: {
    paddingLeft: 24, 
    paddingRight: 8 , 
    paddingTop: 10,
    flexGrow: 1
  }

});

export default class Calender extends Component {
    constructor(props) {
      super(props);
      var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        inputFieldHeight: 0,
        addEvent: false,
        transparent: true,
        isModalVisible: false,
        startDate: '',
        endDate: '',
        selectedDate: moment(new Date()).format('MMMM DD YYYY, h:mm A'),
        dataSource: dataSource.cloneWithRows(eventList),
      };
    }
  _didSelectStartDate(date) {
    console.log('didselectstartdate')
    this.setState({startDate: date});
  }

  _didPressAddEvent() {
    this.setState({addEvent: true});
    this.setState({isModalVisible: true});
  }

  _didFinishAddingEvent() {
    this.setState({addEvent: false});
  }

  _didBeginScrolling() {
    Keyboard.dismiss();
  }

  _didSelectDate(date) {
    var newDate = moment(new Date(date)).format('DD-MM-YYYY');
    this.setState({selectedDate: newDate});
  }

  _didPressCancel() {
    //TODO: dismiss the view to add activity
    this.setState({isModalVisible: false});
  }

  _didPressDone() {
    //TODO: send the activity to the server.
    this.setState({isModalVisible: false});
    console.log(this.state.isModalVisible)
  }

  _renderEventList() {
    if (this.state.addEvent) {
      return (
          <Modal 
            animationType = {'slide'}
            onRequestClose={() => {alert("Modal has been closed.")}}
            transparent={true}
            visible={this.state.isModalVisible}>
            <View style = {styles.modal_container}>

              <View style = {styles.modal_inner_container}>
                <Text style = {styles.event_text}>Activity</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                  <Text>Title</Text>
                  <TextInput  
                    onContentSizeChange={(event) => {
                      this.setState({height: event.nativeEvent.contentSize.height});
                    }}
                    style={[styles.event_input, {marginLeft: 62}]}
                    placeholder='e.g., Breakfast at John's
                  />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                  <Text>Description</Text>
                  <TextInput 
                    multiline={true}  
                    onContentSizeChange={(event) => {
                      this.setState({height: event.nativeEvent.contentSize.height});
                    }}
                    style={[styles.event_input, {height: Math.max(35, this.state.height)}]}
                    placeholder='e.g., Breakfast at John's
                  />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                  <Text>Start Date</Text>
                  <DatePicker
                    date={this.state.startDate}
                    onDateChange={(date) => {this.setState({startDate: date})}}
                    style={styles.date_picker}
                    placeholder = {this.startDate}
                  /> 
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                  <Text>End Date</Text>
                  <DatePicker
                    date={this.state.endDate}
                    onDateChange={(date) => {this.setState({endDate: date})}}
                    style={[styles.date_picker, {paddingLeft: 30}]}
                    placeholder = {'Pick End Date'}
                  /> 
                </View>

                <View style={[{flexDirection: 'row'}]}>
                  <TouchableHighlight style = {[styles.button]}>
                    <Text style = {styles.button_Text} onPress = {this._didPressCancel.bind(this)}> Cancel</Text>
                  </TouchableHighlight> 
                   <TouchableHighlight style = {[styles.button]}>
                    <Text style = {styles.button_Text} onPress = {this._didPressDone.bind(this)}> Done</Text>
                  </TouchableHighlight>                               
                </View> 

              </View>

            </View>
          </Modal>
        );
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return(  
      <View style = {styles.rowContainer}> 
        <Text> {rowData} </Text>
      </View>);
  }

  render() {
    console.log('startDate', this.state.startDate)
    console.log('endDate', this.state.endDate)
    return (
      <View style={styles.container}>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <Calendar
            eventDates={['2017-02-14', '2017-02-15', '2016-07-28', '2016-07-30']}
            events={[{date: '2017-02-14', hasEventCircle: {backgroundColor: 'powderblue'}}]}
            scrollEnabled = {true}
            showControls = {true}
            dayHeadings={customDayHeadings}
            monthNames={customMonthNames}
            showEventIndicators={true}
            titleFormat={'MMMM YYYY'}
            prevButtonText={'Prev'}
            nextButtonText={'Next'}
            onDateSelect={(date) => this._didSelectDate(date)}
            onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
            onTouchNext={(e) => console.log('onTouchNext: ', e)}
            onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
            onSwipeNext={(e) => console.log('onSwipeNext', e)}
            weekStart={0} 
          />
        </View>

        <View style={styles.seperator}/>

        <View style = { styles.event_heading_container }> 
          <Text style = {styles.event_heading_text}> Event for {this.state.selectedDate.toString()} </Text>
        </View>

        <ListView 
          dataSource = {this.state.dataSource}
          visible={this.state.addEvent}
          renderRow = {(rowData) =>       
            <View style = {styles.row_container}> 
              <Text> {rowData} </Text>
            </View> 
          }
        />        

        {this._renderEventList()}

        <TouchableHighlight style = {styles.add_event_button}>
          <Text style = {styles.add_event_Text} onPress = {this._didPressAddEvent.bind(this)}> Add Event</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

AppRegistry.registerComponent('Calender', () => Calender);
