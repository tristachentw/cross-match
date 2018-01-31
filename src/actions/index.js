import * as types from '../constants/action-type';

export const eliminate = payload => {
  return {
    type: types.ELIMINATE,
    payload: payload
  };
};
