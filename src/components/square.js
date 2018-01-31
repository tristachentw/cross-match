import './square.styl';
import { Component, PropTypes } from 'react';
import gameSetting from '../app.json';

export default class Square extends Component {
  handleClick = e => {
    this.props.actions.clickSquare({
      x: this.props.x,
      y: this.props.y,
      color: this.props.color,
      isEmpty: this.props.isEmpty
    });
  }

  render() {
    let size = gameSetting.size_square,
        style = {
          top: size * this.props.x,
          left: size * this.props.y,
          background: this.props.color
        };
    return <div className='square' style={style} onClick={this.handleClick}></div>;
  }
}
