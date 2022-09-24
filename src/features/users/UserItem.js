import { Link } from 'react-router-dom';

const UserItem = ({ name, avatarUrl }) => {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatarUrl} alt={name} />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{name}</h2>
          <Link
            className='text-base-content text-opacity-40'
            to={`/user/${name}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
