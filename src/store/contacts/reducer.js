import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  FETCH_GOLDVAULTLIST_SUCCESS,
  FETCH_GOLDVAULTLIST_FAILURE,
  // FETCH_GOLDVAULTLIST_REQUEST 
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_GOLDVAULTLIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case FETCH_GOLDVAULTLIST_FAILURE:
      return {
        ...state,
        error: action.payload
      };
      // case FETCH_GOLDVAULTLIST_REQUEST:
      //   return {
      //     ...state,
      //     loading: true,
      //     error: null
      //   };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:

      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

      case UPDATE_USER_SUCCESS:
        return {
          
          // ...state,
          users: state.users.map(user =>
            // console.log("testreducer" +action.payload.id+"userid"+user.id)
           
            user.id.toString() === action.payload.id.toString()
              ? { user, ...action.payload }
              : user
          ),
        
        }
  
      case UPDATE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(
            user => user.id.toString() !== action.payload.toString()
          ),
        }
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
        }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
