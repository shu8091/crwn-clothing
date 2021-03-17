import React from 'react';
import UserProfile from './components/test/user-profile';
import UserList from './components/test/user-list';
import './AppForTest.scss';

const AppForTest = () => (
  <div className='AppForText'>
    <UserList></UserList>
    <UserProfile name='Bill' email='bill@email.com' />
  </div>
)

export default AppForTest;