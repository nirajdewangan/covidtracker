import React, {useState, useEffect} from 'react';
import DataTable, { createTheme } from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function DataTableComp() {
  const [ volatile, setVolatile] = useState(
    {
      isLoading: false,
      data: [],
      error: '',
      showmore: false
    }
  );
  //const [isLoading, setIsLoading] = useState(false)
  createTheme('solarized', {
  text: {
    primary: '#000',
    secondary: '#000',
  },
  background: {
    default: '#fff',
  },
  context: {
    background: '#fff',
    text: '#000',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});
  const columns = [
  {
    name: 'Country',
    selector: 'country',
    sortable: true,
  },
  {
    name: 'Infected BPS*',
    selector: 'infectedbps',
    sortable: true,
  },
  {
    name: 'Infected on Tested %',
    selector: 'infectedontestedper',
    sortable: true,
  },
  {
    name: 'Tested %',
    selector: 'testedper',
    sortable: true,
  },
  {
    name: 'Mortality %',
    selector: 'mortalityper',
    sortable: true,
  },
  {
    name: 'Recovered %',
    selector: 'recoveredper',
    sortable: true,
  },
  {
    name: 'Infected',
    selector: 'infected',
    sortable: true,
  },
  {
    name: 'Tested',
    selector: 'tested',
    sortable: true,
  },
  {
    name: 'Mortality',
    selector: 'mortalitytotal',
    sortable: true,
  },{
    name: 'Recovered',
    selector: 'recovered',
    sortable: true,
  },
  {
    name: 'Population',
    selector: 'population',
    sortable: true,
  },
 
 
];

useEffect(() => {
  const getCountriesData = async() => {
    
    try {

      setVolatile((state) =>({
         ...state,
        isLoading: true
       })
       )


      const responseData =  await fetch("https://covidincontext.22feetlabs.co/static/json/statistics.json")
      const responseData2 = await responseData.json();

      const countries = responseData2.response.map( (country) => (
        {
        country: country.country,
        population: country.population,
        infectedbps : ((country.cases.total/country.population) * 10000).toFixed(2),
        mortalityper: ((country.deaths.total/country.cases.total) * 100).toFixed(2),
        mortalitytotal: country.deaths.total,
        recovered: country.cases.recovered,
        tested: country.tests.total,
        testedper: ((country.tests.total/country.population) * 100).toFixed(2),
        infected: country.cases.total,
        infectedontestedper: ((country.cases.total/country.tests.total) * 100).toFixed(2),
        recoveredper: ((country.cases.recovered/country.cases.total)*100).toFixed(2)
         }
      ) )

       setVolatile((state) =>({
         ...state,
         data: countries,
         isLoading: false
       })
       )

       

    } catch (error) {
      
       setVolatile((state) =>({
         ...state,
         error,
         isLoading: false
       })
       )
       console.log("error", error)
    }
   
  }
  getCountriesData();
  
}, [])

 useEffect( ()=>{
  
 }, [volatile])

const handleTableToggle = () => {
  console.log(volatile.showmore)
  setVolatile( (state) => ({
    ...state,
    showmore: !state.showmore
  }))

}
  return (
    <>
      { volatile.isLoading ? (<span>Loading......</span>)  : (<DataTable
      className={volatile.showmore ? "table-responsive" : "table-responsive in-act"}
      columns={columns}
      sortIcon={<FontAwesomeIcon icon={faArrowDown} />} 
      data={volatile.data}
      theme="solarized"
    />) } 
    <div className="text-center m-2">
    <button onClick={handleTableToggle} className="table-toggle">{volatile.showmore ? 'Show less' : 'Show more'}</button>
    </div>
    { volatile.error && (<span className="danger">Some Error in the API</span>) }
    </>
  )
}
