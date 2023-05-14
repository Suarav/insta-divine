import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="">
      <Routes>
        <Route exact path="/" element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;
