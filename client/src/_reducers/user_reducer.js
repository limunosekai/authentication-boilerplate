import * as actions from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case actions.REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      };
    case actions.AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
