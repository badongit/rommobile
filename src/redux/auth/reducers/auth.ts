import {
  GET_ME_FAILED,
  GET_ME_START,
  GET_ME_SUCCESS,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from 'src/redux/auth/actions';

const initialState = {
  isLoading: false,
  userInfo: {},
};

export default function auth(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_START:
    case LOGOUT_START:
    case GET_ME_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: {},
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };
    case LOGIN_FAILED:
    case LOGOUT_FAILED:
    case GET_ME_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
