import { Card, CardContent, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import "./App.css"
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
//https://disease.sh/v3/covid-19/countries


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("Select country");
  const [countryInfo, setCountryInfo] = useState([])
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([8, 2])
  const [zoom, setzoom] = useState(1)
  const [mapCountries, setMapcountries] = useState({})
  const [showMapDetails, setshowMapDetails] = useState({})

  
  
  // Setting the Countris using API
  const CountryList = async () =>{
    const data = await fetch('https://disease.sh/v3/covid-19/countries')
    const response = await data.json()
   
    // Pushing the country names into the Countries State
    const newCountries = response.map(country =>{
      return({
        name: country.country,
        value: country.countryInfo.iso2
      })
    }) 
    // Setting the Countries in to arrays
    setCountries(newCountries)
    setMapcountries(response)

    // Sorting the Countries by their cases
    const sortResponse = response.sort((a, b)=>{
      if(a.cases > b.cases){
        return -1
      }else {
        return 1
      }
    })

    // Setting the Table data with the use of the SortResponse
    setTableData(sortResponse)
  }

  useEffect(()=>{
    CountryList()
  }, [])

  CountryList()

  const onCountryChange = (e)=>{
    let countryCode = e.target.value
    setCountry(countryCode)
    //setCountry(countryCode)

    const url = `https://disease.sh/v3/covid-19/countries/${countryCode}?strict` 
    const getCountryInfo = async ()=>{
      await fetch(url)
      .then(result => result.json())
      .then(data => {
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setzoom(13)
        setshowMapDetails(data.countryInfo)
        console.log(showMapDetails)
      })
     }

     getCountryInfo()

  } 


  return (
    <div className="app">
        <div className='app__left'>
            {/*Header */}
        <div className='app__header'>
        <h1>Covid 19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            onChange={onCountryChange}
          >
            <MenuItem value={country}>{country}</MenuItem>
            {countries.map(country => {
              return <MenuItem key={country.value+country.name} value={country.name}>{country.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        </div>


        {/*InfoBoxes */}
        {countryInfo.length === 0?null: 
        <div className='app__stats'>
        <InfoBox tittle="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
        <InfoBox tittle="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
        <InfoBox tittle="Death" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
    </div>}
      


      {/*Map */}
      <Map center={mapCenter} zoom={zoom} countries={showMapDetails}/>
    </div>
      
    <Card className='app__right'>
      <CardContent>
        <h3>Live cases by countries</h3>
        {/*Table*/}
        <Table countries={tableData}/>
        <h3>Worldwide new cases</h3>
        <LineGraph/>
        {/*Graph*/}
      
      </CardContent>    
    </Card>
    </div>
  );
}

export default App;
