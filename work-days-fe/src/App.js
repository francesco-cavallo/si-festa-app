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
    {name: 'Domenica', value: 0},
    {name: 'Lunedi', value: 1},
    {name: 'Martedì', value: 2},
    {name: 'Mercoledì', value: 3},
    {name: 'Giovedì', value: 4},
    {name: 'Venerdì', value: 5},
    {name: 'Sabato', value: 6},
  ]

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage baseURL={baseURL} />} />
        <Route path='/publicHolidays' element={<NationalHolidays baseURL={baseURL} giorni={giorni} />} />
        <Route path='/longWeekends' element={<LongWeekend baseURL={baseURL} giorni={giorni} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
