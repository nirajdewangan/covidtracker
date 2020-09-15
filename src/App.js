import React from 'react';
import './App.css';
//import { Button } from 'reactstrap';
import DataTableComp from './components/DataTableComp'
import WorldStatistic from './components/WorldStatistic'
import LineGraph from './components/LineGraph'

function App() {
  return (

    <div className="App">
      <div className="container-fluid">
      <div className="row">

        <h1>COVID-19 Details for Each Country</h1>
        <div className="col-md-12 mb-4">
          <DataTableComp />
        </div>
        <div className="col-md-12 mb-4">
          <WorldStatistic /> 
        </div>
        <div className="col-md-12 mb-4">
          <div className="row">
            <div className="col-md-6 mb-4">
              <LineGraph casesType={'cases'} />
            </div>
            <div className="col-md-6 mb-4">
              <LineGraph casesType={'deaths'}/>
            </div>
          </div>
           
        </div>
      </div>  
      </div>  
    </div>
  );
}

export default App;
