import { Route, Routes } from 'react-router-dom';

import './App.css'
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import Algorithms from'./pages/Algorithms';
import Statistics from './pages/Statistics';
import AboutPage from './pages/About';

function App() {
  return (<>
    <NavBar />

    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path='algos' element={ <Algorithms /> } />
      <Route path='stats' element={ <Statistics /> } />
      <Route path='about' element={ <AboutPage /> } />
    </Routes>
  </>);
}

export default App;