import {
  GET_USERS_SUCCESS1,
  GET_USERS_FAIL1,
  ADD_USER_SUCCESS1,
  ADD_USER_FAIL1,
  UPDATE_USER_SUCCESS1,
  UPDATE_USER_FAIL1,
  DELETE_USER_SUCCESS1,
  DELETE_USER_FAIL1,
  GET_USER_PROFILE_SUCCESS1,
  GET_USER_PROFILE_FAIL1,
  FETCH_GOLDVAULTLIST_SUCCESS1,
  FETCH_GOLDVAULTLIST_FAILURE1,
  // FETCH_GOLDVAULTLIST_REQUEST 
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_GOLDVAULTLIST_SUCCESS1:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case FETCH_GOLDVAULTLIST_FAILURE1:
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

    case GET_USERS_SUCCESS1:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL1:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS1:

      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case ADD_USER_FAIL1:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS1:
      return {
        ...state,
        userProfile: action.payload,
      }

      case UPDATE_USER_SUCCESS1:
        return {
          
          // ...state,
          users: state.users.map(user =>
            // console.log("testreducer" +action.payload.id+"userid"+user.id)
           
            user.id.toString() === action.payload.id.toString()
              ? { user, ...action.payload }
              : user
          ),
        
        }
  
      case UPDATE_USER_FAIL1:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_USER_SUCCESS1:
        return {
          ...state,
          users: state.users.filter(
            user => user.id.toString() !== action.payload.toString()
          ),
        }
  
      case DELETE_USER_FAIL1:
        return {
          ...state,
          error: action.payload,
        }

    case GET_USER_PROFILE_FAIL1:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
