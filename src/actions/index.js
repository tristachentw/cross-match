import * as types from '../constants/action-type';

export const clickSquare = payload => {
  return {
    type: types.CLICK_SQUARE,
    payload: payload
  };
};

export const changeStageStatus = payload => {
  return {
    type: types.CHANGE_STAGE_STATUS,
    payload: payload
  };
};
