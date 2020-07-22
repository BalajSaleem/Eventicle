import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14} initialCenter={this.props.activity.location}>

                <Marker title={this.props.activity.name}
                    name={this.props.activity.name}
                    position={this.props.activity.location} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBAe7w05o_4IspGDRcdlgGj4JWvbrxc3UU")
})(MapContainer)