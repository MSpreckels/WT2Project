import React, { Component } from "react";
import location from "../images/location-24px.svg";
import time from "../images/time-24px.svg";
import moment from "moment";

class LocationAndTime extends Component {
  state = {};

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
  if (props.readonly) {
    return (
      <div id="location" className="dropdown roundedBox">
        <option key={props.meetingLocation} value={props.meetingLocation}>
          {props.meetingLocation}
        </option>
      </div>
    );
  } else {
    return (
      <select
        onChange={props.onLocationChange}
        id="location"
        className="dropdown roundedBox widthWithIcon"
      >
        {props.locations.map(location => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    );
  }
}

function getTimeRender(props) {
  if (props.readonly) {
    return (
      <div id="time" className="roundedBox widthWithIcon">
        {moment()
          .add(props.meetingTime, "minutes")
          .format("HH:mm")}
      </div>
    );
    //return <TimePicker className="dropdown timepickDisabled" defaultValue={moment(props.meetingTime, format)} minuteStep={15} format={format} disabled/>;
  } else {
    return (
      <div className="timeRadioForm roundedBox widthWithIcon">
        <input
          type="radio"
          id="r1"
          name="selector"
          onClick={() => props.onTimeChange(0)}
          defaultChecked
        />
        <label className="roundedBox timeLabel" htmlFor="r1">
          Jetzt
        </label>
        <input
          type="radio"
          id="r2"
          name="selector"
          onClick={() => props.onTimeChange(5)}
        />
        <label className="roundedBox timeLabel" htmlFor="r2">
          5 min
        </label>
        <input
          type="radio"
          id="r3"
          name="selector"
          onClick={() => props.onTimeChange(15)}
        />
        <label className="roundedBox timeLabel" htmlFor="r3">
          15 min
        </label>
        <input
          type="radio"
          id="r4"
          name="selector"
          onClick={() => props.onTimeChange(30)}
        />
        <label className="roundedBox timeLabel" htmlFor="r4">
          30 min
        </label>
      </div>
    );
    //return <TimePicker onChange={props.onTimeChange} className="dropdown" defaultValue={moment(moment(), format)} minuteStep={15} format={format} />
  }
}

export default LocationAndTime;
