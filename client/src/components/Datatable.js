import React, { useEffect, useState } from 'react'
import '../styles/Datatable.css'

export default function Datatable() {
  /**results usestate for setting fetch data in table */
  const[results,setResults]=useState([]);
  
  /**fetching data from MongoDB*/
  const getResult= async()=>{
    const response = await fetch('http://localhost:8080/api',{
      method:'GET',})
      const data= await response.json();
      setResults(data);
  }
  /**useEffect to render the results data*/
  useEffect(()=>{
    getResult();
  },[]);

  return (
    <div className='Datatable'>
      <div className='tablebox'>
          <h1>Passwords and Strengths</h1>
          <table id="datas">
            <thead>
              <tr>
              <th>Passwords</th>
              <th>Strength</th>
              <th>Minumum Steps needed</th>
            </tr>
            </thead>
            <tbody>
              {/**mapping the fetched data in result state and displaying in table row */}
              {results.map(item=> 
              <tr><td key={item._id}>{item.passvalue}</td>
              <td key={item._id}>{item.strength}</td>
              <td key={item._id}>{item.minsteps}</td></tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  )
}
