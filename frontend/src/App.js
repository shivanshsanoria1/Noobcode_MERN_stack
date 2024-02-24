import { Route, Routes } from 'react-router-dom';

import './App.css'
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Statistics from './pages/Statistics';

function App() {
  return (<>
    <NavBar />

    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path='stats' element={ <Statistics /> } />
      <Route path='about' element={ <AboutPage /> } />
    </Routes>
  </>);
}

export default App;