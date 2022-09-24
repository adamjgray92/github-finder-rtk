import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Alert from './features/alerts/Alert';
import User from './features/users/User';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route path='/'>
              <Route
                index
                element={
                  <>
                    <Alert />
                    <Home />
                  </>
                }
              />
              <Route path='about' element={<About />} />
            </Route>
            <Route path='user/'>
              <Route index element={<Navigate replace to='/' />} />
              <Route path=':username' element={<User />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
