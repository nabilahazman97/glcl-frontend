import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USERS1, GET_USER_PROFILE1 , ADD_NEW_USER1, DELETE_USER1, UPDATE_USER1 } from "./actionTypes"

import {
  getUsersSuccess1,
  getUsersFail1,
  getUserProfileSuccess1,
  getUserProfileFail1,
  addUserFail1,
  addUserSuccess1,
  updateUserSuccess1,
  updateUserFail1,
  deleteUserSuccess1,
  deleteUserFail1,
} from "./actions"

//Include Both Helper File with needed methods
import { getUsers, getUserProfile , addNewUser, updateUser ,deleteUser } from "../../helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess1(response))
  } catch (error) {
    yield put(getUsersFail1(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess1(response))
  } catch (error) {
    yield put(getUserProfileFail1(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess1(response))
  } catch (error) {
    yield put(updateUserFail1(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess1(response))
  } catch (error) {
    yield put(deleteUserFail1(error))
  }
}

function* onAddNewUser({ payload: user }) {

  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess1(response))
  } catch (error) {

    yield put(addUserFail1(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS1, fetchUsers)
  yield takeEvery(GET_USER_PROFILE1, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER1, onAddNewUser)
  yield takeEvery(UPDATE_USER1, onUpdateUser)
  yield takeEvery(DELETE_USER1, onDeleteUser)
}

export default contactsSaga;
