import UserResults from '../features/users/UserResults';
import UserSearch from '../features/users/UserSearch';

const Home = () => {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default Home;
