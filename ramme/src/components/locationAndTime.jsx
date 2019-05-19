import React, { Component } from "react";
import location from "../images/location-24px.svg";
import time from "../images/time-24px.svg";

class LocationAndTime extends Component {
    state = {
        times: []
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
    if (!props.readonly)
        return (
            <select id="time" className="dropdown">
                <option value="1100">11.00 Uhr</option>
                <option value="1130">11.30 Uhr</option>
                <option value="1200">12.00 Uhr</option>
                <option value="1230">12.30 Uhr</option>
            </select>
        );
    else
        return (
            <div id="time" className="dropdown">
                TODO: Time Sync
            </div>
        );
}

export default LocationAndTime;
