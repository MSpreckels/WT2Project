import React, { Component } from "react";
import location from "../images/location-24px.svg";
import time from "../images/time-24px.svg";

class LocationAndTime extends Component {
  state = {
    time
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
  var d = new Date();
  d.setMinutes(Math.floor(d.getMinutes() / 10) * 10 + 20);
  d = new Date(d);
  const h = d.getHours();
  const m = d.getMinutes();
  const time = (h > 9 ? "" : "0") + h + "." + (m > 9 ? "" : "0") + m;
  return (
    <div id="time" className="dropdown">
      <option value={time.replace(".", "")}>{time}</option>
    </div>
  );
}

export default LocationAndTime;
