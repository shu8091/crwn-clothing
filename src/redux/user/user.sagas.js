import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser }from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

//----------------------------------------------
// Repeat snapshot code 
export function* getSnapshotFromUserAuth(userAuth, additionalData){
  try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    // console.log(userSnapshot);
  }catch(e){
    yield put(signInFailure(e.message));
  }
}

//----------------------------------------------
// Google sign in

export function* signInWithGoogle(){
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  }catch(e){
    yield put(signInFailure(e.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


//----------------------------------------------
// Email and password sign in

export function* signInWithEmail({payload: {email, password}}){
  try{
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  }catch(e){
    yield put(signInFailure(e.message))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}


//----------------------------------------------
// Check user session

export function* isUserAuthenticated(){
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  }catch(e){
    yield put(signInFailure(e.message))
  }
}

export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


//----------------------------------------------
// Sign out start

export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess())
  }catch(e){
    yield put(signOutFailure(e.message));
  }
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}


//----------------------------------------------
// Sign up start

export function* signUp({payload: { displayName, email, password }}){
  try{
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createUserProfileDocument(user, { displayName });
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  }catch(e){
    yield put(signUpFailure(e.message))
  }
}

export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}


//----------------------------------------------
// Sign up success

export function* signAfterSignUp({payload: { user, additionalData }}){
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signAfterSignUp)
}



//----------------------------------------------
// Export all user sagas

export function* userSagas(){
  yield all([
    call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}