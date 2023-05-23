import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiService from './services/apiService';
function App() {
  const [isAuthUser, setIsAuthUser] = useState({})
  const authApiUser = async () => {
    const res = await apiService.authApiUser(Cookies.get('_dul_s'))
    if (res.success == 1) {
      setIsAuthUser(res)
      Cookies.set('api_key', res.api_key)
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
      <Routes>
        <Route exact path="/" element={
          isAuthUser ?
            <Profile />
            :
            <NotFound />
        } />
        <Route exact path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
