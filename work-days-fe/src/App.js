// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
// Routing
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import NationalHolidays from './pages/NationalHolidays';
import LongWeekend from './pages/LongWeekend';

// Da migliorare:
//  magari l'input dell'anno può essere una select

function App() {

  const baseURL = 'http://localhost:3001'
  const giorni = [
    {name: 'Lunedi', value: 0},
    {name: 'Martedì', value: 1},
    {name: 'Mercoledì', value: 2},
    {name: 'Giovedì', value: 3},
    {name: 'Venerdì', value: 4},
    {name: 'Sabato', value: 5},
    {name: 'Domenica', value: 6},
  ]

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage baseURL={baseURL} />} />
        <Route path='/publicHolidays' element={<NationalHolidays baseURL={baseURL} />} />
        <Route path='/longWeekends' element={<LongWeekend baseURL={baseURL} giorni={giorni} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
