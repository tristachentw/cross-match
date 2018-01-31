import * as types from '../constants/action-type';
import gameSetting from '../app.json';
import randomColor from 'randomcolor';

const useFloor = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const hideSquare = square => {
  square.color = '';
  square.isEmpty = true;
};

const initialSquares = () => {
  let { num_row, num_pair_square, seed } = gameSetting;

  //create squares
  const squares = Array(num_row).fill(0).map((_, x) => {
    return Array(num_row).fill(0).map((_, y) => {
      return { x, y, color: '', isEmpty: true };
    });
  });

  //create color squares
  for (let i = 0; i < num_pair_square; i++) {
    let color = randomColor();
    for (let j = 0; j < seed; j++) {
      let alreadyFillSquare = false;
      while (!alreadyFillSquare) {
        let x = useFloor(0, num_row - 1),
            y = useFloor(0, num_row - 1);
        if (squares[x][y].isEmpty) {
          squares[x][y] = { x, y, color, isEmpty: false };
          alreadyFillSquare = true;
        }
      }
    }
  }
  return squares;
};

const getCrossSquares = (onClickedSquare, state) => {
  let crossSquares = [],
      { num_row } = gameSetting;

  const getCrossSquare = (axis, isForward) => {
    const onClickedPos = onClickedSquare[axis],
          distance = isForward ? num_row - 1 - onClickedPos : onClickedPos;
    for (let i = 1; i <= distance; i++) {
      let square;
      const checkPos = isForward ? onClickedPos + i : onClickedPos - i;
      if (axis === 'x') {
        square = state[checkPos][onClickedSquare.y];
      } else {
        square = state[onClickedSquare.x][checkPos];
      }
      if (!square.isEmpty) {
        return square;
      }
    }
    return false;
  };

  ['x', 'y'].forEach(axis => {
    [true, false].forEach(isForward => {
      const square = getCrossSquare(axis, isForward);
      if (square) {
        crossSquares[crossSquares.length] = square;
      }
    });
  });

  return crossSquares;
};

const clickSquare = (square, state) => {
  let newState = state.map(item => item),
      crossSquares = getCrossSquares(square, state);

  for (let i = 0; i < crossSquares.length; i++) {
    for (let start = i + 1, j = start; j < crossSquares.length; j++) {
      let a = crossSquares[i],
          b = crossSquares[j];
      if (a.color === b.color) {
        hideSquare(newState[a.x][a.y]);
        hideSquare(newState[b.x][b.y]);
      }
    }
  }
  return newState;
};

const checkColorSquares = squares => {
  return squares.reduce((acc,cur) =>
    acc.concat(cur)
  , []).filter(item => !item.isEmpty).length;
};

const game = (state = {squares: initialSquares(), score: 0}, action) => {
  switch (action.type) {
  case types.NEW_GAME:
    return {
      squares: initialSquares(),
      score: 0
    };
  case types.CLICK_SQUARE:
    let oriLen = checkColorSquares(state.squares);
    let squares = clickSquare(action.payload, state.squares),
        newLen = checkColorSquares(squares),
        len = oriLen - newLen;

    return {
      squares,
      score: state.score + len
    };
  }
  return state;
};

export default game;
