import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAlert } from '../alerts/alertsSlice';
import { getUsers, searchUsers, clearUsers } from './usersSlice';

const UserSearch = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const users = useSelector(getUsers);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (search === '') {
      dispatch(setAlert({ message: 'Please enter something', type: 'error' }));
    } else {
      dispatch(searchUsers(search))
        .unwrap()
        .catch(() => setError('Something went wrong!'));
      setSearch('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={search}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
          {error ? <div className='mt-2 ml-5 text-red-500'>{error}</div> : null}
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className='btn btn-ghost btn-lg'
            onClick={() => dispatch(clearUsers())}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
