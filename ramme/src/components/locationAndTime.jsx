import React, { Component } from "react";
import location from "../images/location-24px.svg";
import time from "../images/time-24px.svg";

class LocationAndTime extends Component {
  state = {
    locations: [
      { key: "mensabo", value: "Mensa BO" },
      { key: "mensarub", value: "Mensa RUB" },
      { key: "qwest", value: "Q-West" },
      { key: "bistrorub", value: "Bistro RUB" }
    ],
    times: []
  };

  render() {
    return (
      <form className="locationAndTime">
        <div>
          <label htmlFor="location">
            <img src={location} alt="location" className="" />
          </label>
          <select id="location" className="dropdown">
            {this.state.locations.map(location => (
              <option key={location.key} value={location.key}>
                {location.value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time">
            <img src={time} alt="time" />
          </label>
          <select id="time" className="dropdown">
            <option value="1100">11.00 Uhr</option>
            <option value="1130">11.30 Uhr</option>
            <option value="1200">12.00 Uhr</option>
            <option value="1230">12.30 Uhr</option>
          </select>
        </div>
      </form>
    );
  }
}

export default LocationAndTime;
