import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('XpffHMoGUOyCy9EwmLRm').collection('cartItems').doc('E8akNxu7GZzYBQs2XCTa');
firestore.doc('/users/XpffHMoGUOyCy9EwmLRm/cartItems/E8akNxu7GZzYBQs2XCTa')
firestore.collection('/users/XpffHMoGUOyCy9EwmLRm/cartItems')