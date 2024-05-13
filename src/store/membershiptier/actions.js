import {
  GET_USER_PROFILE1,
  GET_USER_PROFILE_FAIL1,
  GET_USER_PROFILE_SUCCESS1,
  GET_USERS1,
  GET_USERS_FAIL1,
  GET_USERS_SUCCESS1,
  ADD_NEW_USER1,
  ADD_USER_SUCCESS1,
  ADD_USER_FAIL1,
  UPDATE_USER1,
  UPDATE_USER_SUCCESS1,
  UPDATE_USER_FAIL1,
  DELETE_USER1,
  DELETE_USER_SUCCESS1,
  DELETE_USER_FAIL1,
  FETCH_GOLDVAULTLIST_SUCCESS1,
  FETCH_GOLDVAULTLIST_FAILURE1,
  // FETCH_GOLDVAULTLIST_REQUEST

} from "./actionTypes"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as apiname from "../../helpers/url_helper";

import { del, get, post, put } from "../../helpers/api_helper";





const fetchGoldvaultlistSuccess1 = (users) => ({
  type: FETCH_GOLDVAULTLIST_SUCCESS1,
  payload: users
});





const fetchGoldvaultlistFailure1 = (error) => ({
  type: FETCH_GOLDVAULTLIST_FAILURE1,
  payload: error
});


export const fetchGoldvaultlist1 = () => {

  return async (dispatch) => {
    try {
      get(apiname.membershiplist)
        .then((reslist) => {

          console.log("list");
          console.log(reslist);
          if (reslist.status == 200) {
            dispatch(fetchGoldvaultlistSuccess1(reslist.data.result));
           

          } else {
            dispatch(fetchGoldvaultlistFailure1('Failed to fetch data'));
          
          }
          })
    .catch((err) => console.log(err))
      
     
    } catch (error) {
      dispatch(fetchGoldvaultlistFailure1(error.message));
    
    }
  };
};

export const getUsers1 = () => ({
  type: GET_USERS1,
})

export const getUsersSuccess1 = users => ({
  type: GET_USERS_SUCCESS1,
  payload: users,
})


  export const addNewUser1 = (additionalFieldsArray) => {
    return async (dispatch) => {
      try {
        post(apiname.membershipadd, additionalFieldsArray)

       
          .then((reslist) => {
            
            if (reslist.status == 201) {
              dispatch(addUserSuccess1(reslist.data.result));
              toast.success('Gold Gram Added Successfully!');


            } else {
              dispatch(addUserFail1('Failed to fetch data'));
              toast.error('Failed to add!');

            }
            })
      .catch((err) => console.log(err))
        
       
      } catch (error) {
        dispatch(addUserFail1(error.message));
      }
    };

  
};

export const addUserSuccess1 = user => ({
  type: ADD_USER_SUCCESS1,
  payload: user,
})



export const addUserFail1 = error => ({
  type: ADD_USER_FAIL1,
  payload: error,
})

export const getUsersFail1 = error => ({
  type: GET_USERS_FAIL1,
  payload: error,
})

export const getUserProfile1 = () => ({
  type: GET_USER_PROFILE1,
})

export const getUserProfileSuccess1 = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS1,
  payload: userProfile,
})

export const getUserProfileFail1 = error => ({
  type: GET_USER_PROFILE_FAIL1,
  payload: error,
})






export const updateUser1 = (user) => {
   return async (dispatch) => {
    try {

      

      put(`${apiname.membershipedit}/${user.id}`,user)
        .then((updatereslist) => {
          if (updatereslist.status == 200) {
            dispatch(updateUserSuccess1(user));
            toast.success('Updated Successfully!');

          } else {
            dispatch(updateUserFail1('Failed to fetch data'));
            toast.error('Failed to update!');

          }
          })
    .catch((err) => console.log(err))
    } catch (error) {
      dispatch(updateUserFail1(error.message));
     
    }
  };
  
};






export const updateUserSuccess1 = user => ({
  type: UPDATE_USER_SUCCESS1,
  payload: user,
})

export const updateUserFail1 = error => ({
  type: UPDATE_USER_FAIL1,
  payload: error,
})




export const deleteUser1 = (user) => {
 
  return async (dispatch) => {
    try {
      del(`${apiname.membershipdelete}/${user}`)
        .then((resdelete) => {
          if (resdelete.status == 200) {
            dispatch(deleteUserSuccess1(user));
            toast.success('Deleted Successfully!');

          } else {
            dispatch(deleteUserFail1('Failed to Delete data'));
            toast.error('Failed to delete data!');
          }
          })
    .catch((err) => console.log(err))
      
     
    } catch (error) {
      dispatch(deleteUserFail1(error.message));
     
    }
  };
};


export const deleteUserSuccess1 = user => ({
  type: DELETE_USER_SUCCESS1,
  payload: user,
})

export const deleteUserFail1 = error => ({
  type: DELETE_USER_FAIL1,
  payload: error,
})
