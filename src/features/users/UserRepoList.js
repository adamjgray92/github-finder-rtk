import { useSelector } from 'react-redux';
import UserRepoItem from './UserRepoItem';

import { getUserRepos } from './usersSlice';

const UserRepoList = () => {
  const repos = useSelector(getUserRepos);
  return (
    <div className='rounded-lg shadow-md card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>Top Repositories</h2>
        {repos.map((repo) => (
          <UserRepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default UserRepoList;
