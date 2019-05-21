import React, { Component } from "react";
import location from "../images/location-24px.svg";
import time from "../images/time-24px.svg";
import { TimePicker } from 'antd';
import moment from 'moment';

class LocationAndTime extends Component {
  state = {
  };

  componentDidMount() {}

  render() {
    return (
      <form className="locationAndTime">
        <div>
          <label htmlFor="location">
            <img src={location} alt="location" className="" />
          </label>
          {getLocationRender(this.props)}
        </div>
        <div>
          <label htmlFor="time">
            <img src={time} alt="time" />
          </label>
          {getTimeRender(this.props)}
        </div>
      </form>
    );
  }
}

function getLocationRender(props) {
  if (!props.readonly)
    return (
      <select id="location" className="dropdown">
        {props.locations.map(location => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    );
  else
    return (
      <div id="location" className="dropdown">
        TODO: Location Sync
      </div>
    );
}

function getTimeRender(props) {
 const format = 'HH:mm';
 if(props.readonly) {
    return <TimePicker className="dropdown" defaultValue={moment(props.meetingTime,format)} minuteStep={15} format={format} disabled/>;
 } else {
    return <TimePicker className="dropdown" defaultValue={moment(moment(),format)} minuteStep={15} format={format}/>
 }
}

export default LocationAndTime;
