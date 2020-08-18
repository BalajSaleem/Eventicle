import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const location =  {lat: this.props.activity.lat, lng: this.props.activity.lng}
        return (
            <Map google={this.props.google} zoom={14} initialCenter={ location }>

                <Marker title={this.props.activity.title}
                    name={this.props.activity.title}
                    position={ location } />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBAe7w05o_4IspGDRcdlgGj4JWvbrxc3UU")
})(MapContainer)