
import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';


const LineGraph = () => {
    const [data, setData] = useState({})
    const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
    const  buildChartData = (data, casesType)=>{
        let chartData = [];
        let lastPoint;
        for(var date in data.cases){
            if(lastPoint){
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastPoint 
                }
                chartData.push(newDataPoint)
            }  
            lastPoint = data[casesType][date]
        }
        return chartData
    }
    useEffect(()=>{

        const GetData = async ()=>{
            const data= await fetch(url )
            const response = await data.json()
            let chartData = buildChartData(response, "cases")
            setData(chartData) 
        }

        GetData()
    //    fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //   })

      
    });

  return ( 
    <div>
    <BarChart  className='graph' width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Bar type="monotone" dataKey="y" stroke="#8884d8"  fill='red'/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="x" />
        <YAxis dataKey='y'/>
        <Tooltip />
  </BarChart >
    </div>
    
  )
}

export default LineGraph