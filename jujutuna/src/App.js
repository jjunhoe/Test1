import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/header.components/Layout';
import LoginPage from './components/loginRegisterPage.components/LoginPage';
import RegisterPage from './components/loginRegisterPage.components/RegisterPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;