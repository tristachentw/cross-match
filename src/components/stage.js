import './stage.styl';
import { Component, PropTypes } from 'react';
import Square from './square';

export default class Stage extends Component {
  render() {
    return (
      <div className='stage'>
        {this.props.game.squares.map((xRow, x) => {
          return xRow.map((yRow, y) => {
            return <Square
              key={y}
              actions={this.props.actions}
              {...this.props.game.squares[x][y]}
            ></Square>;
          });
        })}
      </div>
    );
  }
}
