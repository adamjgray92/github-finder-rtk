import React from 'react';
import { useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import UserItem from './UserItem';

import { getUsers, getUsersStatus } from './usersSlice';

const UserResults = () => {
  const users = useSelector(getUsers);
  const status = useSelector(getUsersStatus);

  if (status === 'loading') {
    return <SpinnerDotted size={70} style={{ margin: '0 auto' }} />;
  }

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user) => (
        <UserItem key={user.id} name={user.login} avatarUrl={user.avatar_url} />
      ))}
    </div>
  );
};

export default UserResults;
