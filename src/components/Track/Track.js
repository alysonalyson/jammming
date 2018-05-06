import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return (
        <div>
          <a onClick={this.removeTrack} className='Track-action'>'-'</a>
        </div>
      );
    } else {
      return (
        <div>
          <a onClick={this.addTrack} className='Track-action'>'+'</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
}
