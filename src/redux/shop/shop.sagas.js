import { takeEvery, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import { ShopActionTypes } from './shop.types';

export function* fetchCollectionsAsync(){
  yield console.log('I am fired');
  try{
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // use "call method" in case this code takes longer than we expect
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  }catch(err){
    yield put(fetchCollectionsFailure(err.message));
  }
};

// listen for fetchCollectionsAsync
export function* fetchCollectionsStart(){
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
};

export function* shopSagas(){
  yield all([
    call(fetchCollectionsStart)
  ]);
}