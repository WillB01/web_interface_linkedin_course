import React, { Component } from 'react';
import './App.css';
import AptList from './components/AptList';
import AddAppointment from './components/AddAppointment';
import SearchAppointments from './components/SearchAppointments';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myAppointments: [],

    }
  }
  componentDidMount() {
    let customData = require('./data/data.json');
    this.serverRequest = customData;
    this.setState({
      myAppointments: customData
    });
    
  }

 componentWillMount() {

 }

 deleteMessage(item) {
   let allApts = this.state.myAppointments;
   let newApts = allApts.filter((obj) => 
    obj !== item
   );
   this.setState({
    myAppointments: newApts
   });

 }

 toggleApt() {
   let isShow = this.state.aptBodyVisible ? false : true;
   this.setState({
    aptBodyVisible: isShow
   });
 }

 addItem(tempItem) {
  let tempApts = this.state.myAppointments;
  tempApts.push(tempItem);
  this.setState({
    myAppointments: tempApts
  });
 }

 onReOrder(orderBy, orderDir) {
   this.setState({
    orderBy: orderBy,
    orderDir: orderDir
   });
 }

 searchApts(value) {
  this.setState({
    queryText: value
  });
 }

  render() {
    let _ = require('lodash');
    let filteredApts = []
    let orderBy = this.state.orderBy;
    let orderDir = this.state.orderDir;
    let queryText = this.state.queryText;
    let myAppointments = this.state.myAppointments;

    myAppointments.forEach(function(item) {
      if(
        item.petName.toLowerCase().indexOf(queryText) !== -1 ||
        item.ownerName.toLowerCase().indexOf(queryText) !== -1 ||
        item.aptDate.toLowerCase().indexOf(queryText) !== -1 ||
        item.aptNotes.toLowerCase().indexOf(queryText) !== -1) {
          filteredApts.push(item);

      }
    });

    filteredApts = _.orderBy(filteredApts, function(item) {
      return item[orderBy].toLowerCase();
    },orderDir);
 
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = {index}
                 singleItem = {item}
                 whichItem = {item}
                 onDelete = {this.deleteMessage.bind(this)} />
      )
    }.bind(this));

    return (
     <div>
       <div className="item-list media-list">
        <AddAppointment bodyVisible={this.state.aptBodyVisible}
                        handleToggle={this.toggleApt.bind(this)}
                        addApt={this.addItem.bind(this)} />

         <SearchAppointments orderBy={this.state.orderBy} 
                             orderDir={this.state.orderDir} 
                             onReOrder={this.onReOrder.bind(this)} 
                             onSearch={this.searchApts.bind(this)}/>
          <ul className="item-list media-list">
          {filteredApts}
          </ul>
       </div>
     </div>
    );
  }
}

export default App;
