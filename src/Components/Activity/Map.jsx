import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {  eventLocation: { lat: 39.907467, lng: 32.802582 } }
    
    this.setMarker = this.setMarker.bind(this);
  
  }
  moveMarker(coord){
    console.log('Marker dropped at: ')
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat + " " + lng)
    //Pass these back
    this.props.handleLocation(lat, lng);

    this.setState({
      eventLocation:  {lat, lng}
    })
  }

  setMarker(t, map, coord){
    console.log('Marker placed at: ')
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat + " " + lng)
    this.setState({
      eventLocation:  {lat, lng}
    })
  }



  render() {
    return (                           //add on click{setMarker} to place marker on click
      <Map google={this.props.google} zoom={18} initialCenter={this.state.eventLocation}  >
        <Marker
          title="Location"
          id={1}
          position={this.state.eventLocation}
          draggable={true}
          onDragend={(t, map, coord) => this.moveMarker(coord) }
        >
        </Marker>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBAe7w05o_4IspGDRcdlgGj4JWvbrxc3UU")
})(MapContainer)