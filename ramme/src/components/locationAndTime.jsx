import React, { Component } from "react";

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
      <div className="">
        <ul className="dropdownList center">
          <li>
            <select className="dropdown">
              {this.state.locations.map(location => (
                <option key={location.key} value={location.key}>
                  {location.value}
                </option>
              ))}
            </select>
          </li>
          <li>
            <select className="dropdown">
              <option value="1100">11.00 Uhr</option>
              <option value="1130">11.30 Uhr</option>
              <option value="1200">12.00 Uhr</option>
              <option value="1230">12.30 Uhr</option>
            </select>
          </li>
        </ul>
      </div>
    );
  }
}

export default LocationAndTime;
