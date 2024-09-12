import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage.components/MainPage';
import LoginPage from './components/loginRegisterPage.components/LoginPage';
import RegisterPage from './components/loginRegisterPage.components/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/main' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;