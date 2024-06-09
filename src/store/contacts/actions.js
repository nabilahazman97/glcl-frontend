import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FETCH_GOLDVAULTLIST_SUCCESS,
  FETCH_GOLDVAULTLIST_FAILURE,
  // FETCH_GOLDVAULTLIST_REQUEST

} from "./actionTypes"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as apiname from "../../helpers/url_helper";

import { del, get, post, put } from "../../helpers/api_helper";





const fetchGoldvaultlistSuccess = (users) => ({
  type: FETCH_GOLDVAULTLIST_SUCCESS,
  payload: users
});


const fetchGoldvaultlistFailure = (error) => ({
  type: FETCH_GOLDVAULTLIST_FAILURE,
  payload: error
});


export const fetchGoldvaultlist = () => {

  return async (dispatch) => {
    try {
      get(apiname.Goldvaultlist)
        .then((reslist) => {
          if (reslist.status == 200) {
            dispatch(fetchGoldvaultlistSuccess(reslist.data.result));
           

          } else {
            dispatch(fetchGoldvaultlistFailure('Failed to fetch data'));
          
          }
          })
    .catch((err) => console.log(err))
      
     
    } catch (error) {
      dispatch(fetchGoldvaultlistFailure(error.message));
    
    }
  };
};

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})


  export const addNewUser = (additionalFieldsArray) => {
    return async (dispatch) => {
      try {

        
        var convertedArray = {
          "barcodes": additionalFieldsArray.map(obj => obj.barcodes)
        };
        // console.log("convertedArray");
        // console.log(convertedArray);

        post(apiname.Goldvaultadd, convertedArray)
          .then((reslist) => {
           
            if (reslist.status == 201) {
              // console.log("reslist.data");
              // console.log(reslist.data.result.length);
              reslist.data.result.forEach(user => {
                dispatch(addUserSuccess(user));
              });
              // dispatch(addUserSuccess(reslist.data.result[1]));
              toast.success('Gold Gram Added Successfully!');
            } else if(reslist.status == 200) {
              dispatch(addUserFail(reslist.data.message));
              toast.error(reslist.data.message+''+reslist.data.existingBarcodes);
              
            }else{
              dispatch(addUserFail('Failed to fetch data'));
              toast.error('Failed to add!');

            }
            })
      .catch((err) => console.log(err))
      } catch (error) {
        dispatch(addUserFail(error.message));
      }
    };

  
};

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})






export const updateUser = (user) => {
   return async (dispatch) => {
    try {
      put(`${apiname.Goldvaultedit}/${user.id}`,user)
        .then((updatereslist) => {
          if (updatereslist.status == 200) {
            dispatch(updateUserSuccess(user));
            toast.success('Updated Successfully!');
          } else {
            dispatch(updateUserFail('Failed to fetch data'));
            toast.error('Failed to update!');
          }
          })
    .catch((err) => console.log(err))
    } catch (error) {
      dispatch(updateUserFail(error.message));
     
    }
  };
  
};


export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})




export const deleteUser = (user) => {
 
  return async (dispatch) => {
    try {
      del(`${apiname.Goldvaultdelete}/${user}`)
        .then((resdelete) => {
          if (resdelete.status == 200) {
            dispatch(deleteUserSuccess(user));
            toast.success('Deleted Successfully!');

          } else {
            dispatch(deleteUserFail('Failed to Delete data'));
            toast.error('Failed to delete data!');
          }
          })
    .catch((err) => console.log(err))
      
     
    } catch (error) {
      dispatch(deleteUserFail(error.message));
     
    }
  };
};


export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})
