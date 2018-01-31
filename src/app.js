import './app.styl';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import Square from './components/square';

class App extends Component {
  render() {
    return (
      <div className='board'>
        {this.props.game.map((xRow, x) => {
          return xRow.map((yRow, y) => {
            return <Square
              key={y}
              actions={this.props.actions}
              {...this.props.game[x][y]}
            ></Square>;
          });
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
