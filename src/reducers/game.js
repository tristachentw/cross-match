import * as types from '../constants/action-type';
import gameSetting from '../app.json';
import randomColor from 'randomcolor';

const useFloor = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const resetSquare = obj => {
  return {
    ...obj,
    color: '',
    isEmpty: false
  };
};

const initialGame = () => {
  let { num_row, num_pair_square } = gameSetting;

  //create array
  const squares = Array(num_row).fill(0).map((_, x) => {
    return Array(num_row).fill(0).map((_, y) => {
      return { x, y, isEmpty: true };
    });
  });

  //create color square
  for (let i = 0; i < num_pair_square; i++) {
    let color = randomColor();
    for (let j = 0; j < 4; j++) {
      let flag = false;
      while(!flag) {
        let x = useFloor(0, num_row - 1);
        let y = useFloor(0, num_row - 1);
        if (squares[x][y].isEmpty) {
          squares[x][y] = {
            x, y, color,
            isEmpty: false
          };
          flag = true;
        }
      }
    }
  }
  console.log(squares)
  return squares;
};

const eliminate = (onTriggerPoint, state) => {
  let checkX = onTriggerPoint.x,
      checkY = onTriggerPoint.y,
      checks = [],
      check = checkX;
  let { num_row, num_pair_square } = gameSetting;

  const fn = (isX, isIncrement, onTriggerPoint) => {
    const target = isX ? onTriggerPoint.x : onTriggerPoint.y;
    if (isIncrement) {
      for (let i = target; i < num_row; i++) {
        const tt = isX ? state[i][onTriggerPoint.y] : state[onTriggerPoint.x][i];
        if (!tt.isEmpty) {
          checks[checks.length] = tt;
          break;
        }
      }
    } else {
      for (let i = target; i > -1; i--) {
        const tt = isX ? state[i][onTriggerPoint.y] : state[onTriggerPoint.x][i];
        if (!tt.isEmpty) {
          checks[checks.length] = tt;
          break;
        }
      }
    }
  };

  fn(true, true, onTriggerPoint);
  fn(true, false, onTriggerPoint);
  fn(false, true, onTriggerPoint);
  fn(false, false, onTriggerPoint);

  var newState = state.map(s => s);
  let checkPos = [];
  for (let i = 0; i < checks.length; i++) {
    for (let j = i+1; j < checks.length; j++) {
      if (checks[i].color === checks[j].color) {
        newState[checks[i].x][checks[i].y] = resetSquare(newState[checks[i].x][checks[i].y]);
        newState[checks[j].x][checks[j].y] = resetSquare(newState[checks[j].x][checks[j].y]);
      }
    }
  }
  return newState;
};

const game = (state = initialGame(), action) => {
  switch (action.type) {
  case types.NEW_GAME:
    return initialGame();
  case types.ELIMINATE:
    return eliminate(action.payload, state);
  }
  return state;
};

export default game;
