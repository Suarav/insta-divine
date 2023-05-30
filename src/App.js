import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiService from './services/apiService';
import SchedulePage from './pages/schedule';
import ActionProfile from './pages/actionProfile';

function App() {
  const [isAuthUser, setIsAuthUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const authApiUser = async () => {

    const res = await apiService.authApiUser(Cookies.get('_dul_s'))
    if (res.success == 1) {
      setIsAuthUser(res)
      Cookies.set('api_key', res.api_key)
      setIsLoading(false)
    }
    else {
      window.location = "https://dev.divineapi.com/"
    }
  }
  useEffect(() => {
    authApiUser()
  }, [])
  return (

    <div className="">
      {
        isLoading && <div className="loader">
          Loading...
        </div>
      }
      <Routes>
        <Route exact path="/" element={
          isAuthUser ?
            <Profile />
            :
            <NotFound />
        } />
        <Route exact path="/schedule" element={<SchedulePage />} />
        <Route exact path="/actionProfile" element={<ActionProfile />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
