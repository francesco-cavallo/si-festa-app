// import logo from './logo.svg';
import './App.css';
import { useState } from "react";

const baseURL = 'http://localhost:3001'

function App() {

  // Da migliorare:
  //  magari l'input dell'anno può essere una select

  const d = new Date();
  const currentYear = d.getFullYear()

  const [ year, setYear ] = useState(currentYear)
  console.log('year', year);

  const handleChange = e => {
    const target = e.target
    setYear(target.value)
  }

  function longWeekend() {
    fetch(`${baseURL}/longWeekend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ currentYear })
      // body: JSON.stringify({ input.value })
      body: JSON.stringify({ year })
    })
      .then(data => data.json())
      .then(json => alert(JSON.stringify(json, null, 2)))
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <form method='post' action={baseURL + '/provaPOST'}> */}
        <form action={'#'}>
          <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange}/>
          <input type={'submit'} />
        </form>
      <button onClick={availableCountries}>availableCountries (first only)</button>
      <button onClick={countryInfo}>countryInfo (Italy only)</button>
      <button onClick={longWeekend}>longWeekend (2024 - Italy only)</button>
      <button onClick={publicHolidays}>publicHolidays (2024 - Italy only)</button>
      <button onClick={isTodayPublicHoliday}>isTodayPublicHoliday (Italy only)</button>
      </header>
    </div>
  );
}

function availableCountries() {
  fetch(`${baseURL}/availableCountries`, {
    method: 'GET'
  })
    .then(data => data.json())
    .then(json => alert(JSON.stringify(json, null, 2)))
}

function countryInfo() {
  fetch(`${baseURL}/countryInfo`, {
    method: 'GET'
  })
    .then(data => data.json())
    .then(json => alert(JSON.stringify(json, null, 2)))
}

// function longWeekend() {
//   fetch(`${baseURL}/longWeekend`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     // body: JSON.stringify({ currentYear })
//     // body: JSON.stringify({ input.value })
//     body: JSON.stringify({  })
//   })
//     .then(data => data.json())
//     .then(json => alert(JSON.stringify(json, null, 2)))
// }

function publicHolidays() {
  fetch(`${baseURL}/publicHolidays`, {
    method: 'GET'
  })
    .then(data => data.json())
    .then(json => alert(JSON.stringify(json, null, 2)))
}

function isTodayPublicHoliday() {
  fetch(`${baseURL}/isTodayPublicHoliday`, {
    method: 'GET'
  })
    // .then(data => data.json())
    // .then(json => alert(JSON.stringify(json, null, 2)))
}

export default App;
