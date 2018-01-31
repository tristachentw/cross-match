import './app.styl';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import Stage from './components/stage';

class App extends Component {
  render() {
    return (
      <div>
        <div>Score:{this.props.game.score}</div>
        <Stage {...this.props}></Stage>
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
